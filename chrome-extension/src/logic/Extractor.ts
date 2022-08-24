import { ExtractedTimelineItem, ItemsByDate } from './TimelineTypes';

export function extractTimeline(): ExtractedTimelineItem[] {
  const cal = document.querySelector<HTMLElement>('app-work-calendar');
  if (cal == null) return [];
  const json = cal.getAttribute(':items-by-date');
  if (json == null) return [];

  const itemsByDate = JSON.parse(json) as ItemsByDate;
  const sortedKeys = Object.keys(itemsByDate).sort();
  return sortedKeys.map(key => {
    const dayItem = itemsByDate[key];
    const date = dayItem.date;
    const items = dayItem.items.estimatedTimelineItems || [];
    return {
      date,
      items,
    };
  })
}
