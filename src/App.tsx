import './App.css';
import { useQuery } from '@apollo/client';
import { GET_POKEMONS } from './api/queries/pokemonTable.ts';

function App() {
  const { loading, error, data } = useQuery(GET_POKEMONS);

  console.log({ loading, error, data });

  return (
    <>
      {data?.pokemon_v2_pokemon.map(({ id, name }) => (
        <div key={id}>
          <h3>
            {id} {name}
          </h3>
        </div>
      ))}
    </>
  );
}

export default App;
