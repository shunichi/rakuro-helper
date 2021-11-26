import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ExtractedTimelineItem, TimelineData } from './timeline_types';
import { extractTimeline } from "./exractor";
import Timelines from './Timelines';

function createRootElement(): HTMLElement {
  const root = document.getElementById("rakuro-helper-root")
  if (root) return root;

  const div = document.createElement("div");
  div.style.position = "absolute";
  div.style.zIndex = "1000";
  div.style.top = "32px";
  div.style.left = "32px";
  // div.style.background = "white";
  // div.style.color = "black";
  // div.style.padding = "16px";
  // div.innerText = "Hello!"
  div.id = "rakuro-helper-root";
  document.body.appendChild(div);
  return div;
}

function openDialog(timelineItems: ExtractedTimelineItem[]) {
  ReactDOM.render(
    <Timelines timelineItems={timelineItems} />,
    createRootElement()
  );
}

chrome.runtime.onMessage.addListener((message, messageSender, sendResponse) => {
  if (message.type == 'extract') {
    const timelineItems = extractTimeline() || [];
    openDialog(timelineItems);
    sendResponse({ timelineItems });
  }
})

