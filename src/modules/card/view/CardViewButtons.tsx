import Button from '../../../components/Button/Button.tsx';
import { useNavigate } from 'react-router-dom';
import { ROUTE } from '../../../router/consts.ts';

type CardViewButtonsType = {
  currentPage: number;
  currentPageSize: number;
  cardId: string | undefined;
};

const CardViewButtons = ({
  currentPage,
  currentPageSize,
  cardId,
}: CardViewButtonsType) => {
  const navigator = useNavigate();

  return (
    <>
      <Button
        text="Back to catalog"
        onClick={() =>
          navigator(ROUTE.CATALOG, {
            state: {
              page: currentPage,
              pageSize: currentPageSize,
            },
          })
        }
      />
      <Button
        text="Edit"
        onClick={() =>
          navigator(`${ROUTE.CARD_EDIT}/${cardId}`, {
            state: {
              page: currentPage,
              pageSize: currentPageSize,
            },
          })
        }
      />
    </>
  );
};

export default CardViewButtons;
