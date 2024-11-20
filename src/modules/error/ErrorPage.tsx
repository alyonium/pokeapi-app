import styles from './ErrorPage.module.scss';
import Button from '../../components/Button/Button.tsx';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const navigator = useNavigate();

  return (
    <div className={styles.wrapper}>
      <Button text="Back to catalog" onClick={() => navigator(`/catalog`)} />

      <div className={styles.contentWrapper}>error ;(</div>
    </div>
  );
};

export default ErrorPage;
