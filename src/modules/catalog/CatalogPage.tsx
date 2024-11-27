import { useQuery } from '@apollo/client';
import { GET_POKEMONS } from '../../api/queries/pokemonTable.ts';
import { GetPokemonsQuery } from '../../api/__generated__/graphql.ts';
import BaseTable from '../../components/BaseTable/BaseTable.tsx';
import { TABLE_HEAD } from './consts.ts';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header.tsx';
import Loader from '../../components/Loader/Loader.tsx';
import styles from './CatalogPage.module.scss';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { usePagination } from '../../utils/usePagination.ts';
import { PAGINATION_DEFAULT } from '../../utils/consts.ts';

const CatalogPage = () => {
  const navigator = useNavigate();
  const { currentPage, currentPageSize } = usePagination();
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  useEffect(() => {
    if (!currentPage || !currentPageSize) {
      setSearchParams({
        page: `${PAGINATION_DEFAULT.PAGE}`,
        pageSize: `${PAGINATION_DEFAULT.PAGE_SIZE}`,
      });
    } else {
      setSearchParams({
        page: searchParams.get('page') || location.state?.page,
        pageSize: searchParams.get('pageSize') || location.state?.pageSize,
      });
    }
  }, [currentPage, currentPageSize, setSearchParams]);

  const [updatedData, setUpdatedData] = useState<
    GetPokemonsQuery | undefined
  >();

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

  useEffect(() => {
    const updatedFromLocalStorageData = data?.pokemon_v2_pokemon?.map(
      (item) => {
        const pokemon = localStorage.getItem(`pokemon_v2_pokemon:${item.id}`);
        if (pokemon) {
          const editedPokemonFields = JSON.parse(pokemon);
          return { ...item, ...editedPokemonFields };
        } else {
          return item;
        }
      },
    );

    if (updatedFromLocalStorageData) {
      setUpdatedData({
        pokemon_v2_pokemon: [...updatedFromLocalStorageData],
        pokemon_v2_pokemon_aggregate: data?.pokemon_v2_pokemon_aggregate,
      } as GetPokemonsQuery);
    }
  }, [data]);

  const onSelectRow = (rowId: number) => {
    navigator(`/card/view/${rowId}`, {
      state: {
        page: currentPage,
        pageSize: currentPageSize,
      },
    });
  };

  if (error) {
    navigator('/error');
  }

  return (
    <>
      <Header />
      <div className={styles.contentWrapper}>
        {loading ? (
          <Loader />
        ) : (
          <BaseTable
            cols={TABLE_HEAD}
            rows={updatedData?.pokemon_v2_pokemon as Array<GetPokemonsQuery>}
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
