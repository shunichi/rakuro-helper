import * as React from 'react';

type Offset = {
  x: number,
  y: number,
};

export function useDrag(elemRef: React.RefObject<HTMLElement>){
  const dragStartOffset = React.useRef<Offset>({ x: 0, y:0 });
  const dragStartWidth = React.useRef<number>(0);
  const onPointerMoveRef = React.useRef((e: Event) => {
    const pe = e as PointerEvent
    const elem = elemRef.current;
    if (elem) {
      const bodyWidth = document.body.getBoundingClientRect().width;
      const x = pe.clientX - dragStartOffset.current.x;
      const width = Math.max(elem.getBoundingClientRect().width, dragStartWidth.current);
      elem.style.top = `${Math.max(0, pe.clientY - dragStartOffset.current.y)}px`;
      elem.style.right = `${bodyWidth - Math.ceil(Math.max(x, width))}px`;
    }
  });

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.target !== e.currentTarget) return;
    if (e.button !== 0) return;

    e.currentTarget.addEventListener('pointermove', onPointerMoveRef.current);
    e.currentTarget.setPointerCapture(e.pointerId);
    if (elemRef.current) {
      const { top, right, width } = elemRef.current.getBoundingClientRect();
      dragStartWidth.current = width;
      dragStartOffset.current = { x: e.clientX - right, y: e.clientY - top };
    }
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (e.button !== 0) return;

    e.currentTarget.removeEventListener('pointermove', onPointerMoveRef.current);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  return {
    onPointerDown,
    onPointerUp,
  };
}
