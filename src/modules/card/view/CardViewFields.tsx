import styles from '../components/CardPageWrapper/CardPageWrapper.module.scss';
import { GetPokemonByIdQuery } from '../../../api/__generated__/graphql.ts';
import { IMAGE_URL } from '../../../utils/consts.ts';
import { useNavigate } from 'react-router-dom';

type CardViewFieldsProps = {
  data: GetPokemonByIdQuery | undefined;
};

const CardViewFields = ({ data }: CardViewFieldsProps) => {
  const navigator = useNavigate();

  if (!data) {
    navigator('/error');
  }

  return (
    <>
      <div className={styles.dataItemWrapper}>
        <div className={styles.dataItem}>
          <span className={styles.dataItemHeader}>Name: </span>
          <span>{data?.pokemon_v2_pokemon[0]?.name}</span>
        </div>
        <div className={styles.dataItem}>
          <span className={styles.dataItemHeader}>Height: </span>
          <span>{data?.pokemon_v2_pokemon[0]?.height}</span>
        </div>
        <div className={styles.dataItem}>
          <span className={styles.dataItemHeader}>Weight: </span>
          <span>{data?.pokemon_v2_pokemon[0]?.weight}</span>
        </div>
        <div className={styles.dataItem}>
          <span className={styles.dataItemHeader}>Base experience: </span>
          <span>{data?.pokemon_v2_pokemon[0]?.base_experience}</span>
        </div>
        <div className={styles.dataItem}>
          <span className={styles.dataItemHeader}>Pokemon abilities: </span>
          <span>
            {data?.pokemon_v2_pokemon[0]?.pokemon_v2_pokemonabilities?.length
              ? data?.pokemon_v2_pokemon[0]?.pokemon_v2_pokemonabilities
                  .map((ability) => {
                    return ability.pokemon_v2_ability?.name;
                  })
                  .join(', ')
              : 'no abilities'}
          </span>
        </div>
      </div>
      <img
        alt={data?.pokemon_v2_pokemon[0]?.name}
        src={`${IMAGE_URL}${data?.pokemon_v2_pokemon[0]?.id}.png`}
      />
    </>
  );
};

export default CardViewFields;
