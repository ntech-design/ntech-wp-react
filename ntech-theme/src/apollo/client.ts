import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
});

const authLink = setContext((_, { headers }) => {
  // JWT / nonce / basic auth etc.
  return { headers };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    resultCaching: true
  }),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-first'
    }
  }
});

export default client;
