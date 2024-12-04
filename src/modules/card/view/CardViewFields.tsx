import styles from '../components/CardPageWrapper/CardPageWrapper.module.scss';
import { GetPokemonByIdQuery } from '../../../api/__generated__/graphql.ts';
import { IMAGE_URL } from '../../../utils/consts.ts';
import { useNavigate } from 'react-router-dom';
import { FIELDS } from '../consts.ts';
import { ROUTE } from '../../../router/consts.ts';

type CardViewFieldsProps = {
  data: GetPokemonByIdQuery | undefined;
};

const CardViewFields = ({ data }: CardViewFieldsProps) => {
  const navigator = useNavigate();

  if (!data) {
    navigator(ROUTE.ERROR);
  }

  return (
    <>
      <div className={styles.dataItemWrapper}>
        {Object.keys(FIELDS).map((item: string) => {
          return (
            <div key={FIELDS[item].id} className={styles.dataItem}>
              <span className={styles.dataItemHeader}>
                {FIELDS[item].label}:{' '}
              </span>
              <span>{data?.pokemon_v2_pokemon[0][FIELDS[item].id]}</span>
            </div>
          );
        })}

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
