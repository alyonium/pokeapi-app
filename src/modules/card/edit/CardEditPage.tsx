import CardPageWrapper from '../components/CardPageWrapper/CardPageWrapper.tsx';
import CardEditButtons from './CardEditButtons.tsx';
import CardEditFields from './CardEditFields.tsx';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { GetPokemonByIdQuery } from '../../../api/__generated__/graphql.ts';
import { PAGINATION_DEFAULT } from '../../../utils/consts.ts';
import { useMutation } from '@apollo/client';
import { UPDATE_POKEMON_LOCAL } from '../../../api/mutations/pokemonPage.ts';
import { FIELDS } from './consts.ts';

type CardEditPageProps = {
  loading: boolean;
  data: GetPokemonByIdQuery | undefined;
};

const CardEditPage = ({ data, loading }: CardEditPageProps) => {
  const { cardId } = useParams();
  const [isFormLocked, setIsFormLocked] = useState<boolean>(false);
  const [nonValidFields, setNonValidFields] = useState<string[]>([]);
  const [editedFields, setEditedFields] =
    useState<Partial<GetPokemonByIdQuery['pokemon_v2_pokemon'][0]>>();
  const navigator = useNavigate();
  const location = useLocation();
  const [updatePokemonLocal] = useMutation(UPDATE_POKEMON_LOCAL);

  const currentPage = parseInt(location.state?.page) || PAGINATION_DEFAULT.PAGE;
  const currentPageSize =
    parseInt(location.state?.pageSize) || PAGINATION_DEFAULT.PAGE_SIZE;

  const checkValidation = () => {
    let flag = true;
    Object.keys(editedFields)?.map((item) => {
      if (FIELDS[item]?.type === 'text') {
        if (editedFields![item] === '') {
          setNonValidFields((prev) => [...prev, FIELDS[item]?.label]);
          flag = false;
        }
      }

      if (FIELDS[item]?.type === 'number') {
        if (editedFields![item] === 0) {
          setNonValidFields((prev) => [...prev, FIELDS[item]?.label]);
          flag = false;
        }
      }
    });

    return flag;
  };

  const handleSave = () => {
    setNonValidFields([]);

    if (!checkValidation()) {
      return;
    }

    updatePokemonLocal({
      variables: { id: +cardId, input: editedFields },
    });

    const pokemon = JSON.parse(
      localStorage.getItem(`pokemon_v2_pokemon:${cardId}`),
    );

    localStorage.setItem(
      `pokemon_v2_pokemon:${cardId}`,
      JSON.stringify({ ...pokemon, id: +cardId, ...editedFields }),
    );

    navigator(`/card/view/${cardId}`, {
      state: {
        page: currentPage,
        pageSize: currentPageSize,
      },
    });
  };

  return (
    <CardPageWrapper
      loading={loading}
      buttonsBlock={
        <CardEditButtons
          currentPage={currentPage}
          currentPageSize={currentPageSize}
          cardId={cardId}
          isFormLocked={isFormLocked}
          handleSave={handleSave}
        />
      }
      fieldsBlock={
        <CardEditFields
          data={data}
          nonValidFields={nonValidFields}
          onFieldChange={(fieldId, fieldValue) => {
            setEditedFields((prev) => ({
              ...prev,
              [fieldId]: fieldValue,
            }));
          }}
          lockForm={() => {
            setIsFormLocked(true);
          }}
        />
      }
    />
  );
};

export default CardEditPage;
