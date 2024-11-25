import { useQuery } from '@apollo/client';
import { GET_POKEMONS } from '../../api/queries/pokemonTable.ts';
import { GetPokemonsQuery } from '../../api/__generated__/graphql.ts';
import BaseTable from '../../components/BaseTable/BaseTable.tsx';
import { TABLE_HEAD } from './consts.ts';
import { CARD_MODE, PAGINATION_DEFAULT } from '../../utils/consts.ts';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header.tsx';
import Loader from '../../components/Loader/Loader.tsx';
import styles from './CatalogPage.module.scss';
import { useEffect, useState } from 'react';

const CatalogPage = () => {
  const navigator = useNavigate();
  const location = useLocation();
  const [updatedData, setUpdatedData] = useState<
    GetPokemonsQuery | undefined
  >();

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

  if (error) {
    navigator('/error');
  }

  const onSelectRow = (rowId: number) => {
    navigator(`/card/view/${rowId}`, {
      state: {
        page: currentPage,
        pageSize: currentPageSize,
        cardMode: CARD_MODE.VIEW,
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
