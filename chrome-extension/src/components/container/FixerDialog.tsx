import * as React from 'react';
import type { ExtractedTimelineItem } from '../../logic/TimelineTypes';
import { findSelectedItem } from '../../logic/TimelineData';
import { calcStatistics } from '../../logic/WorkingTime';
import { fillStatistics } from '../../logic/Filler';;
import Dialog from '../presentation/Dialog';

type Props = {
  timelineItems: ExtractedTimelineItem[],
  onClose: () => void,
};

const initialCheckedStates = (date: string | null, length: number): boolean[] => {
  if (date == null) return [];
  return Array(length).fill(true);
};

function padZero(s: string) {
  return `00${s}`.slice(-2);
}

const getModalDate = (year: string) => {
  const elements = document.querySelectorAll<HTMLElement>('.modal-title')
  for (let elem of elements) {
    const text = elem.innerText;
    if (text == null) continue;

    const m = /(\d+)\/(\d+) 勤怠報告/.exec(text);
    if (m == null) continue;
    const month = padZero(m[1]);
    const day = padZero(m[2]);
    return `${year}-${month}-${day}`
  }
  return undefined;
}

const FixerDialog = ({ timelineItems, onClose }: Props) => {
  const [selectedDate, setSelectedDate] = React.useState<string | null>(timelineItems[0]?.date);
  const [checkedStates, setCheckedStates] = React.useState<boolean[]>(initialCheckedStates(selectedDate, findSelectedItem(timelineItems, selectedDate)?.items.length || 0));

  const onDateSelected = (date: string | null) => {
    setSelectedDate(date);
    if (date == null) return;
    const selectedItem = findSelectedItem(timelineItems, date);
    if (selectedItem == null) return;
    setCheckedStates(initialCheckedStates(date, selectedItem.items.length))
  };
  const onDateSync = () => {
    const firstItem = timelineItems[0];
    if (firstItem == null) return;
    const date = getModalDate(firstItem.date.substr(0, 4));
    if (date == null) return;
    onDateSelected(date);
  }
  const onCheckedChanged = (index: number, checked: boolean) => {
    setCheckedStates((prev) => prev.map((value, i) => i === index ? checked : value));
  };
  const onFill = () => {
    const selectedItem = findSelectedItem(timelineItems, selectedDate);
    if (selectedItem) {
      const statistics = calcStatistics(selectedItem.items, checkedStates);
      fillStatistics(statistics);
    }
  };
  const onToggleAll = () => {
    setCheckedStates((prev) => {
      if (prev.some(Boolean)) {
        return Array(prev.length).fill(false);
      } else {
        return Array(prev.length).fill(true);
      }
    })
  };
  const props = {
    timelineItems,
    selectedDate,
    checkedStates,
    onClose,
    onDateSelected,
    onCheckedChanged,
    onFill,
    onDateSync,
    onToggleAll,
  };
  return (
    <Dialog {...props} />
  );
}

export default FixerDialog;
