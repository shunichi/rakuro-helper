import * as React from 'react';
import type { ExtractedTimelineItem } from '../../logic/TimelineTypes';
import { findSelectedItem } from '../../logic/TimelineData';
import Timelines from '../presentation/Timelines';

type Props = {
  timelineItems: ExtractedTimelineItem[],
  onClose: () => void,
};

const initialCheckedStates = (date: string | null, length: number): boolean[] => {
  if (date == null) return [];
  return Array(length).fill(true);
};

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
  const onCheckedChanged = (index: number, checked: boolean) => {
    setCheckedStates((prev) => prev.map((value, i) => i === index ? checked: value));
  };
  const props = {
    timelineItems,
    selectedDate,
    checkedStates,
    onClose,
    onDateSelected,
    onCheckedChanged,
  };
  return (
    <Timelines {...props} />
  );
}

export default FixerDialog;
