/** Single chevron cell (viewBox 0 0 400 120). */
const SEGMENT = 400;
const TIP = 60;
const BODY = SEGMENT - TIP;

export const CHEVRON_SEGMENT_VIEWBOX = "0 0 400 120";

export type ChevronSegmentRole = "first" | "middle" | "last";

export function chevronSegmentRole(
  index: number,
  total: number,
): ChevronSegmentRole {
  if (index === 0) {
    return "first";
  }
  if (index === total - 1) {
    return "last";
  }
  return "middle";
}

export function chevronSegmentPath(role: ChevronSegmentRole): string {
  if (role === "first") {
    return `M 0 0 L ${BODY} 0 L ${SEGMENT} 60 L ${BODY} 120 L 0 120 Z`;
  }
  return `M 0 0 L ${BODY} 0 L ${SEGMENT} 60 L ${BODY} 120 L 0 120 L ${TIP} 60 Z`;
}

export function chevronStepTextPadding(index: number, total: number): string {
  const role = chevronSegmentRole(index, total);
  const tight = total > 4;

  if (role === "first") {
    return tight
      ? "pl-3 pr-[14%] sm:pl-4 sm:pr-[15%]"
      : "pl-5 pr-[15%] sm:pl-6 sm:pr-[16%]";
  }
  if (role === "last") {
    return tight
      ? "pl-[17%] pr-3 sm:pl-[18%] sm:pr-4"
      : "pl-[18%] pr-5 sm:pl-[19%] sm:pr-6";
  }
  return tight
    ? "pl-[17%] pr-[12%] sm:pl-[18%] sm:pr-[13%]"
    : "pl-[18%] pr-[14%] sm:pl-[19%] sm:pr-[15%]";
}

/** @deprecated Use per-segment paths with grid gap instead. */
export function chevronBannerPaths(stepCount: number): {
  paths: string[];
  viewBox: string;
} {
  if (stepCount < 3 || stepCount > 5) {
    return { paths: [], viewBox: "0 0 0 0" };
  }
  const paths = Array.from({ length: stepCount }, (_, index) =>
    chevronSegmentPath(chevronSegmentRole(index, stepCount)),
  );
  return { paths, viewBox: CHEVRON_SEGMENT_VIEWBOX };
}
