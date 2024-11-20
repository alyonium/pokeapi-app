import CardPageWrapper from '../components/CardPageWrapper/CardPageWrapper.tsx';
import CardViewButtons from './CardViewButtons.tsx';
import CardViewFields from './CardViewFields.tsx';
import { PAGINATION_DEFAULT } from '../../../utils/consts.ts';
import { useLocation, useParams } from 'react-router-dom';
import { GetPokemonByIdQuery } from '../../../api/__generated__/graphql.ts';

type CardViewPageProps = {
  loading: boolean;
  data: GetPokemonByIdQuery | undefined;
};

const CardViewPage = ({ data, loading }: CardViewPageProps) => {
  const { cardId } = useParams();
  const location = useLocation();
  const currentPage = parseInt(location.state?.page) || PAGINATION_DEFAULT.PAGE;
  const currentPageSize =
    parseInt(location.state?.pageSize) || PAGINATION_DEFAULT.PAGE_SIZE;

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
