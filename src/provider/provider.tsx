import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BASE_URL } from '../utils/consts.ts';
import { ReactNode } from 'react';
import { resolvers } from './resolvers.ts';

const provider = new ApolloClient({
  uri: BASE_URL,
  cache: new InMemoryCache(),
  resolvers: resolvers,
});

type ProviderProps = {
  children: ReactNode;
};

const Provider = ({ children }: ProviderProps) => {
  return <ApolloProvider client={provider}>{children}</ApolloProvider>;
};

export default Provider;
