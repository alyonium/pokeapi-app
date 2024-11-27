import CardPageWrapper from '../components/CardPageWrapper/CardPageWrapper.tsx';
import CardViewButtons from './CardViewButtons.tsx';
import CardViewFields from './CardViewFields.tsx';
import { useParams } from 'react-router-dom';
import { GetPokemonByIdQuery } from '../../../api/__generated__/graphql.ts';
import { usePagination } from '../../../utils/usePagination.ts';

type CardViewPageProps = {
  loading: boolean;
  data: GetPokemonByIdQuery | undefined;
};

const CardViewPage = ({ data, loading }: CardViewPageProps) => {
  const { cardId } = useParams();
  const { currentPage, currentPageSize } = usePagination();

  return (
    <CardPageWrapper
      loading={loading}
      buttonsBlock={
        <CardViewButtons
          currentPage={currentPage}
          currentPageSize={currentPageSize}
          cardId={cardId}
        />
      }
      fieldsBlock={<CardViewFields data={data} />}
    />
  );
};

export default CardViewPage;
