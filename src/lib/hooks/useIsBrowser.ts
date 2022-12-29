import { useEffect, useState } from 'react';

export default function useIsBrowser(): boolean {
    const [isBrowser, setIsBrowser] = useState(false);

    useEffect(() => {
        setIsBrowser(true);
    }, []);

    return isBrowser;
}
