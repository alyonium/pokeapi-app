import styles from '../components/CardPageWrapper/CardPageWrapper.module.scss';
import {
  GetPokemonAbilitiesQuery,
  GetPokemonByIdQuery,
} from '../../../api/__generated__/graphql.ts';
import {
  IMAGE_URL,
  LOADER_SIZE,
  POKEMON_V2_POKEMONABILITIES,
} from '../../../utils/consts.ts';
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
import Loader from '../../../components/Loader/Loader.tsx';
import { ROUTE } from '../../../router/consts.ts';
import { POKEMON_V2_POKEMON } from '../../../utils/consts.ts';

type CardEditFieldsProps = {
  data: GetPokemonByIdQuery | undefined;
  lockForm: () => void;
  nonValidFields: string[];
  onFieldChange: (
    fieldId: keyof GetPokemonByIdQuery[POKEMON_V2_POKEMON][0],
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
  const { data: pokemonAbilitiesList, loading: loadingPokemonAbilities } =
    useQuery<GetPokemonAbilitiesQuery>(GET_POKEMON_ABILITIES);

  useEffect(() => {
    if (formTouched) {
      lockForm();
    }
  }, [formTouched]);

  const onChange = (
    fieldId: keyof GetPokemonByIdQuery[POKEMON_V2_POKEMON][0],
    fieldValue,
  ) => {
    if (!formTouched) {
      setFromTouched(true);
    }

    if (FIELDS[fieldId].type === 'text') {
      onFieldChange(fieldId, fieldValue);
      return;
    }

    if (FIELDS[fieldId].type === 'number') {
      onFieldChange(fieldId, +fieldValue);
      return;
    }
  };

  const onSelectChange = (value) => {
    if (!formTouched) {
      setFromTouched(true);
    }

    onFieldChange(
      POKEMON_V2_POKEMONABILITIES,
      mapPokemonAbilitiesToBack(value) as never,
    );
  };

  if (!data) {
    navigator(ROUTE.ERROR);
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
                onChange={(e) => onChange(FIELDS[item].id, e.target.value)}
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

          {loadingPokemonAbilities ? (
            <Loader size={LOADER_SIZE.SMALL} />
          ) : (
            <Select
              isMulti
              id={POKEMON_V2_POKEMONABILITIES}
              onChange={(value) => onSelectChange(value)}
              options={pokemonAbilitiesList?.pokemon_v2_ability?.map(
                (item) => ({
                  value: item.id,
                  label: item.name,
                }),
              )}
              defaultValue={mapPokemonAbilitiesToFront(data)}
            />
          )}
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
