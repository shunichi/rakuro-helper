import type { TimeSpanStatistics } from './WorkingTime';
import { formatMinutes, formatTime } from './WorkingTime';

function fillInput(selector: string, value: string) {
  const input = document.querySelector<HTMLInputElement>(selector);
  if (input) {
    input.value = value;
    input.dispatchEvent(new Event('input', { bubbles: true, cancelable: true }));
  }
}
export function fillStatistics(statistics: TimeSpanStatistics) {
  fillInput('[name="time_card[actual_worktime_1_daytime_minutes_text]"]', formatMinutes(statistics.dayMinutes)); // 日中
  fillInput('[name="time_card[actual_worktime_1_night_minutes_text]"]', formatMinutes(statistics.nightMinutes)); // 深夜
  fillInput('[name="time_card[actual_worktime_2_daytime_minutes_text]"]', '0:00'); // 翌 日中
  fillInput('[name="time_card[actual_worktime_2_night_minutes_text]"]', formatMinutes(statistics.nextdayNightMinutes)); // 翌 深夜
  fillInput('[name="time_card[start_at_text]"]', formatTime(statistics.workingStart)); // 始業
  fillInput('[name="time_card[end_at_text]"]', formatTime(statistics.workingEnd)); // 終業
  fillInput('[name="time_card[actual_break_time_minutes_text]"]', formatMinutes(statistics.restMinutes)); // 休憩時間
}
