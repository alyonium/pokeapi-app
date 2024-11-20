import Button from '../../../components/Button/Button.tsx';
import { useNavigate } from 'react-router-dom';

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
          navigator(`/catalog`, {
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
          navigator(`/card/edit/${cardId}`, {
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
