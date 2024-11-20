import styles from '../components/CardPageWrapper/CardPageWrapper.module.scss';
import { GetPokemonByIdQuery } from '../../../api/__generated__/graphql.ts';
import { IMAGE_URL } from '../../../utils/consts.ts';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type CardEditFieldsProps = {
  data: GetPokemonByIdQuery | undefined;
  lockForm: () => void;
  onFieldChange: (
    fieldId: keyof GetPokemonByIdQuery['pokemon_v2_pokemon'][0],
    fieldValue: never,
  ) => void;
};

const CardEditFields = ({
  data,
  lockForm,
  onFieldChange,
}: CardEditFieldsProps) => {
  const [formTouched, setFromTouched] = useState<boolean>(false);
  const navigator = useNavigate();

  useEffect(() => {
    if (formTouched) {
      lockForm();
    }
  }, [formTouched]);

  const onChange = (
    fieldId: keyof GetPokemonByIdQuery['pokemon_v2_pokemon'][0],
  ) => {
    if (!formTouched) {
      setFromTouched(true);
    }

    onFieldChange(fieldId, document.getElementById(fieldId)?.value);
  };

  if (!data) {
    navigator('/error');
  }

  return (
    <>
      <div className={styles.dataItemWrapper}>
        <div className={styles.dataItem}>
          <label className={styles.dataItemHeader} htmlFor="name">
            Name:
          </label>

          <input
            defaultValue={data?.pokemon_v2_pokemon[0]?.name}
            onChange={() => onChange('name')}
            type="text"
            id="name"
            name="name"
            required
            minLength="1"
            maxLength="100"
            size="30"
          />
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
        {data?.pokemon_v2_pokemon[0]?.pokemon_v2_pokemonabilities.length && (
          <div className={styles.dataItem}>
            <span className={styles.dataItemHeader}>Pokemon form: </span>
            <span>
              {data?.pokemon_v2_pokemon[0]?.pokemon_v2_pokemonabilities
                .map((ability) => {
                  return ability.pokemon_v2_ability?.name;
                })
                .join(', ')}
            </span>
          </div>
        )}
      </div>
      <img
        alt={data?.pokemon_v2_pokemon[0]?.name}
        src={`${IMAGE_URL}${data?.pokemon_v2_pokemon[0]?.id}.png`}
      />
    </>
  );
};

export default CardEditFields;
