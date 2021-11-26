import { ExtractedTimelineItem, TimelineData } from './timeline_types';

export function extractTimeline(): ExtractedTimelineItem[] {
  const cal = document.querySelector<HTMLElement>('app-work-calendar');
  if (cal == null) return [];
  const json = cal.getAttribute(':timeline');
  if (json == null) return [];

  const timelineData = JSON.parse(json) as TimelineData;
  return timelineData.itemsByDate.map(dayItem => {
    const date = dayItem.date;
    const items = dayItem.items.estimatedTimelineItems || [];
    return {
      date,
      items,
    };
  });
}
