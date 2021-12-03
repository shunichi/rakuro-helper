import { ExtractedTimelineItem } from './TimelineTypes';

export const findSelectedItem = (timelineItems: ExtractedTimelineItem[], date: string | null): ExtractedTimelineItem | undefined => {
  return timelineItems.find((item) => item.date === date);
};
