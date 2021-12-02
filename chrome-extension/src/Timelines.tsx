import * as React from 'react';
import { ExtractedTimelineItem } from './timeline_types';
import TimeRanges from './TimeRanges';

type Props = {
  timelineItems: ExtractedTimelineItem[],
  onClose: () => void,
};

const Timelines = ({ timelineItems, onClose }: Props) => {
  const [selected, setSelected] = React.useState<string | null>(null);

  if (timelineItems.length === 0) {
    return <div>まだないよ</div>;
  }

  const selectedItem = selected ? timelineItems.find((v) => v.date == selected) : undefined;

  return <div>
    <div className="rakuro-helper-modal-header">
      <div style={{ textAlign: "right" }}>
        <a className="rakuro-helper-close-button" onClick={(e) => {e.preventDefault(); onClose()}}>✕</a>
      </div>
    </div>
    <select onChange={(event) => setSelected(event.target.value)}>
        { timelineItems.map((item) =>
            <option value={item.date}>
              {item.date} ({item.items.length})
            </option>
        )}
    </select>
    <div className="rakuro-helper-modal-body">
      {selectedItem && <TimeRanges item={selectedItem} key={selectedItem.date} />}
    </div>
  </div>;
}
export default Timelines;
