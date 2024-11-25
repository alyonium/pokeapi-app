import Button from '../../../components/Button/Button.tsx';
import { useNavigate } from 'react-router-dom';
import styles from '../components/CardPageWrapper/CardPageWrapper.module.scss';
import { BUTTON_MODE } from '../../../utils/consts.ts';

type CardEditButtonsType = {
  currentPage: number;
  currentPageSize: number;
  isFormLocked: boolean;
  handleSave: () => void;
  handleCancel: () => void;
};

const CardEditButtons = ({
  currentPage,
  currentPageSize,
  isFormLocked,
  handleSave,
  handleCancel,
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
          onClick={handleCancel}
        />
        <Button text="Save" state={BUTTON_MODE.SAVE} onClick={handleSave} />
      </div>
    </>
  );
};

export default CardEditButtons;
