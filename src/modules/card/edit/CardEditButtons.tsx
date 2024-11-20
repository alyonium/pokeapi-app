import Button from '../../../components/Button/Button.tsx';
import { useNavigate } from 'react-router-dom';
import styles from '../components/CardPageWrapper/CardPageWrapper.module.scss';
import { BUTTON_MODE } from '../../../utils/consts.ts';

type CardEditButtonsType = {
  currentPage: number;
  currentPageSize: number;
  cardId: string | undefined;
  isFormLocked: boolean;
  handleSave: () => void;
};

const CardEditButtons = ({
  currentPage,
  currentPageSize,
  cardId,
  isFormLocked,
  handleSave,
}: CardEditButtonsType) => {
  const navigator = useNavigate();

  return (
    <>
      <Button
        state={isFormLocked ? BUTTON_MODE.DISABLED : BUTTON_MODE.DEFAULT}
        text="Back to catalog"
        onClick={() =>
          navigator(`/catalog`, {
            state: {
              page: currentPage,
              pageSize: currentPageSize,
            },
          })
        }
      />
      <div className={styles.buttonGroupWrapper}>
        <Button
          state={BUTTON_MODE.CANCEL}
          text="Cancel"
          onClick={() =>
            // TODO make warning modal (fields already edited, do you want to cancel this operation?)
            navigator(`/card/view/${cardId}`, {
              state: {
                page: currentPage,
                pageSize: currentPageSize,
              },
            })
          }
        />
        <Button text="Save" state={BUTTON_MODE.SAVE} onClick={handleSave} />
      </div>
    </>
  );
};

export default CardEditButtons;
