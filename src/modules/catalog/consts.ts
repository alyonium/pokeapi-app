import { Column } from '../../types/table';
import { GetPokemonsQuery } from '../../api/__generated__/graphql.ts';

export const TABLE_HEAD: Array<Column<GetPokemonsQuery, 'pokemon_v2_pokemon'>> =
  [
    {
      field: 'name',
      width: 400,
      headerName: 'Name',
    },
    {
      field: 'height',
      width: 200,
      headerName: 'Height',
    },
    {
      field: 'weight',
      width: 200,
      headerName: 'Weight',
    },
    {
      field: 'base_experience',
      width: 200,
      headerName: 'Base experience',
    },
  ] as Array<Column<GetPokemonsQuery, 'pokemon_v2_pokemon'>>;
