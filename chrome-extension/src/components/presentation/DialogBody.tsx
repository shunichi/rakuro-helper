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
  onToggleAll: () => void,
};

const ModalBody = ({ statistics, selectedItem, checkedStates, onCheckedChanged, onFill, onToggleAll }: ModalBodyProps) => {
  return <div className="rakuro-helper-dialog-body">
    <div className="rakuro-helper-scroll-container">
      <div className="rakuro-helper-statistics">
        <div style={{ marginBottom: '12px'}}>
          <button onClick={onFill} >入力</button>
          <button onClick={onToggleAll} style={{ marginLeft: '8px' }} >トグル</button>
        </div>
        {statistics && <StatisticsTable statistics={statistics} /> }
      </div>
      {selectedItem && <TimeRanges item={selectedItem} key={selectedItem.date} checkedStates={checkedStates} onCheckedChanged={onCheckedChanged} />}
    </div>
  </div>;
};

type Props = {
  timelineItems: ExtractedTimelineItem[],
  selectedDate: string | null,
  checkedStates: boolean[],
  onDateSelected: (date: string | null) => void,
  onCheckedChanged: (index: number, checked: boolean) => void,
  onToggleAll: () => void,
  onFill: () => void,
  onDateSync: () => void,
};

const DialogBody = ({ timelineItems, selectedDate, checkedStates,onDateSelected, onCheckedChanged, onToggleAll, onFill, onDateSync }: Props) => {
  if (timelineItems.length === 0) {
    return <div>データがありません。</div>;
  }

  const selectedItem = findSelectedItem(timelineItems, selectedDate);
  const statistics = selectedItem ? calcStatistics(selectedItem.items, checkedStates) : undefined;

  const toolBarProps = {
    timelineItems,
    selectedDate,
    onDateSelected,
    onDateSync,
  };
  return <div className="rakuro-helper-dialog-body-frame">
    <ToolBar {...toolBarProps} />
    {
      statistics &&
      <ModalBody
        statistics={statistics}
        selectedItem={selectedItem}
        checkedStates={checkedStates}
        onCheckedChanged={onCheckedChanged}
        onFill={onFill}
        onToggleAll={onToggleAll}
      />
    }
  </div>;
};

export default DialogBody;
