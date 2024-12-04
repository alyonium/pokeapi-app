import styles from './Loader.module.scss';
import { LOADER_SIZE } from '../../utils/consts.ts';

type LoaderProps = {
  size?: LOADER_SIZE;
};

const Loader = ({ size = LOADER_SIZE.BIG }: LoaderProps) => {
  const getClassNames = () => {
    if (size === LOADER_SIZE.SMALL) {
      return `${styles.loader} ${styles.loaderSmall}`;
    } else {
      return `${styles.loader}`;
    }
  };

  return (
    <div className={getClassNames()}>
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
    </div>
  );
};

export default Loader;
