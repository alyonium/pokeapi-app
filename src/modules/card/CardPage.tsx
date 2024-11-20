import { useQuery } from '@apollo/client';
import { GetPokemonByIdQuery } from '../../api/__generated__/graphql.ts';
import { GET_POKEMON_BY_ID } from '../../api/queries/pokemonPage.ts';
import { useParams } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import { CARD_MODE } from '../../utils/consts.ts';
import CardViewPage from './view/CardViewPage.tsx';
import CardEditPage from './edit/CardEditPage.tsx';

const CardPage = () => {
  const { cardId, cardMode } = useParams();
  const navigator = useNavigate();
  const location = useLocation();

  if (
    CARD_MODE.VIEW !== cardMode &&
    CARD_MODE.EDIT !== cardMode &&
    CARD_MODE.VIEW !== location.state?.cardMode &&
    CARD_MODE.EDIT !== location.state?.cardMode
  ) {
    navigator('/error');
  }

  const { loading, error, data } = useQuery<GetPokemonByIdQuery>(
    GET_POKEMON_BY_ID,
    {
      variables: {
        id: cardId,
      },
    },
  );

  if (error) {
    navigator('/error');
  }

  if (cardMode === CARD_MODE.VIEW) {
    return <CardViewPage loading={loading} data={data} />;
  }

  if (cardMode === CARD_MODE.EDIT) {
    return <CardEditPage loading={loading} data={data} />;
  }
};

export default CardPage;
