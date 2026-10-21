import React, { useEffect, useRef, useState } from 'react';

interface RevealProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    direction?: 'up' | 'none';
}

export default function Reveal({
    children,
    className = '',
    delay = 0,
    direction = 'up',
}: RevealProps) {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    if (ref.current) {
                        observer.unobserve(ref.current);
                    }
                }
            },
            {
                threshold: 0.08,
                rootMargin: '0px 0px -40px 0px',
            }
        );

        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, []);

    const transformClass =
        direction === 'up'
            ? isVisible
                ? 'translate-y-0 opacity-100 scale-100 blur-0'
                : 'translate-y-8 opacity-0 scale-[0.98] blur-[2px]'
            : isVisible
            ? 'opacity-100 blur-0'
            : 'opacity-0 blur-[2px]';

    return (
        <div
            ref={ref}
            style={{
                transitionDelay: `${delay}ms`,
                transitionDuration: '750ms',
                transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            className={`transition-all will-change-transform ${transformClass} ${className}`}
        >
            {children}
        </div>
    );
}

