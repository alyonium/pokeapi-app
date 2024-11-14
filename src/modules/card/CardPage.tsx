import { useQuery } from '@apollo/client';
import { GetPokemonByIdQuery } from '../../api/__generated__/graphql.ts';
import { GET_POKEMON_BY_ID } from '../../api/queries/pokemonPage.ts';
import Header from '../../components/Header/Header.tsx';
import { useParams } from 'react-router-dom';
import styles from './CardPage.module.scss';
import { useNavigate, useLocation } from 'react-router-dom';
import Loader from '../../components/Loader/Loader.tsx';
import { IMAGE_URL, PAGINATION_DEFAULT } from '../../utils/consts.ts';

const CardPage = () => {
  const { cardId } = useParams();
  const navigator = useNavigate();
  const location = useLocation();

  const currentPage = parseInt(location.state?.page) || PAGINATION_DEFAULT.PAGE;
  const currentPageSize =
    parseInt(location.state?.pageSize) || PAGINATION_DEFAULT.PAGE_SIZE;

  const { loading, error, data } = useQuery<GetPokemonByIdQuery>(
    GET_POKEMON_BY_ID,
    {
      variables: {
        id: cardId,
      },
    },
  );

  if (error) {
    navigator('/error');
  }

  return (
    <>
      <Header />

      <div
        className={styles.button}
        onClick={() =>
          navigator(`/catalog`, {
            state: {
              page: currentPage,
              pageSize: currentPageSize,
            },
          })
        }
      >
        Back to catalog
      </div>
      <div className={styles.contentWrapper}>
        {loading ? (
          <Loader />
        ) : (
          <>
            <img
              alt={data?.pokemon_v2_pokemon[0]?.name}
              src={`${IMAGE_URL}${data?.pokemon_v2_pokemon[0]?.id}.png`}
            />
            <div>{data?.pokemon_v2_pokemon[0]?.name}</div>
            <div>{data?.pokemon_v2_pokemon[0]?.height}</div>
            <div>{data?.pokemon_v2_pokemon[0]?.weight}</div>
            <div>{data?.pokemon_v2_pokemon[0]?.base_experience}</div>
          </>
        )}
      </div>
    </>
  );
};

export default CardPage;
