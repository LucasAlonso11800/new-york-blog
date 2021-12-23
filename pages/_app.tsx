import '../styles/globals.css'
import type { AppProps } from 'next/app'
// Components
import Header from '../components/Header'
import Footer from '../components/Footer'
import Aside from '../components/Aside'

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Header />
            <Component {...pageProps} />
            <Aside />
            <Footer />
        </>
    )
}