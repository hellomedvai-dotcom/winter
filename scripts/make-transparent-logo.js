const fs = require('fs');
const zlib = require('zlib');

function crc32(buf) {
  let c = ~0;
  for (let i = 0; i < buf.length; i++) {
    c ^= buf[i];
    for (let j = 0; j < 8; j++) {
      c = (c >>> 1) ^ (-(c & 1) & 0xEDB88320);
    }
  }
  return (~c) >>> 0;
}

function makePngChunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeAndData = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(typeAndData), 0);
  return Buffer.concat([len, typeAndData, crc]);
}

function processMark(targetTheme) {
  const buf = fs.readFileSync('public/assets/brand/medvidhi-mark-light-cropped.png');
  let pos = 8;
  const idatChunks = [];
  while (pos < buf.length) {
    const len = buf.readUInt32BE(pos);
    const type = buf.toString('ascii', pos + 4, pos + 8);
    if (type === 'IDAT') {
      idatChunks.push(buf.slice(pos + 8, pos + 8 + len));
    }
    pos += 12 + len;
  }
  const raw = zlib.inflateSync(Buffer.concat(idatChunks));
  const width = 720;
  const height = 435;
  const stride = 1 + width * 4;

  // Unfilter scanlines into standard RGBA
  const pixels = Buffer.alloc(width * height * 4);
  const prevLine = Buffer.alloc(width * 4);

  for (let y = 0; y < height; y++) {
    const filterType = raw[y * stride];
    const lineStart = y * stride + 1;
    const currentLine = Buffer.alloc(width * 4);

    for (let x = 0; x < width * 4; x++) {
      const bpp = 4;
      const rawByte = raw[lineStart + x];
      const a = x >= bpp ? currentLine[x - bpp] : 0;
      const b = prevLine[x];
      const c = x >= bpp ? prevLine[x - bpp] : 0;

      let val = 0;
      if (filterType === 0) val = rawByte;
      else if (filterType === 1) val = (rawByte + a) & 0xff;
      else if (filterType === 2) val = (rawByte + b) & 0xff;
      else if (filterType === 3) val = (rawByte + Math.floor((a + b) / 2)) & 0xff;
      else if (filterType === 4) {
        const p = a + b - c;
        const pa = Math.abs(p - a);
        const pb = Math.abs(p - b);
        const pc = Math.abs(p - c);
        const pr = pa <= pb && pa <= pc ? a : (pb <= pc ? b : c);
        val = (rawByte + pr) & 0xff;
      }
      currentLine[x] = val;
    }
    currentLine.copy(pixels, y * width * 4);
    currentLine.copy(prevLine);
  }

  // Find bounding box of the non-white content
  let minX = width, maxX = 0, minY = height, maxY = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const r = pixels[idx];
      const g = pixels[idx + 1];
      const b = pixels[idx + 2];
      // Mark is dark grey / mint, background is near white (r > 240, g > 240, b > 240)
      const isBg = r > 240 && g > 240 && b > 240;
      if (!isBg) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  // Add 4px padding around cropped mark
  minX = Math.max(0, minX - 4);
  maxX = Math.min(width - 1, maxX + 4);
  minY = Math.max(0, minY - 4);
  maxY = Math.min(height - 1, maxY + 4);

  const cropW = maxX - minX + 1;
  const cropH = maxY - minY + 1;

  // Build cropped unfiltered scanlines (filterType = 0)
  const outRaw = Buffer.alloc(cropH * (1 + cropW * 4));

  for (let y = 0; y < cropH; y++) {
    const srcY = minY + y;
    const outOffset = y * (1 + cropW * 4);
    outRaw[outOffset] = 0; // Filter 0 (None)

    for (let x = 0; x < cropW; x++) {
      const srcX = minX + x;
      const srcIdx = (srcY * width + srcX) * 4;
      const destIdx = outOffset + 1 + x * 4;

      const r = pixels[srcIdx];
      const g = pixels[srcIdx + 1];
      const b = pixels[srcIdx + 2];
      const a = pixels[srcIdx + 3];

      // Luminance / Background check
      const isBg = (r > 245 && g > 245 && b > 245);
      if (isBg) {
        outRaw[destIdx] = 0;
        outRaw[destIdx + 1] = 0;
        outRaw[destIdx + 2] = 0;
        outRaw[destIdx + 3] = 0; // fully transparent!
      } else {
        // Compute alpha based on darkness
        const darkness = 255 - Math.min(r, g, b);
        const finalAlpha = Math.min(255, Math.max(0, darkness * 1.5));
        
        if (targetTheme === 'black') {
          outRaw[destIdx] = 0;
          outRaw[destIdx + 1] = 0;
          outRaw[destIdx + 2] = 0;
        } else {
          outRaw[destIdx] = 255;
          outRaw[destIdx + 1] = 255;
          outRaw[destIdx + 2] = 255;
        }
        outRaw[destIdx + 3] = finalAlpha > 30 ? Math.round(finalAlpha) : 0;
      }
    }
  }

  // Create valid PNG
  const header = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(cropW, 0);
  ihdrData.writeUInt32BE(cropH, 4);
  ihdrData[8] = 8; // 8 bit
  ihdrData[9] = 6; // RGBA
  ihdrData[10] = 0; // Deflate
  ihdrData[11] = 0; // Filter
  ihdrData[12] = 0; // Non-interlaced
  const ihdrChunk = makePngChunk('IHDR', ihdrData);

  const deflated = zlib.deflateSync(outRaw);
  const idatChunk = makePngChunk('IDAT', deflated);
  const iendChunk = makePngChunk('IEND', Buffer.alloc(0));

  const outBuf = Buffer.concat([header, ihdrChunk, idatChunk, iendChunk]);
  const filename = `public/assets/brand/medvidhi-mark-${targetTheme}.png`;
  fs.writeFileSync(filename, outBuf);
  console.log(`Saved ${filename}: ${cropW}x${cropH}, size: ${outBuf.length} bytes`);
}

processMark('black');
processMark('white');
