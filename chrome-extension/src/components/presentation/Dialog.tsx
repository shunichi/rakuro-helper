import * as React from 'react';
import DialogHeader from './DialogHeader';
import DialogBody from './DialogBody';
import type { ExtractedTimelineItem } from '../../logic/TimelineTypes';

type Props = {
  timelineItems: ExtractedTimelineItem[],
  selectedDate: string | null,
  checkedStates: boolean[],
  onDateSelected: (date: string | null) => void,
  onCheckedChanged: (index: number, checked: boolean) => void,
  onToggleAll: () => void,
  onFill: () => void,
  onDateSync: () => void,
  onClose: () => void,
};

const Dialog = (props: Props) => {
  const [collapsed, setCollapsed] = React.useState(false);

  return <div className="rakuro-helper-dialog">
    <DialogHeader onClose={props.onClose} onToggleCollapsed={() => setCollapsed((v) => !v)} />
    {
      !collapsed &&
      <DialogBody
        timelineItems={props.timelineItems}
        selectedDate={props.selectedDate}
        checkedStates={props.checkedStates}
        onDateSelected={props.onDateSelected}
        onCheckedChanged={props.onCheckedChanged}
        onToggleAll={props.onToggleAll}
        onFill={props.onFill}
        onDateSync={props.onDateSync}
      />
    }
  </div>;
}

export default Dialog;
