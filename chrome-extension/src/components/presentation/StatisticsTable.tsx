import * as React from 'react';
import type { TimeSpanStatistics } from '../../logic/WorkingTime';
import { formatMinutes, formatTime } from '../../logic/WorkingTime';

type Props = {
  statistics: TimeSpanStatistics,
};

const StatisticsTable = ({ statistics }: Props) => {
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
        <tr style={{ height: '8px', border: 'none' }}>
          <td style={{ border: 'none' }}></td>
          <td style={{ border: 'none' }}></td>
        </tr>
        <tr>
          <th>始業時間</th>
          <td>{formatTime(statistics.workingStart)}</td>
        </tr>
        <tr>
          <th>終業時間</th>
          <td>{formatTime(statistics.workingEnd)}</td>
        </tr>
        <tr>
          <th>休憩時間</th>
          <td>{formatMinutes(statistics.restMinutes)}</td>
        </tr>
      </tbody>
    </table>
  </div>
}

export default StatisticsTable;
