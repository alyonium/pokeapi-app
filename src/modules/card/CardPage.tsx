import { useQuery } from '@apollo/client';
import { GetPokemonByIdQuery } from '../../api/__generated__/graphql.ts';
import { GET_POKEMON_BY_ID } from '../../api/queries/pokemonPage.ts';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { CARD_MODE, ROUTE } from '../../router/consts.ts';
import CardViewPage from './view/CardViewPage.tsx';
import CardEditPage from './edit/CardEditPage.tsx';
import { POKEMON_V2_POKEMON } from '../../utils/consts.ts';
import { DEFAULT_DATA } from './consts.ts';
import { useMemo } from 'react';

const CardPage = () => {
  const { cardId, cardMode } = useParams();
  const navigator = useNavigate();

  if (CARD_MODE.VIEW !== cardMode && CARD_MODE.EDIT !== cardMode) {
    navigator(ROUTE.ERROR);
  }

  const { loading, error, data } = useQuery<GetPokemonByIdQuery>(
    GET_POKEMON_BY_ID,
    {
      variables: {
        id: cardId,
      },
    },
  );

  const newData = useMemo(() => {
    if (!data) {
      return DEFAULT_DATA;
    }

    const pokemon = localStorage.getItem(`${POKEMON_V2_POKEMON}:${cardId}`);

    if (pokemon) {
      const editedPokemonFields = JSON.parse(pokemon);
      return {
        pokemon_v2_pokemon: [
          {
            ...data.pokemon_v2_pokemon[0],
            ...editedPokemonFields,
          },
        ],
      };
    } else {
      return data;
    }
  }, [data]);

  if (error || newData?.pokemon_v2_pokemon?.length <= 0) {
    navigator(ROUTE.ERROR);
  }

  if (cardMode === CARD_MODE.VIEW) {
    return <CardViewPage loading={loading} data={newData} />;
  }

  if (cardMode === CARD_MODE.EDIT) {
    return <CardEditPage loading={loading} data={newData} />;
  }
};

export default CardPage;
