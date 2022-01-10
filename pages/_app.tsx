import '../styles/globals.css'
import type { AppProps } from 'next/app'
// GraphQL
import { ApolloProvider } from '@apollo/client'
// Context
import { GlobalProvider } from '../context/GlobalContext'
import { useApollo } from '../ApolloClient/NewApolloConfig';

export default function MyApp({ Component, pageProps }: AppProps) {
    const apolloClient = useApollo(pageProps);
    return (
        <ApolloProvider client={apolloClient}>
            <GlobalProvider>
                <Component {...pageProps} />
            </GlobalProvider>
        </ApolloProvider>
    )
};