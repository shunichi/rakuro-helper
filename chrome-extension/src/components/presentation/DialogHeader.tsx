import * as React from 'react';

type Props = {
  onClose: () => void,
  onToggleCollapsed: () => void,
  onPointerDown: (e: React.PointerEvent) => void,
  onPointerUp: (e: React.PointerEvent) => void,
};

const DialogHeader = (props: Props) => {
  return <div className="rakuro-helper-dialog-header" onPointerDown={props.onPointerDown} onPointerUp={props.onPointerUp}>
    <a className="rakuro-helper-dialog-header-button" onClick={(e) => {e.preventDefault(); e.stopPropagation(); props.onToggleCollapsed()}}>-</a>
    <a className="rakuro-helper-dialog-header-button" onClick={(e) => {e.preventDefault(); e.stopPropagation(); props.onClose()}}>✕</a>
  </div>;
}

export default DialogHeader;
