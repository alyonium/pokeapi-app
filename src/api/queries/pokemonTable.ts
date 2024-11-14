import { gql } from '@apollo/client';

export const GET_POKEMONS = gql(`
  query GetPokemons($limit: Int!, $offset: Int!) {
      pokemon_v2_pokemon(limit: $limit, offset: $offset, order_by: {id: asc}) {
        id
        height
        name
        weight
        order
        base_experience
      }
      pokemon_v2_pokemon_aggregate {
        aggregate {
          count
        }
      }
    }
`);
