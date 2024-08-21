import { useEffect, useState } from 'react';
import AOS from 'aos';

type TProps = {
    children: React.ReactElement;
};

function AosContext(props: TProps) {
    const [init, setInit] = useState<boolean>(false);

    useEffect(() => {
        init &&
            AOS.init({
                throttleDelay: 120,
                duration: 800,
                offset: 0,
                once: true,
            });

        setInit(true);
    }, [init]);

    return props.children;
}

export default AosContext;
