import React from 'react';
import 'aos/dist/aos.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './overridePrime.css';
import './GlobalStyles.scss';

type Props = {
    children: React.ReactElement;
};

function GlobalStyles(props: Props) {
    return <>{props.children}</>;
}

export default GlobalStyles;
