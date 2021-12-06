import * as React from 'react';
import { useDrag } from '../../logic/useDrag';
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
  const dialogRef = React.useRef<HTMLDivElement>(null);
  const { onPointerDown, onPointerUp } = useDrag(dialogRef);

  return <div ref={dialogRef} className="rakuro-helper-dialog">
    <DialogHeader onClose={props.onClose} onToggleCollapsed={() => setCollapsed((v) => !v)} onPointerDown={onPointerDown} onPointerUp={onPointerUp} />
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
