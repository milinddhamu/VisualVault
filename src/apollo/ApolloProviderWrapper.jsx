/* eslint-disable react/prop-types */

import { ApolloProvider } from '@apollo/client';
import {client} from "./client"


export const ApolloProviderWrapper = ({ children }) => (
  <ApolloProvider client={client}>
    {children}
  </ApolloProvider>
);