import type { Audience, Report } from "./types";
import { moorestown583 } from "./data/moorestown-583-sentinel";
import { austin123 } from "./data/austin-123-main";

export * from "./types";

const REPORTS: Report[] = [moorestown583, austin123];

export function getAllReports(): Report[] {
  return REPORTS;
}

export function getReportBySlug(slug: string): Report | undefined {
  return REPORTS.find((r) => r.slug === slug);
}

export function getReportsByAudience(audience: Audience): Report[] {
  return REPORTS.filter((r) => r.audiences.includes(audience));
}

export function getFlagshipReport(): Report {
  return REPORTS.find((r) => r.isFlagship) ?? REPORTS[0];
}

export function getReportSlugs(): string[] {
  return REPORTS.map((r) => r.slug);
}
