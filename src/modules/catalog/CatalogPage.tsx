import { useQuery } from '@apollo/client';
import { GET_POKEMONS } from '../../api/queries/pokemonTable.ts';
import { GetPokemonsQuery } from '../../api/__generated__/graphql.ts';
import BaseTable from '../../components/BaseTable/BaseTable.tsx';
import { TABLE_HEAD } from './consts.ts';
import { PAGE_SIZE } from '../../utils/consts.ts';

const CatalogPage = () => {
  const { loading, error, data, refetch } = useQuery<GetPokemonsQuery>(
    GET_POKEMONS,
    { variables: { limit: PAGE_SIZE, offset: 0 } },
  );
  console.log({ loading, error, data });

  const updateTable = (currentPage, currentPageSize) => {
    refetch({
      limit: currentPageSize,
      offset: (currentPage - 1) * currentPageSize,
    });
  };

  return (
    <>
      <BaseTable
        cols={TABLE_HEAD}
        rows={data?.pokemon_v2_pokemon as Array<GetPokemonsQuery>}
        totalCount={data?.pokemon_v2_pokemon_aggregate.aggregate?.count}
        onUpdatePagination={updateTable}
      />
    </>
  );
};

export default CatalogPage;
