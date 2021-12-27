import '../styles/globals.css'
import type { AppProps } from 'next/app'
// GraphQL
import { ApolloProvider } from '@apollo/client'
import { client } from '../const/ApolloConfig'

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ApolloProvider client={client}>
            <Component {...pageProps} />
        </ApolloProvider>
    )
};