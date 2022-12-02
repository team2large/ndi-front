import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import styles from 'assets/style/modal.module.scss';

const Modal = forwardRef((props, ref) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  useImperativeHandle(ref, () => ({

    open(title, content) {
      setTitle(title);
      setContent(content);
      showModal();
    },
  }));

  return (<div className={`${styles.modal} ${visible ? styles.shown : undefined}`}>
    <div className={styles.modalContent}>
      <div className={styles.modalHeader}>
        <span className={styles.modalTitle}>{title}</span>
        <span className={styles.modalClose} onClick={hideModal}>
          <span>&times;</span>
        </span>
      </div>
      <div className={styles.modalBody}>{content}</div>
      <div className={styles.modalActions}>
        <button className={styles.modalBtn} onClick={hideModal}>Fermer</button>
      </div>
    </div>

  </div>);
});

Modal.displayName = 'Modal';

export default Modal;
