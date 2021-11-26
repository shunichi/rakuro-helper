import * as React from 'react';
import { render } from 'react-dom';
import { ExtractedTimelineItem, EstimatedTimelineItem } from './timeline_types';
import { parseISO, format } from 'date-fns';

type Props = {
  item: ExtractedTimelineItem,
};

type TimeRangeProps = {
  item: EstimatedTimelineItem
}

const TimeRangeItem = (props: TimeRangeProps) => {
  const start = parseISO(props.item.startDateText)
  const end = parseISO(props.item.endDateText);
  return <div>
    <input type="checkbox"></input>
    {format(start, "HH:mm")} 〜 {format(end, "HH:mm")}
  </div>;
}
const TimeRanges = (props: Props) => {
  return <div>
    <div>{props.item.date}</div>
    {props.item.items.map((item) => <TimeRangeItem item={item} key={item.id}></TimeRangeItem>)}
  </div>
}
export default TimeRanges;
