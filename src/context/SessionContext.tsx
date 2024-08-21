import { ReactNode, createContext, useContext, useState } from 'react';

type TProps = {
    children: ReactNode;
};

type TUser = {
    name?: string;
    email?: string;
    phone?: string;
    token?: string;
    id: number;
    avatar?: string;
    gender?: string;
    birthdate?: string;
};

type TState = {
    isAuth: boolean;
    user?: TUser;
};

const initState: TState = {
    isAuth: false,
};

const ContextSession = createContext<[TState, (session: TState) => void]>([initState, () => {}]);
const useSessionContext = () => useContext(ContextSession);

function SessionContextProvider(props: TProps) {
    const [stateContext, setStateContext] = useState<TState>(initState);
    const values: [TState, typeof setStateContext] = [stateContext, setStateContext];

    // useEffect(() => {
    //     const user: any = localStorage.getItem('user');
    //     if (user) {
    //         const data = JSON.parse(user);
    //         if (data) {
    //             initState.isAuth = true;
    //             initState.user = {
    //                 name: data.name,
    //                 email: data.email,
    //                 phone: data.phone,
    //                 token: data.token,
    //             };
    //         }
    //     }
    // }, []);

    return <ContextSession.Provider value={values}>{props.children}</ContextSession.Provider>;
}

export default SessionContextProvider;
export { useSessionContext };
