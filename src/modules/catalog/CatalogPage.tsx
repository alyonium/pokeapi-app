import { useQuery } from '@apollo/client';
import { GET_POKEMONS } from '../../api/queries/pokemonTable.ts';
import { GetPokemonsQuery } from '../../api/__generated__/graphql.ts';
import BaseTable from '../../components/BaseTable/BaseTable.tsx';
import { TABLE_HEAD } from './consts.ts';

const CatalogPage = () => {
  const { loading, error, data } = useQuery<GetPokemonsQuery>(GET_POKEMONS);

  console.log({ loading, error, data });

  return (
    <>
      <BaseTable
        cols={TABLE_HEAD}
        rows={data?.pokemon_v2_pokemon as Array<GetPokemonsQuery>}
      />
    </>
  );
};

export default CatalogPage;
