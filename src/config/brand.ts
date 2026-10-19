/**
 * Centralised MEDVIDHI Brand Constants
 * 
 * Strict Product Boundary:
 * - Brand is MEDVIDHI (never MEDVAI).
 * - Target domain: medvidhi.com.
 * - Allowed color families: Pure White (#FFFFFF), Pure Black (#000000), Neutral Grayscale.
 */

export const BRAND = {
  name: 'MEDVIDHI',
  legalName: 'MEDVIDHI Technologies',
  domain: 'medvidhi.com',
  siteUrl: 'https://medvidhi.com',
  tagline: 'Precision Engineering for Intelligent Health',
  description:
    'MEDVIDHI is engineering modern technological foundations for clinical intelligence and next-generation healthcare workflows.',
  colors: {
    black: '#000000',
    charcoal: '#141414',
    white: '#FFFFFF',
    border: 'rgba(0, 0, 0, 0.14)',
  },
  assets: {
    markBlackTransparent: '/assets/brand/medvidhi-mark-black-transparent.png',
    markWhiteTransparent: '/assets/brand/medvidhi-mark-white-transparent.png',
    markLightCropped: '/assets/brand/medvidhi-mark-black-transparent.png',
    markLight: '/assets/brand/medvidhi-mark-black-transparent.png',
    markDark: '/assets/brand/medvidhi-mark-white-transparent.png',
    bannerDark: '/assets/brand/medvidhi-banner-dark.png',
    logoDark: '/assets/brand/medvidhi-logo.png',
    favicon: '/favicon.png',
  },
  navRoutes: {
    features: '#features',
    howItWorks: '#how-it-works',
    join: '#join',
  },
} as const;
