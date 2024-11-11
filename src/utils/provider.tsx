import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BASE_URL } from './consts.ts';
import { ReactNode } from 'react';

const provider = new ApolloClient({
  uri: BASE_URL,
  cache: new InMemoryCache(),
});

type ProviderProps = {
  children: ReactNode;
};

const Provider = ({ children }: ProviderProps) => {
  return <ApolloProvider client={provider}>{children}</ApolloProvider>;
};

export default Provider;
