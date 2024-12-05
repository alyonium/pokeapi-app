import { useQuery } from '@apollo/client';
import { GET_POKEMONS } from '../../api/queries/pokemonTable.ts';
import { GetPokemonsQuery } from '../../api/__generated__/graphql.ts';
import BaseTable from '../../components/BaseTable/BaseTable.tsx';
import { DEFAULT_DATA, TABLE_HEAD, TableColumnKeys } from './consts.ts';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header.tsx';
import Loader from '../../components/Loader/Loader.tsx';
import styles from './CatalogPage.module.scss';
import { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { usePagination } from '../../utils/usePagination.ts';
import { PAGINATION_DEFAULT, POKEMON_V2_POKEMON } from '../../utils/consts.ts';
import { ROUTE } from '../../router/consts.ts';
import { getCurrentPaginationOptions } from './utils.ts';
import DebounceInput from '../../components/DebounceInput/DebounceInput.tsx';

const CatalogPage = () => {
  const navigator = useNavigate();
  const { currentPage, currentPageSize } = usePagination();
  const [, setSearchParams] = useSearchParams();
  const [debounceInputValue, setDebounceInputValue] = useState<string>('');

  const { loading, error, data, refetch } = useQuery<GetPokemonsQuery>(
    GET_POKEMONS,
    {
      variables: {
        limit: currentPageSize,
        offset: (currentPage - 1) * currentPageSize,
        name: `${debounceInputValue}%`,
      },
    },
  );

  const newData = useMemo(() => {
    if (!data) {
      return DEFAULT_DATA;
    }

    const updatedFromLocalStorageData = data?.pokemon_v2_pokemon?.map(
      (item) => {
        const pokemon = localStorage.getItem(
          `${POKEMON_V2_POKEMON}:${item.id}`,
        );
        if (pokemon) {
          const editedPokemonFields = JSON.parse(pokemon);
          return { ...item, ...editedPokemonFields };
        } else {
          return item;
        }
      },
    );

    if (updatedFromLocalStorageData) {
      return {
        pokemon_v2_pokemon: [...updatedFromLocalStorageData],
        pokemon_v2_pokemon_aggregate: data?.pokemon_v2_pokemon_aggregate,
      };
    } else {
      return data;
    }
  }, [data]);

  useEffect(() => {
    if (!loading) {
      const totalPages = Math.ceil(
        newData.pokemon_v2_pokemon_aggregate.aggregate.count / currentPageSize,
      );

      const currentPaginationOptions = getCurrentPaginationOptions({
        currentPage,
        currentPageSize,
        totalPages,
      });

      setSearchParams(currentPaginationOptions);
    }
  }, [currentPage, currentPageSize, newData]);

  const updateTable = (currentPage, currentPageSize) => {
    refetch({
      limit: currentPageSize,
      offset: (currentPage - 1) * currentPageSize,
      name: `${debounceInputValue}%`,
    });
  };

  const onSelectRow = (rowId: number) => {
    navigator(`${ROUTE.CARD_VIEW}/${rowId}`, {
      state: {
        page: currentPage,
        pageSize: currentPageSize,
      },
    });
  };

  const onSearch = (searchValue: string) => {
    setDebounceInputValue(searchValue);
    setSearchParams({
      page: `${PAGINATION_DEFAULT.PAGE}`,
      pageSize: `${currentPageSize}`,
    });
    updateTable(PAGINATION_DEFAULT.PAGE, currentPageSize);
  };

  if (error) {
    navigator(ROUTE.ERROR);
  }

  return (
    <>
      <Header />
      <div className={styles.contentWrapper}>
        <DebounceInput getDebouncedValue={onSearch} />

        {loading ? (
          <div className={styles.loaderWrapper}>
            <Loader />
          </div>
        ) : (
          <BaseTable<
            GetPokemonsQuery[POKEMON_V2_POKEMON][number],
            TableColumnKeys
          >
            cols={TABLE_HEAD}
            rows={newData.pokemon_v2_pokemon as Array<GetPokemonsQuery>}
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
