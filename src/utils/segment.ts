import { Segment, SEGMENTS } from "@/entities";

export function getSegmentInfo(code: string | number): Segment.Info | null {
    return SEGMENTS[String(code) as Segment.Codes] ?? null
}
