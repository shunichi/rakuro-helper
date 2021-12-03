import * as React from 'react';
import { ExtractedTimelineItem } from '../../logic/TimelineTypes';
import { findSelectedItem } from '../../logic/TimelineData';
import { calcStatistics } from '../../logic/WorkingTime';
import type { TimeSpanStatistics } from '../../logic/WorkingTime';
import TimeRanges from './TimeRanges';
import StatisticsTable from './StatisticsTable';

type ToolBarProps = {
  timelineItems: ExtractedTimelineItem[],
  selectedDate: string | null,
  onDateSelected: (date: string | null) => void,
  onDateSync: () => void,
};
const ToolBar = ({ timelineItems, selectedDate, onDateSelected, onDateSync }: ToolBarProps) => {
  return <div className="rakuro-helper-tools">
    <select onChange={(event) => onDateSelected(event.target.value)}>
      { timelineItems.map((item) =>
          <option value={item.date} selected={item.date === selectedDate}>
            {item.date} ({item.items.length})
          </option>
      )}
    </select>
    <button className="rakuro-helper-input-button" onClick={onDateSync}>モーダルの日付</button>
  </div>;
}

type ModalBodyProps = {
  statistics: TimeSpanStatistics,
  selectedItem: ExtractedTimelineItem | undefined,
  checkedStates: boolean[],
  onCheckedChanged: (index: number, checked: boolean) => void,
  onFill: () => void,
};

const ModalBody = ({ statistics, selectedItem, checkedStates, onCheckedChanged, onFill }: ModalBodyProps) => {
  return <div className="rakuro-helper-modal-body">
    <div className="rakuro-helper-scroll-container">
      <div className="rakuro-helper-statistics">
        {statistics && <StatisticsTable statistics={statistics} onFill={onFill} /> }
      </div>
      {selectedItem && <TimeRanges item={selectedItem} key={selectedItem.date} checkedStates={checkedStates} onCheckedChanged={onCheckedChanged} />}
    </div>
  </div>;
};

type Props = {
  timelineItems: ExtractedTimelineItem[],
  selectedDate: string | null,
  checkedStates: boolean[],
  onClose: () => void,
  onDateSelected: (date: string | null) => void,
  onCheckedChanged: (index: number, checked: boolean) => void,
  onFill: () => void,
  onDateSync: () => void,
};

const Timelines = ({ timelineItems, selectedDate, checkedStates, onClose, onDateSelected, onCheckedChanged, onFill, onDateSync }: Props) => {
  const [collapsed, setCollapsed] = React.useState(false);

  if (timelineItems.length === 0) {
    return <div>データがないよ</div>;
  }

  const selectedItem = findSelectedItem(timelineItems, selectedDate);
  const statistics = selectedItem ? calcStatistics(selectedItem.items, checkedStates) : undefined;

  const toolBarProps = {
    timelineItems,
    selectedDate,
    onDateSelected,
    onDateSync,
  };
  return <div>
    <div className="rakuro-helper-modal-header">
      <a className="rakuro-helper-close-button" onClick={(e) => {e.preventDefault(); onClose()}}>✕</a>
      <a className="rakuro-helper-close-button" onClick={(e) => {e.preventDefault(); setCollapsed((v) => !v)}}>-</a>
    </div>
    { !collapsed && <div className="rakuro-helper-modal-header-line"></div> }
    { !collapsed && <ToolBar {...toolBarProps} />}
    { !collapsed && statistics && <ModalBody statistics={statistics} selectedItem={selectedItem} checkedStates={checkedStates} onCheckedChanged={onCheckedChanged} onFill={onFill} />}
  </div>;
}
export default Timelines;
