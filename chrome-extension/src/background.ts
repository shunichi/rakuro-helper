import { ExtractedTimelineItem } from './timeline_types';

chrome.browserAction.onClicked.addListener((tab) => {
  if (tab == null || tab.id == null) return;

  chrome.tabs.sendMessage(tab.id, {type: "extract"}, function(response) {
    const timelineItems = response.timelineItems as ExtractedTimelineItem[];
    console.log(timelineItems);
  });
});
