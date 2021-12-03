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

const TimeStatistics = ({ statistics }: { statistics: TimeSpanStatistics }) => {
  return <div>
    <table className="rakuro-helper-table">
      <tbody>
        <tr>
          <th>日中</th>
          <td>{formatMinutes(statistics.dayMinutes)}</td>
        </tr>
        <tr>
          <th>深夜</th>
          <td>{formatMinutes(statistics.nightMinutes)}</td>
        </tr>
        <tr>
          <th>翌日深夜</th>
          <td>{formatMinutes(statistics.nextdayNightMinutes)}</td>
        </tr>
        <tr>
          <th>労働時間合計</th>
          <td>{formatMinutes(statistics.workingMinutes)}</td>
        </tr>
        <tr>
          <th>休憩時間</th>
          <td>{formatMinutes(statistics.restMinutes)}</td>
        </tr>
        <tr>
          <th>始業時間</th>
          <td>{formatTime(statistics.workingStart)}</td>
        </tr>
        <tr>
          <th>終業時間</th>
          <td>{formatTime(statistics.workingEnd)}</td>
        </tr>
      </tbody>
    </table>
  </div>
}

const TimeRanges = ({ item, checkedStates, onCheckedChanged }: Props) => {
  const items = item.items;
  const statistics = calcStatistics(items, checkedStates);

  return <div className="rakuro-helper-scroll-container">
    <div className="rakuro-helper-statistics">
      {statistics && <TimeStatistics statistics={statistics} /> }
    </div>
    <div className="rakuro-helper-checkboxes-area">
      {items.map((item, index) => <TimeRangeItem key={item.id} item={item} checked={checkedStates[index]} onChange={(event) => onCheckedChanged(index, event.target.checked)}></TimeRangeItem>)}
    </div>
  </div>
}
export default TimeRanges;
