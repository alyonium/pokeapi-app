import { gql } from '@apollo/client';

export const UPDATE_POKEMON_LOCAL = gql`
  mutation UpdatePokemonLocal(
    $id: Int!
    $input: pokemon_v2_pokemon_set_input!
  ) {
    updatePokemonLocal(id: $id, input: $input) @client
  }
`;
