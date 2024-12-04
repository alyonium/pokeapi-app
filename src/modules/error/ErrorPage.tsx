import styles from './ErrorPage.module.scss';
import Button from '../../components/Button/Button.tsx';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header.tsx';
import { PAGINATION_DEFAULT } from '../../utils/consts.ts';
import { ROUTE } from '../../router/consts.ts';

const ErrorPage = () => {
  const navigator = useNavigate();

  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <Button
          text="Back to catalog"
          onClick={() =>
            navigator(ROUTE.CATALOG, {
              state: {
                page: PAGINATION_DEFAULT.PAGE,
                pageSize: PAGINATION_DEFAULT.PAGE_SIZE,
              },
            })
          }
        />

        <div className={styles.contentWrapper}>error ;(</div>
      </div>
    </>
  );
};

export default ErrorPage;
