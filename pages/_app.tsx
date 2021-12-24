import '../styles/globals.css'
import type { AppProps } from 'next/app'
// Components
import Header from '../components/LayoutComponents/Header'
import Footer from '../components/LayoutComponents/Footer'
import Aside from '../components/LayoutComponents/Aside'

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