import { parseISO, differenceInMinutes, format } from 'date-fns';
import type { EstimatedTimelineItem } from './TimelineTypes';

const NIGHT_BEGIN_OFFSET = 22 * 60;
const NEXTDAY_NIGHT_BEGIN_OFFSET = 24 * 60;

function calcStartMinOffset(startDate: Date): number {
  const offset = startDate.getHours() * 60 + startDate.getMinutes();
  return offset < 5 * 60 ? offset + NEXTDAY_NIGHT_BEGIN_OFFSET : offset;
}

function calcEndMinOffset(endDate: Date): number {
  const offset = endDate.getHours() * 60 + endDate.getMinutes();
  return offset <= 5 * 60 ? offset + NEXTDAY_NIGHT_BEGIN_OFFSET : offset;
}

export class TimeSpan {
  public startDate: Date;
  public endDate: Date;
  public startMinOffset: number;
  public endMinOffset: number;

  constructor(startDateText: string, endDateText: string) {
    this.startDate = parseISO(startDateText);
    this.endDate = parseISO(endDateText);
    this.startMinOffset = calcStartMinOffset(this.startDate);
    this.endMinOffset = calcEndMinOffset(this.endDate);
  }

  durationMinutes(): number {
    return differenceInMinutes(this.endDate, this.startDate);
  }

  dayMinutes(): number {
    return Math.max(0, Math.min(this.endMinOffset, NIGHT_BEGIN_OFFSET) - this.startMinOffset);
  }

  nightMinutes(): number {
    return Math.max(0, Math.min(this.endMinOffset, NEXTDAY_NIGHT_BEGIN_OFFSET) - Math.max(this.startMinOffset, NIGHT_BEGIN_OFFSET));
  }

  nextdayNightMinutes(): number {
    return Math.max(0, this.endMinOffset - Math.max(this.startMinOffset, NEXTDAY_NIGHT_BEGIN_OFFSET));
  }
}

function calcRestMinSum(timeSpans: TimeSpan[]): number {
  let restMinSum = 0;
  for(let i = 0; i < timeSpans.length - 1; i++) {
    restMinSum += timeSpans[i+1].startMinOffset - timeSpans[i].endMinOffset
  }
  return restMinSum;
}

export type TimeSpanStatistics = {
  workingMinutes: number,
  dayMinutes: number,
  nightMinutes: number,
  nextdayNightMinutes: number,
  restMinutes: number,
  workingStart: Date | undefined,
  workingEnd: Date | undefined,
};

export function aggregateTimeSpans(timeSpans: TimeSpan[]): TimeSpanStatistics {
  const sortedTimeSpans = [...timeSpans].sort((a, b) => a.startMinOffset - b.startMinOffset);
  const restMinutes = calcRestMinSum(sortedTimeSpans);
  const workingMinutes = sortedTimeSpans.reduce((acc, timeSpan) => acc + timeSpan.durationMinutes(), 0);
  const dayMinutes = sortedTimeSpans.reduce((acc, timeSpan) => acc + timeSpan.dayMinutes(), 0);
  const nightMinutes = sortedTimeSpans.reduce((acc, timeSpan) => acc + timeSpan.nightMinutes(), 0);
  const nextdayNightMinutes = sortedTimeSpans.reduce((acc, timeSpan) => acc + timeSpan.nextdayNightMinutes(), 0);

  return {
    workingMinutes,
    dayMinutes,
    nightMinutes,
    nextdayNightMinutes,
    restMinutes,
    workingStart: timeSpans.length === 0 ? undefined : sortedTimeSpans[0].startDate,
    workingEnd: timeSpans.length === 0 ? undefined : sortedTimeSpans[sortedTimeSpans.length - 1].endDate,
  };
}

export function calcStatistics(estimatedTimelineItems: EstimatedTimelineItem[], checkedArray: boolean[]): TimeSpanStatistics {
  const timeSpans = estimatedTimelineItems.map((item) => new TimeSpan(item.startDateText, item.endDateText));
  const filtered = timeSpans.filter((_, index) => checkedArray[index]);
  return aggregateTimeSpans(filtered);
}

export function formatMinutes(minutes: number) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  const mstr = `00${m}`.slice(-2)
  return `${h.toString()}:${mstr}`;
}

export function formatTime(date: Date | undefined) {
  if (date == null) return '';

  let h = date.getHours();
  const m = date.getMinutes();
  if (h < 5) h += 24;
  return `${h}:${`00${m}`.slice(-2)}`;
}
