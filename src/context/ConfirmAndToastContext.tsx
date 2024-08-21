import { MutableRefObject, ReactNode, createContext, useContext, useRef } from 'react';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';

type TProps = {
    children: ReactNode;
};

type _T_Context = {
    toast?: MutableRefObject<Toast | null>;
};

const ContextPrime = createContext<_T_Context | null>(null);
const useConfirmToast = () => useContext(ContextPrime);

function ConfirmAndToastContext(props: TProps) {
    const toast = useRef<Toast | null>(null);

    return (
        <ContextPrime.Provider value={{ toast: toast }}>
            <>
                <Toast
                    baseZIndex={9999999999999}
                    style={{
                        fontSize: '16px',
                    }}
                    ref={toast}
                />
                <ConfirmDialog />
                {props.children}
            </>
        </ContextPrime.Provider>
    );
}

export default ConfirmAndToastContext;
export { useConfirmToast };
