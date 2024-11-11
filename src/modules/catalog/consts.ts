import { Column } from '../../types/table';
import { GetPokemonsQuery } from '../../api/__generated__/graphql.ts';

export const TABLE_HEAD: Array<Column<GetPokemonsQuery, 'pokemon_v2_pokemon'>> =
  [
    {
      field: 'name',
      headerName: 'Name',
    },
    {
      field: 'height',
      headerName: 'Height',
    },
  ] as Array<Column<GetPokemonsQuery, 'pokemon_v2_pokemon'>>;
