import * as React from 'react';
import { ExtractedTimelineItem } from './timeline_types';
import TimeRanges from './TimeRanges';

type Props = {
  timelineItems: ExtractedTimelineItem[],
};

const Timelines = ({ timelineItems }: Props) => {
  const [selected, setSelected] = React.useState<string | null>(null);

  if (timelineItems.length === 0) {
    return <div>まだないよ</div>;
  }

  const selectedItem = selected ? timelineItems.find((v) => v.date == selected) : undefined;

  const style = {
    display: "flex",
    padding: "16px",
    background: "white",
    color: "black",
    border: "1px solid black",
    borderRadius: "3px",
  };
  return <div style={style}>
    <table className="rakuro-helper-table">
      <thead>
        <tr>
          <th>日付</th>
          <th>記録</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        { timelineItems.map((item) =>
          <tr>
            <th>{item.date}</th>
            <td>{item.items.length}</td>
            <td>
              <button onClick={() => setSelected(item.date)}>選択</button>
            </td>
          </tr>
        )}
      </tbody>
    </table>
    <div>
      {selectedItem && <TimeRanges item={selectedItem} />}
    </div>
  </div>;
}
export default Timelines;
