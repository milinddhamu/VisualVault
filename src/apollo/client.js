import { ApolloClient, InMemoryCache } from '@apollo/client';

const token = import.meta.env.VITE_API_KEY;


export const client = new ApolloClient({
  uri: "https://napak.stepzen.net/api/photo-gallery/__graphql", // replace with your GraphQL server URI
  cache: new InMemoryCache(),
  headers:{
    Authorization: `apikey ${token}`,
  }
});