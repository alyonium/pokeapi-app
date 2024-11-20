import { gql } from '@apollo/client';

export const resolvers = {
  Mutation: {
    updatePokemonLocal: (_, { id, input }, { cache }) => {
      const fragment = gql`
        fragment PokemonFields on pokemon_v2_pokemon {
          id
          name
          height
          weight
          order
          base_experience
          pokemon_v2_pokemonabilities {
            pokemon_v2_ability {
              name
            }
          }
        }
      `;

      const pokemonId = `pokemon_v2_pokemon:${id}`;
      const existingPokemon = cache.readFragment({
        id: pokemonId,
        fragment,
      });

      const updatedPokemon = {
        ...existingPokemon,
        ...input,
      };

      cache.writeFragment({
        id: pokemonId,
        fragment,
        data: updatedPokemon,
      });

      return updatedPokemon;
    },
  },
};
