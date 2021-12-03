import * as React from 'react';
import { ExtractedTimelineItem } from '../../logic/TimelineTypes';
import { findSelectedItem } from '../../logic/TimelineData';
import TimeRanges from './TimeRanges';

type Props = {
  timelineItems: ExtractedTimelineItem[],
  selectedDate: string | null,
  checkedStates: boolean[],
  onClose: () => void,
  onDateSelected: (date: string | null) => void,
  onCheckedChanged: (index: number, checked: boolean) => void,
};

const Timelines = ({ timelineItems, selectedDate, checkedStates, onClose, onDateSelected, onCheckedChanged }: Props) => {
  if (timelineItems.length === 0) {
    return <div>まだないよ</div>;
  }

  const selectedItem = findSelectedItem(timelineItems, selectedDate);

  return <div>
    <div className="rakuro-helper-modal-header">
      <div style={{ textAlign: "right" }}>
        <a className="rakuro-helper-close-button" onClick={(e) => {e.preventDefault(); onClose()}}>✕</a>
      </div>
    </div>
    <select onChange={(event) => onDateSelected(event.target.value)}>
        { timelineItems.map((item) =>
            <option value={item.date} selected={item.date === selectedDate}>
              {item.date} ({item.items.length})
            </option>
        )}
    </select>
    <div className="rakuro-helper-modal-body">
      {selectedItem && <TimeRanges item={selectedItem} key={selectedItem.date} checkedStates={checkedStates} onCheckedChanged={onCheckedChanged} />}
    </div>
  </div>;
}
export default Timelines;
