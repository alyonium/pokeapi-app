import { useQuery } from '@apollo/client';
import { GetPokemonByIdQuery } from '../../api/__generated__/graphql.ts';
import { GET_POKEMON_BY_ID } from '../../api/queries/pokemonPage.ts';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { CARD_MODE } from '../../utils/consts.ts';
import CardViewPage from './view/CardViewPage.tsx';
import CardEditPage from './edit/CardEditPage.tsx';
import { useState, useEffect } from 'react';

const CardPage = () => {
  const { cardId, cardMode } = useParams();
  const navigator = useNavigate();
  const [updatedData, setUpdatedData] = useState<
    GetPokemonByIdQuery | undefined
  >();

  if (CARD_MODE.VIEW !== cardMode && CARD_MODE.EDIT !== cardMode) {
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

  useEffect(() => {
    const pokemon = localStorage.getItem(`pokemon_v2_pokemon:${cardId}`);
    if (pokemon) {
      const editedPokemonFields = JSON.parse(pokemon);
      setUpdatedData({
        pokemon_v2_pokemon: [
          {
            ...data?.pokemon_v2_pokemon[0],
            ...editedPokemonFields,
          },
        ],
      });
    } else {
      setUpdatedData(data);
    }
  }, [data]);

  if (error || updatedData?.pokemon_v2_pokemon.length <= 0) {
    navigator('/error');
  }

  if (cardMode === CARD_MODE.VIEW) {
    return <CardViewPage loading={loading} data={updatedData} />;
  }

  if (cardMode === CARD_MODE.EDIT) {
    return <CardEditPage loading={loading} data={updatedData} />;
  }
};

export default CardPage;
