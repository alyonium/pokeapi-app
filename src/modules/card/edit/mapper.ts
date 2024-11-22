import { GetPokemonByIdQuery } from '../../../api/__generated__/graphql.ts';
import { Options } from 'react-select';

export const mapPokemonAbilitiesToFront = (
  data: GetPokemonByIdQuery | undefined,
): Options<{ label: string; value: string }> | undefined => {
  return data?.pokemon_v2_pokemon[0].pokemon_v2_pokemonabilities.map((item) => {
    return {
      value: `${item.pokemon_v2_ability!.id}`,
      label: item.pokemon_v2_ability!.name,
    };
  });
};

export const mapPokemonAbilitiesToBack = (
  data: { value: string; label: string }[] | undefined,
):
  | { pokemon_v2_ability: { __typename: string; name: string; id: number } }[]
  | undefined => {
  return data?.map((item) => {
    return {
      pokemon_v2_ability: {
        name: item.label,
        id: +item.value,
        __typename: 'pokemon_v2_ability',
      },
    };
  });
};
