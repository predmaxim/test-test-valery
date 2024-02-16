import {ReactNode} from 'react';
import styles from './Modal.module.scss';
import {RiCloseLine} from 'react-icons/ri';
import {Button} from '../../components';
import {createPortal} from 'react-dom';

export type ModalProps = {
  children: ReactNode,
  onCancel: () => void,
  header?: string,
  width?: string,
  formId?: string
}

export const Modal = (
  {
    children,
    onCancel,
    header,
    width = '600px',
    formId
  }: ModalProps) => {

  return (
    createPortal(
      <div className={styles.Modal}>
        <div
          className={`${styles.Modal__overlay} ${styles.activeOverlay}`}
          onClick={onCancel}
        />
        <div
          className={`${styles.Modal__body} ${styles.activeBody}`}
          style={{maxWidth: width}}
        >
          <RiCloseLine
            onClick={onCancel}
            className={`${styles.Modal__closeBtn}`}
          />
          <h5 className={`${styles.Modal__header}`}>
            {header}
          </h5>
          <div className={`${styles.Modal__content}`}>
            {children}
          </div>
          <div className={`${styles.actions}`}>
            <Button
              type="submit"
              children={'Ok'}
              form={formId}
            />
            <Button
              onClick={onCancel}
              type="button"
              children={'Cancel'}
            />
          </div>
        </div>
      </div>,
      document.body)
  );
};
