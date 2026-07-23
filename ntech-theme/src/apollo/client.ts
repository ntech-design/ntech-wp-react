import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { SetContextLink } from '@apollo/client/link/context';

const httpLink = new HttpLink({
  uri: import.meta.env.VITE_GRAPHQL_ENDPOINT,
});

const authLink = new SetContextLink((prevContext) => {
  const headers = prevContext.headers || {};
  return {
    ...prevContext,
    headers: { ...headers },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    resultCaching: true
  }),
  defaultOptions: {
    watchQuery: { fetchPolicy: 'cache-first' },
    query: { fetchPolicy: 'cache-first' },
  },
});

export default client;
