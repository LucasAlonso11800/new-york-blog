import '../styles/globals.css'
import type { AppProps } from 'next/app'
// GraphQL
import { ApolloProvider } from '@apollo/client'
import { client } from '../ApolloClient/ApolloConfig'
// Context
import { GlobalProvider } from '../context/GlobalContext'

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ApolloProvider client={client}>
            <GlobalProvider>
                <Component {...pageProps} />
            </GlobalProvider>
        </ApolloProvider>
    )
};