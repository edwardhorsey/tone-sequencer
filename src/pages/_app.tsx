import type { AppProps } from 'next/app';
import { TracksProvider } from 'src/contexts/TracksContext';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <TracksProvider>
            <Component {...pageProps} />
        </TracksProvider>
    );
}
