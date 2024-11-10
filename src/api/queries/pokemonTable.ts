import { gql } from '@apollo/client';

export const GET_POKEMONS = gql(`
  query GetPokemons {
    pokemon_v2_pokemon(limit: 10, offset: 10, order_by: { id: asc }) {
      id
      height
      name
      order
    }
  }
`);
