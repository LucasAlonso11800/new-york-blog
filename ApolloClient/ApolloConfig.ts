import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { SERVER_URL } from '../const/ServerURL';

export const httpLink = createHttpLink({ uri: SERVER_URL });

export const authLink = setContext((_, { headers }) => {
    const token = typeof window !== 'undefined' ? window.localStorage.getItem("token") : '';
    return {
        headers: {
            ...headers,
            Authorization: token ? `Bearer ${token}` : ''
        }
    }
});

export const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    connectToDevTools: true
});