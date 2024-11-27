import styles from './BaseModal.module.scss';
import { ReactNode } from 'react';

type BaseModalProps = {
  header: string;
  text: string;
  buttons: ReactNode;
};

const BaseModal = ({ header, text, buttons }: BaseModalProps) => {
  return (
    <>
      <div className={styles.mask} />
      <div className={styles.modalWrapper}>
        <div className={styles.header}>{header}</div>
        <div>{text}</div>
        <div>{buttons}</div>
      </div>
    </>
  );
};

export default BaseModal;
