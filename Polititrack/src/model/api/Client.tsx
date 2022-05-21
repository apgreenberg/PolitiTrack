import { ApolloClient, InMemoryCache } from '@apollo/client';

import OPENSTATES_OAUTH_TOKEN from '../../types/env';

const client = new ApolloClient({
  uri: 'https://openstates.org/graphql',
  headers: {
    'X-API-KEY': `${OPENSTATES_OAUTH_TOKEN}`,
  },
  cache: new InMemoryCache(),
});

export default client;
