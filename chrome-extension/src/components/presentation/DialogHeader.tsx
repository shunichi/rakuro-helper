import * as React from 'react';

type Props = {
  onClose: () => void,
  onToggleCollapsed: () => void,
};

const DialogHeader = (props: Props) => {
  return <div className="rakuro-helper-modal-header">
  <a className="rakuro-helper-close-button" onClick={(e) => {e.preventDefault(); props.onClose()}}>✕</a>
  <a className="rakuro-helper-close-button" onClick={(e) => {e.preventDefault(); props.onToggleCollapsed()}}>-</a>
</div>;
}

export default DialogHeader;
