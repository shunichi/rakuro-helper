import * as React from 'react';
import { ExtractedTimelineItem } from './timeline_types';

type Props = {
  timelineItems: ExtractedTimelineItem[],
};

const Timelines = ({ timelineItems }: Props) => {
  if (timelineItems.length === 0) {
    return <div>まだないよ</div>;
  }
  const style = {
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
        </tr>
      </thead>
      <tbody>
        { timelineItems.map((item) =>
          <tr>
            <th>{item.date}</th>
            <td>{item.rangeItems.length}</td>
          </tr>
        )}
      </tbody>
    </table>
  </div>;
}
export default Timelines;
