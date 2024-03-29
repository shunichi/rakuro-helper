import { createRoot } from 'react-dom/client';
import { ExtractedTimelineItem, TimelineData } from './logic/TimelineTypes';
import { extractTimeline } from "./logic/Extractor";
import FixerDialog from './components/container/FixerDialog';
import './content-script.css';

function rootElement(): HTMLElement {
  const root = document.getElementById("rakuro-helper-root")
  if (root) return root;

  const div = document.createElement("div");
  div.id = "rakuro-helper-root";
  document.body.appendChild(div);
  return div;
}

let opened = false;
let rendered = false;
function openDialog(timelineItems: ExtractedTimelineItem[]) {
  const root = rootElement();
  root.style.display = "block";
  if (!rendered) {
    const reactRoot = createRoot(root)
    reactRoot.render(
      <FixerDialog timelineItems={timelineItems} onClose={closeDialog} />
    );
    rendered = true;
  }
  opened = true;
}

function closeDialog() {
  const root = rootElement();
  root.style.display = "none";
  opened = false;
}

chrome.runtime.onMessage.addListener((message, messageSender, sendResponse) => {
  if (message.type == 'extract') {
    if (opened) {
      closeDialog();
    } else {
      const timelineItems = extractTimeline() || [];
      if (timelineItems.length == 0) return;
      openDialog(timelineItems);
    }
    // sendResponse({ timelineItems });
  }
})

