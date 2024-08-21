import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSessionContext } from '../../context/SessionContext';
import routesConfig from '../../config/routes';

type _T_Props = {
    component: () => JSX.Element;
    redirect?: string;
};

function PrivateRoute(props: _T_Props) {
    const [values] = useSessionContext();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!values.isAuth) {
            navigate(routesConfig.login, {
                state: {
                    redirect: location.pathname ? location.pathname : props.redirect,
                },
            });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [values.isAuth]);

    return <>{values.isAuth && <props.component />}</>;
}

export default PrivateRoute;
