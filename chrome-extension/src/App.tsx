import * as React from 'react';
import { useState } from 'react';
import type { MouseEventHandler } from 'react';
import { ExtractedTimelineItem } from './timeline_types';
import Timelines from './Timelines';

function App() {
  const [items, setItems] = useState<ExtractedTimelineItem[]>([]);

  const clickHandler : MouseEventHandler = (event) => {
    event.preventDefault();

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      const tab: chrome.tabs.Tab = tabs[0];
      if (tab == null || tab.id == null) return;

      chrome.tabs.sendMessage(tab.id, {type: "extract"}, function(response) {
        const timelineItems = response.timelineItems as ExtractedTimelineItem[];
        setItems(timelineItems);
        console.log(timelineItems);
      });
    });
  }

  return (
    <div className="App">
      <button onClick={clickHandler}>Extract</button>

      <Timelines timelineItems={items} />
    </div>
  );
}

export default App;
