import Header from '../../../../components/Header/Header.tsx';
import styles from './CardPageWrapper.module.scss';
import Loader from '../../../../components/Loader/Loader.tsx';
import { ReactNode } from 'react';

type CardPageWrapperProps = {
  buttonsBlock: ReactNode;
  fieldsBlock: ReactNode;
  loading: boolean;
};

const CardPageWrapper = ({
  fieldsBlock,
  buttonsBlock,
  loading,
}: CardPageWrapperProps) => {
  return (
    <>
      <Header />
      <div className={styles.buttonsWrapper}>{buttonsBlock}</div>
      <div className={styles.contentWrapper}>
        {loading ? <Loader /> : fieldsBlock}
      </div>
    </>
  );
};

export default CardPageWrapper;
