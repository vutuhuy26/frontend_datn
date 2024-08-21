import { useState, useEffect } from 'react';

function useDebounce(value: string, timer: number) {
    const [debounce, setDebounce] = useState<string>(value);

    useEffect(() => {
        const idTimer = setTimeout(() => setDebounce(value), timer);

        return () => clearTimeout(idTimer);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    return debounce;
}

export default useDebounce;
