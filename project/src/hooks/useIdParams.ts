import { useParams } from 'react-router-dom';
import { ParamsWithId } from '../types/types';

export const useIdParam = () => {
  const { id } = useParams() as ParamsWithId;

  if (!id) {
    throw new Error('Id param does not exist');
  }

  const parsedId = Number(id);

  if (Number.isNaN(parsedId)) {
    throw new Error('Id is not valid');
  }

  return parsedId;
};

