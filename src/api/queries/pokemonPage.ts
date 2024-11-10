import { gql } from '@apollo/client';

export const GET_POKEMON_BY_ID = gql(`
  query GetPokemonById($id: Int!) {
    pokemon_v2_pokemon(where: { id: { _eq: $id } }) {
      id
      height
      name
      order
    }
  }
`);
