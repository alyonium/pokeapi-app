import { useQuery } from '@apollo/client';
import { GET_POKEMONS } from '../../api/queries/pokemonTable.ts';
import { GetPokemonsQuery } from '../../api/__generated__/graphql.ts';
import BaseTable from '../../components/BaseTable/BaseTable.tsx';
import { TABLE_HEAD } from './consts.ts';
import { PAGINATION_DEFAULT } from '../../utils/consts.ts';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header.tsx';
import Loader from '../../components/Loader/Loader.tsx';
import styles from './CatalogPage.module.scss';

const CatalogPage = () => {
  const navigator = useNavigate();
  const location = useLocation();
  const currentPage = parseInt(location.state?.page) || PAGINATION_DEFAULT.PAGE;
  const currentPageSize =
    parseInt(location.state?.pageSize) || PAGINATION_DEFAULT.PAGE_SIZE;

  const { loading, error, data, refetch } = useQuery<GetPokemonsQuery>(
    GET_POKEMONS,
    {
      variables: {
        limit: currentPageSize,
        offset: (currentPage - 1) * currentPageSize,
      },
    },
  );

  const updateTable = (currentPage, currentPageSize) => {
    refetch({
      limit: currentPageSize,
      offset: (currentPage - 1) * currentPageSize,
    });
  };

  if (error) {
    navigator('/error');
  }

  const onSelectRow = (rowId: number) => {
    navigator(`/card/view/${rowId}`, {
      state: {
        page: location.state.page,
        pageSize: location.state.pageSize,
      },
    });
  };

  return (
    <>
      <Header />
      <div className={styles.contentWrapper}>
        {loading ? (
          <Loader />
        ) : (
          <BaseTable
            cols={TABLE_HEAD}
            rows={data?.pokemon_v2_pokemon as Array<GetPokemonsQuery>}
            totalCount={data?.pokemon_v2_pokemon_aggregate.aggregate?.count}
            onUpdatePagination={updateTable}
            onSelectRow={(rowId: number) => onSelectRow(rowId)}
          />
        )}
      </div>
    </>
  );
};

export default CatalogPage;
