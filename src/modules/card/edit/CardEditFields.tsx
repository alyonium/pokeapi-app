import styles from '../components/CardPageWrapper/CardPageWrapper.module.scss';
import {
  GetPokemonAbilitiesQuery,
  GetPokemonByIdQuery,
} from '../../../api/__generated__/graphql.ts';
import { IMAGE_URL } from '../../../utils/consts.ts';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FIELDS } from '../consts.ts';
import { useQuery } from '@apollo/client';
import { GET_POKEMON_ABILITIES } from '../../../api/queries/pokemonPage.ts';
import {
  mapPokemonAbilitiesToBack,
  mapPokemonAbilitiesToFront,
} from './mapper.ts';
import Select from 'react-select';

type CardEditFieldsProps = {
  data: GetPokemonByIdQuery | undefined;
  lockForm: () => void;
  nonValidFields: string[];
  onFieldChange: (
    fieldId: keyof GetPokemonByIdQuery['pokemon_v2_pokemon'][0],
    fieldValue: number | string,
  ) => void;
};

const CardEditFields = ({
  data,
  lockForm,
  onFieldChange,
  nonValidFields,
}: CardEditFieldsProps) => {
  const [formTouched, setFromTouched] = useState<boolean>(false);
  const navigator = useNavigate();
  const { data: pokemonAbilitiesList } = useQuery<GetPokemonAbilitiesQuery>(
    GET_POKEMON_ABILITIES,
  );

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

    if (FIELDS[fieldId].type === 'text') {
      onFieldChange(fieldId, document.getElementById(fieldId)?.value);
      return;
    }

    if (FIELDS[fieldId].type === 'number') {
      onFieldChange(fieldId, +document.getElementById(fieldId)?.value);
      return;
    }
  };

  const onSelectChange = (value) => {
    if (!formTouched) {
      setFromTouched(true);
    }

    onFieldChange(
      'pokemon_v2_pokemonabilities',
      mapPokemonAbilitiesToBack(value) as never,
    );
  };

  if (!data) {
    navigator('/error');
  }

  return (
    <>
      <div className={styles.dataItemWrapper}>
        {nonValidFields.length > 0 && (
          <span className={styles.validationMessage}>
            It is required to fill these fields: {nonValidFields.join(', ')}
          </span>
        )}

        {Object.keys(FIELDS).map((item: string) => {
          return (
            <div key={FIELDS[item].id} className={styles.dataItem}>
              <label
                className={styles.dataItemHeader}
                htmlFor={FIELDS[item].id}
              >
                {FIELDS[item].label}:
              </label>

              <input
                defaultValue={data?.pokemon_v2_pokemon[0][FIELDS[item].id]}
                onChange={() => onChange(FIELDS[item].id)}
                type={FIELDS[item].type}
                id={FIELDS[item].id}
                required
                minLength="1"
                maxLength="100"
                size="30"
              />
            </div>
          );
        })}

        <div className={styles.dataItem}>
          <label className={styles.dataItemHeader}>Pokemon abilities:</label>

          <Select
            isMulti
            id={'pokemon_v2_pokemonabilities'}
            onChange={(value) => onSelectChange(value)}
            options={pokemonAbilitiesList?.pokemon_v2_ability?.map((item) => ({
              value: item.id,
              label: item.name,
            }))}
            defaultValue={mapPokemonAbilitiesToFront(data)}
          />
        </div>
      </div>

      <img
        alt={data?.pokemon_v2_pokemon[0]?.name}
        src={`${IMAGE_URL}${data?.pokemon_v2_pokemon[0]?.id}.png`}
      />
    </>
  );
};

export default CardEditFields;
