import { useEffect, useRef } from 'react';
import { RxCaretUp } from 'react-icons/rx';
import { useWindowPosition } from '../../../../hooks';

function ScrollTop() {
    const ref = useRef<HTMLDivElement>(null);
    const position = useWindowPosition();

    useEffect(() => {
        if (position > 100) {
            handleVisibleScroll();
        } else {
            handleHiddenScroll();
        }
    });

    const handleScrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    const handleVisibleScroll = () => {
        if (ref.current) {
            ref.current.style.transform = 'translateY(0)';
        }
    };

    const handleHiddenScroll = () => {
        if (ref.current) {
            ref.current.style.transform = 'translateY(52px)';
        }
    };

    return (
        <div
            ref={ref}
            style={{
                width: 36,
                height: 36,
                backgroundColor: '#fe2c55',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'fixed',
                right: 10,
                bottom: 16,
                zIndex: 999,
                borderRadius: 999,
                cursor: 'pointer',
                transition: 'transform 0.2s ease-in-out',
                transform: 'translateY(52px)',
            }}
            onClick={handleScrollToTop}
        >
            <span
                style={{
                    display: 'flex',
                }}
            >
                <RxCaretUp color="#fff" size="2.5rem" />
            </span>
        </div>
    );
}

export default ScrollTop;
