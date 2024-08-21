import { useState, useLayoutEffect } from 'react';

function useWindowPosition() {
    const [scrollPosition, setPosition] = useState<number>(0);

    useLayoutEffect(() => {
        function updatePosition() {
            setPosition(window.scrollY);
        }
        window.addEventListener('scroll', updatePosition);
        updatePosition();

        return () => window.removeEventListener('scroll', updatePosition);
    }, []);

    return scrollPosition;
}

export default useWindowPosition;
