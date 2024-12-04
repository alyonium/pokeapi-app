import { Column } from '../../components/BaseTable/table';
import { GetPokemonsQuery } from '../../api/__generated__/graphql.ts';
import { POKEMON_V2_POKEMON } from '../../utils/consts.ts';

export type TableColumnKeys = Exclude<
  keyof GetPokemonsQuery[POKEMON_V2_POKEMON][number],
  '__typename' | 'id'
>;

export const TABLE_HEAD: Array<
  Column<GetPokemonsQuery[POKEMON_V2_POKEMON][number], TableColumnKeys>
> = [
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
];

export const DEFAULT_DATA: GetPokemonsQuery = {
  pokemon_v2_pokemon: [],
  pokemon_v2_pokemon_aggregate: {
    __typename: 'pokemon_v2_pokemon_aggregate',
    aggregate: {
      __typename: 'pokemon_v2_pokemon_aggregate_fields',
      count: 0,
    },
  },
};
