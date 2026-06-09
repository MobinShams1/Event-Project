

import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export default function Modal({ children, onClose }) {
  const dialog = useRef();

 

  useEffect(() => {
    const modal = dialog.current;
   
    if (modal) {
      modal.showModal();
    }
  }, []);

  const modalRoot = document.getElementById('modal');

  

  return createPortal(
    <dialog className="modal" ref={dialog} onClose={onClose}>
      {children}
    </dialog>,
    modalRoot
  );
}