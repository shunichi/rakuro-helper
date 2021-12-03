import * as React from 'react';
import { ExtractedTimelineItem, EstimatedTimelineItem } from '../../logic/TimelineTypes';
import { parseISO, format } from 'date-fns';
import { calcStatistics } from '../../logic/WorkingTime';
import { formatMinutes, formatTime } from '../../logic/WorkingTime';
import type { TimeSpanStatistics } from '../../logic/WorkingTime';

type Props = {
  item: ExtractedTimelineItem,
  checkedStates: boolean[],
  onCheckedChanged: (index: number, checked: boolean) => void,
};

type TimeRangeProps = {
  item: EstimatedTimelineItem
  checked: boolean,
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
}

const TimeRangeItem = (props: TimeRangeProps) => {
  const start = parseISO(props.item.startDateText)
  const end = parseISO(props.item.endDateText);
  return <div style={{ margin: "4px"}}>
    <label>
      <input type="checkbox" checked={props.checked} onChange={props.onChange}></input>
      <span style={{ marginLeft: "4px" }}>{format(start, "HH:mm")} 〜 {format(end, "HH:mm")}</span>
    </label>
  </div>;
}

const TimeRanges = ({ item, checkedStates, onCheckedChanged }: Props) => {
  const items = item.items;

  return <div className="rakuro-helper-checkboxes-area">
    {items.map((item, index) => <TimeRangeItem key={item.id} item={item} checked={checkedStates[index]} onChange={(event) => onCheckedChanged(index, event.target.checked)}></TimeRangeItem>)}
  </div>;
}
export default TimeRanges;
