import { useEffect } from "react";
import { createPortal } from "react-dom";
import css from "./Modal.module.css"

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ onClose, children }) {
    useEffect(() => {
        function handleKeyDown(e){
        if (e.code === 'Escape') {
                onClose();
            };
        };
        window.addEventListener('keydown', handleKeyDown)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [onClose]);

    

    function handleBackdropClick(e){
        if (e.currentTarget === e.target) {
            onClose();
        };
    };

    return createPortal(<div className={css.overlay} onClick={handleBackdropClick}>
                     <div className={css.modal}>
                         {children}
                     </div>
                 </div>, modalRoot)
};