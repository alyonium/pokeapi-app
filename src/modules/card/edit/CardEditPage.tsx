import CardPageWrapper from '../components/CardPageWrapper/CardPageWrapper.tsx';
import CardEditButtons from './CardEditButtons.tsx';
import CardEditFields from './CardEditFields.tsx';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { GetPokemonByIdQuery } from '../../../api/__generated__/graphql.ts';
import { PAGINATION_DEFAULT } from '../../../utils/consts.ts';
import { useMutation } from '@apollo/client';
import { UPDATE_POKEMON_LOCAL } from '../../../api/mutations/pokemonPage.ts';

type CardEditPageProps = {
  loading: boolean;
  data: GetPokemonByIdQuery | undefined;
};

const CardEditPage = ({ data, loading }: CardEditPageProps) => {
  const { cardId } = useParams();
  const [isFormLocked, setIsFormLocked] = useState<boolean>(false);
  const [editedFields, setEditedFields] =
    useState<Partial<GetPokemonByIdQuery['pokemon_v2_pokemon'][0]>>();
  const navigator = useNavigate();
  const location = useLocation();
  const [updatePokemonLocal] = useMutation(UPDATE_POKEMON_LOCAL);

  const currentPage = parseInt(location.state?.page) || PAGINATION_DEFAULT.PAGE;
  const currentPageSize =
    parseInt(location.state?.pageSize) || PAGINATION_DEFAULT.PAGE_SIZE;

  const handleSave = () => {
    console.log('save');
    // TODO validate fields
    console.log({ editedFields });

    updatePokemonLocal({
      variables: { id: cardId, input: editedFields },
    });

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
