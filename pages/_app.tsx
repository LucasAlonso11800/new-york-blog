import '../styles/globals.css'
import type { AppProps } from 'next/app'
// Apollo
import { ApolloProvider } from '@apollo/client'
import { client } from '../const/ApolloConfig'
// Components
import Header from '../components/LayoutComponents/Header'
import Footer from '../components/LayoutComponents/Footer'
import Aside from '../components/LayoutComponents/Aside'

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ApolloProvider client={client}>
            <Header />
            <Component {...pageProps} />
            <Aside />
            <Footer />
        </ApolloProvider>
    )
};