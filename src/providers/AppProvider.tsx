import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { socketContext } from '../context/SocketContext';

type _AppContext = {
    isConnected: boolean;
};

type _T_Props = {
    children: ReactNode;
};

const defaultValue: _AppContext = {
    isConnected: false,
};

const AppContext = createContext(defaultValue);
export const useAppContext = () => useContext<_AppContext>(AppContext);

const AppProvider = (props: _T_Props) => {
    const [connect, setConnect] = useState(defaultValue.isConnected);
    console.log('connected: ', socketContext.id);
    socketContext.on('connect', () => {
        setConnect(true);
    });

    socketContext.on('disconnect', () => {
        setConnect(false);
    });

    useEffect(() => {
        return () => {
            socketContext.off('connect', () => {
                //
            });

            socketContext.off('disconnect', () => {
                //
            });
        };
    }, []);

    const context: _AppContext = {
        isConnected: connect,
    };

    return <AppContext.Provider value={context}>{props.children}</AppContext.Provider>;
};

export default AppProvider;
