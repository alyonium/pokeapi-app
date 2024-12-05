import { gql } from '@apollo/client';

export const GET_POKEMONS = gql(`
  query GetPokemons($limit: Int!, $offset: Int!, $name: String!) {
    pokemon_v2_pokemon(limit: $limit, offset: $offset, where: { name: { _ilike: $name } }, order_by: {name: asc}) {
      id
      height
      name
      weight
      base_experience
    }
    pokemon_v2_pokemon_aggregate(where: {name: { _ilike: $name }}) {
      aggregate {
        count
      }
    }
  }
`);
