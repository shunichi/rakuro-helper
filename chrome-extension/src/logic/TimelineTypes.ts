export type TimeRangeType = 'daytime' | 'latenight';

export type EstimatedTimelineItem = {
  id: string,
  date: string,
  startDateText: string,
  endDateText: string,
  timeRangeType: TimeRangeType,
  path: string,
};

export type DateItemSubItems = {
  estimatedTimelineItems: EstimatedTimelineItem[],
};

export type DateItem = {
  id: number,
  date: string,
  dateText: string,
  dateType: "weekday" | "excess_statutory_holiday" | "legal_holiday",
  dateTypeText: string,
  items: DateItemSubItems,
};

export type ItemsByDate = Record<string, DateItem>;

export type TimelineData = {
  itemsByDate: DateItem[]
};

export type ExtractedTimelineItem = {
  date: string,
  items: EstimatedTimelineItem[],
};
