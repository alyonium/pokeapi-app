import { gql } from '@apollo/client';

export const GET_POKEMONS = gql(`
  query GetPokemons($limit: Int!, $offset: Int!) {
      pokemon_v2_pokemon(limit: $limit, offset: $offset, order_by: {name: asc}) {
        id
        height
        name
        weight
        base_experience
      }
      pokemon_v2_pokemon_aggregate {
        aggregate {
          count
        }
      }
    }
`);
