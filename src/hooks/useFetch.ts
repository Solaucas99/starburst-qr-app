import useSWR, { KeyedMutator } from 'swr';
import axios from '../services/axios';

interface ResponseDataType<T> {
  message: string;
  data?: T;
}

interface Fetch<T> {
  data: ResponseDataType<T>;
  isLoading: boolean;
  isError: unknown;
  mutate: KeyedMutator<T>;
}

export function useFetch<T>(url: string): Fetch<T> {
  const { data, error, mutate } = useSWR(url, async blockUrl => {
    const response = await axios.get(blockUrl);
    return response.data;
  });

  return {
    data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}
