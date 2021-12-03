import * as React from 'react';
import { ExtractedTimelineItem, EstimatedTimelineItem } from '../../logic/TimelineTypes';
import { parseISO, format } from 'date-fns';
import { TimeSpan, aggregateTimeSpans } from '../../logic/WorkingTime';
import type { TimeSpanStatistics } from '../../logic/WorkingTime';

type Props = {
  item: ExtractedTimelineItem,
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

function calcStatistics(timeSpans: TimeSpan[], checkedArray: boolean[]): TimeSpanStatistics | undefined {
  const filtered = timeSpans.filter((_, index) => checkedArray[index]);
  return aggregateTimeSpans(filtered);
}

function formatMinutes(minutes: number) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  const mstr = `00${m}`.slice(-2)
  return `${h.toString()}:${mstr}`;
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
          <td>{format(statistics.workingStart, "HH:mm")}</td>
        </tr>
        <tr>
          <th>終業時間</th>
          <td>{format(statistics.workingEnd, "HH:mm")}</td>
        </tr>
      </tbody>
    </table>
  </div>
}

const TimeRanges = (props: Props) => {
  const items = props.item.items
  const timeSpans = items.map((item) => new TimeSpan(item.startDateText, item.endDateText));
  const [checkedArray, setCheckedArray] = React.useState<boolean[]>(timeSpans.map(() => true))

  const updateChecked = (index: number, checked: boolean) => {
    setCheckedArray((prevCheckedArray) => [...prevCheckedArray.slice(0, index), checked, ...prevCheckedArray.slice(index + 1)]);
  };

  const statistics = calcStatistics(timeSpans, checkedArray);

  return <div className="rakuro-helper-scroll-container">
    <div className="rakuro-helper-statistics">
      {statistics && <TimeStatistics statistics={statistics} /> }
    </div>
    <div className="rakuro-helper-checkboxes-area">
      {items.map((item, index) => <TimeRangeItem key={item.id} item={item} checked={checkedArray[index]} onChange={(event) => updateChecked(index, event.target.checked)}></TimeRangeItem>)}
    </div>
  </div>
}
export default TimeRanges;
