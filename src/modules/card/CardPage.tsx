import { useQuery } from '@apollo/client';
import { GetPokemonByIdQuery } from '../../api/__generated__/graphql.ts';
import { GET_POKEMON_BY_ID } from '../../api/queries/pokemonPage.ts';

const CardPage = () => {
  const { loading, error, data } =
    useQuery<GetPokemonByIdQuery>(GET_POKEMON_BY_ID);

  console.log({ loading, error, data });

  return <div>CardPage</div>;
};

export default CardPage;
