import { RecordedRegionIssue, HealthMemoryRecordPayload } from '@/types/bodymap';

/**
 * HealthMemoryAdapter (Session-Only In-Memory Demo)
 * 
 * Complies with strict patient privacy guidelines:
 * - Does NOT store sensitive medical entries in unencrypted localStorage.
 * - Maintains interactive session state in volatile memory.
 * - Provides an integration-ready contract for future authenticated EHR / Health Memory sync.
 */
class HealthMemoryAdapterService {
  private inMemoryRecords: Map<string, RecordedRegionIssue> = new Map();
  private sessionToken: string;

  constructor() {
    this.sessionToken = `ses_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 7)}`;
  }

  public getSessionToken(): string {
    return this.sessionToken;
  }

  public getAllRecords(): RecordedRegionIssue[] {
    return Array.from(this.inMemoryRecords.values()).sort(
      (a, b) => new Date(b.recordedAt).getTime() - new Date(a.recordedAt).getTime()
    );
  }

  public getRecordById(id: string): RecordedRegionIssue | undefined {
    return this.inMemoryRecords.get(id);
  }

  public getRecordsByRegionId(regionId: string): RecordedRegionIssue[] {
    return this.getAllRecords().filter((r) => r.regionId === regionId);
  }

  public saveRecord(record: RecordedRegionIssue): { success: boolean; isSessionOnly: boolean } {
    this.inMemoryRecords.set(record.id, record);
    return {
      success: true,
      isSessionOnly: true,
    };
  }

  public deleteRecord(recordId: string): boolean {
    return this.inMemoryRecords.delete(recordId);
  }

  public clearSession(): void {
    this.inMemoryRecords.clear();
  }

  /**
   * Prepares a structured non-diagnostic doctor brief export
   */
  public generateDoctorSummaryText(): string {
    const records = this.getAllRecords();
    if (records.length === 0) {
      return 'No anatomical concerns recorded in the current intake session.';
    }

    const header = [
      '===========================================================',
      'MEDVIDHI PRE-CONSULTATION SPATIAL INTAKE SUMMARY',
      'For Healthcare Provider Review • Non-Diagnostic Patient Context',
      `Session ID: ${this.sessionToken} | Generated: ${new Date().toLocaleString()}`,
      '===========================================================',
      '',
    ].join('\n');

    const body = records
      .map((rec, idx) => {
        const lines: string[] = [
          `[ISSUE #${idx + 1}] ${rec.regionName.toUpperCase()} (${rec.side.toUpperCase()})`,
          `  • Anatomical Landmark: ${rec.anatomicalName}`,
        ];

        if (rec.subregionName) {
          lines.push(`  • Specific Subregion / Digit: ${rec.subregionName}`);
        }

        lines.push(`  • Primary Reported Issue: ${rec.primaryIssue.toUpperCase()}`);

        if (rec.pain) {
          lines.push(`  • Pain Severity: ${rec.pain.severity}/10`);
          lines.push(`  • Onset: ${rec.pain.onset} | Frequency: ${rec.pain.frequency}`);
          lines.push(`  • Sensation Character: ${rec.pain.character}`);
          lines.push(`  • Impact on Movement: ${rec.pain.movementImpact}`);
        }

        if (rec.injury) {
          lines.push(`  • Incident Mechanism: ${rec.injury.cause}`);
          lines.push(`  • Duration / Timing: ${rec.injury.timeSince}`);
          lines.push(`  • Mobility Status: ${rec.injury.mobilityRestriction}`);
          lines.push(
            `  • Prior Clinical Review: ${rec.injury.priorClinicalAssessment ? 'Yes' : 'Not yet assessed'}`
          );
          lines.push(
            `  • Prior Injury In Same Location: ${rec.injury.previousInjuryInSameSpot ? 'Yes' : 'No'}`
          );
        }

        if (rec.swelling) {
          lines.push(`  • Swelling Extent: ${rec.swelling.extent}`);
          lines.push(`  • Swelling Onset: ${rec.swelling.onset}`);
          lines.push(`  • Progression: ${rec.swelling.progression}`);
          lines.push(`  • Associated Warmth Reported: ${rec.swelling.associatedWarmth ? 'Yes' : 'No'}`);
        }

        if (rec.cut) {
          lines.push(`  • Wound Depth: ${rec.cut.depth}`);
          lines.push(`  • Approximate Dimension: ${rec.cut.size}`);
          lines.push(`  • Bleeding Status: ${rec.cut.bleeding}`);
        }

        if (rec.skinAppearance) {
          lines.push(`  • User-Observed Color: ${rec.skinAppearance.observedColor.toUpperCase()}`);
          lines.push(`  • Sensation of Warmth: ${rec.skinAppearance.warmthReported ? 'Yes' : 'No'}`);
        }

        if (rec.numbness) {
          lines.push(`  • Numbness / Tingling: ${rec.numbness.sensation}`);
          lines.push(`  • Pattern: ${rec.numbness.pattern}`);
          lines.push(`  • Severity: ${rec.numbness.severity}/10`);
        }

        if (rec.stiffness) {
          lines.push(`  • Stiffness Level: ${rec.stiffness.severityLevel}`);
          lines.push(`  • Peak Occurrence: ${rec.stiffness.worstTime}`);
          lines.push(`  • Mobility Impact: ${rec.stiffness.mobilityImpact}`);
        }

        if (rec.treatmentHistory) {
          if (rec.treatmentHistory.homeRemediesTried.length > 0) {
            lines.push(`  • Interventions Tried: ${rec.treatmentHistory.homeRemediesTried.join(', ')}`);
          }
          if (rec.treatmentHistory.patientNotes) {
            lines.push(`  • Patient Verbatim Notes: "${rec.treatmentHistory.patientNotes}"`);
          }
        }

        lines.push(`  • Recorded At: ${new Date(rec.recordedAt).toLocaleTimeString()}`);
        return lines.join('\n');
      })
      .join('\n\n');

    const footer = [
      '',
      '-----------------------------------------------------------',
      'IMPORTANT CLINICAL NOTE: This document aggregates subjective patient-reported',
      'observations and spatial coordinates. It contains NO automated diagnostic triage,',
      'risk percentages, or clinical mandates. Review with licensed healthcare provider.',
      '===========================================================',
    ].join('\n');

    return `${header}${body}${footer}`;
  }

  /**
   * Prepares payload for future authenticated sync
   */
  public exportIntegrationPayload(): HealthMemoryRecordPayload {
    return {
      sessionToken: this.sessionToken,
      source: 'bodymap_spatial_intake',
      records: this.getAllRecords(),
      status: 'session_demo_in_memory',
      lastUpdated: new Date().toISOString(),
    };
  }
}

export const healthMemoryAdapter = new HealthMemoryAdapterService();
