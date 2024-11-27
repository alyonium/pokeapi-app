import CardPageWrapper from '../components/CardPageWrapper/CardPageWrapper.tsx';
import CardEditButtons from './CardEditButtons.tsx';
import CardEditFields from './CardEditFields.tsx';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { GetPokemonByIdQuery } from '../../../api/__generated__/graphql.ts';
import { BUTTON_MODE } from '../../../utils/consts.ts';
import { useMutation } from '@apollo/client';
import { UPDATE_POKEMON_LOCAL } from '../../../api/mutations/pokemonPage.ts';
import { FIELDS } from '../consts.ts';
import BaseModal from '../../../components/BaseModal/BaseModal.tsx';
import styles from '../components/CardPageWrapper/CardPageWrapper.module.scss';
import Button from '../../../components/Button/Button.tsx';
import { usePagination } from '../../../utils/usePagination.ts';

type CardEditPageProps = {
  loading: boolean;
  data: GetPokemonByIdQuery | undefined;
};

const CardEditPage = ({ data, loading }: CardEditPageProps) => {
  const navigator = useNavigate();
  const { cardId } = useParams();
  const [isFormLocked, setIsFormLocked] = useState<boolean>(false);
  const [isModalWindowOpen, setIsModalWindow] = useState<boolean>(false);
  const [nonValidFields, setNonValidFields] = useState<string[]>([]);
  const [editedFields, setEditedFields] =
    useState<Partial<GetPokemonByIdQuery['pokemon_v2_pokemon'][0]>>();
  const [updatePokemonLocal] = useMutation(UPDATE_POKEMON_LOCAL);
  const { currentPage, currentPageSize } = usePagination();

  const navigateToCardViewMode = () => {
    navigator(`/card/view/${cardId}`, {
      state: {
        page: currentPage,
        pageSize: currentPageSize,
      },
    });
  };

  const checkValidation = () => {
    let flag = true;

    if (!editedFields) {
      return true;
    }

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

    navigateToCardViewMode();
  };

  const handleCancel = () => {
    if (!isFormLocked) {
      navigateToCardViewMode();
    } else {
      setIsModalWindow(true);
    }
  };

  return (
    <>
      <CardPageWrapper
        loading={loading}
        buttonsBlock={
          <CardEditButtons
            currentPage={currentPage}
            currentPageSize={currentPageSize}
            cardId={cardId}
            isFormLocked={isFormLocked}
            handleSave={handleSave}
            handleCancel={handleCancel}
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

      {isModalWindowOpen && (
        <BaseModal
          header="Warning"
          text="You already changed something in the form. Are you sure you want to discard your changes?"
          buttons={
            <>
              <div className={styles.buttonGroupWrapper}>
                <Button
                  text="Continue editing"
                  state={BUTTON_MODE.SAVE}
                  onClick={() => setIsModalWindow(false)}
                />
                <Button
                  text="Discard changes"
                  state={BUTTON_MODE.CANCEL}
                  onClick={navigateToCardViewMode}
                />
              </div>
            </>
          }
        />
      )}
    </>
  );
};

export default CardEditPage;
