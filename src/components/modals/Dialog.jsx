import { useEffect, useRef } from 'react';
import './Dialog.css';

function Dialog({
  open,
  onClose,
  labelledBy,
  describedBy,
  className = '',
  children,
}) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  function fecharComTeclado(evento) {
    evento.preventDefault();
    onClose?.();
  }

  function fecharPeloFundo(evento) {
    if (evento.target === evento.currentTarget) {
      onClose?.();
    }
  }

  return (
    <dialog
      ref={dialogRef}
      className={['site-dialog', className].filter(Boolean).join(' ')}
      aria-labelledby={labelledBy}
      aria-describedby={describedBy || undefined}
      aria-modal="true"
      onCancel={fecharComTeclado}
      onClick={fecharPeloFundo}
    >
      {children}
    </dialog>
  );
}

export default Dialog;
