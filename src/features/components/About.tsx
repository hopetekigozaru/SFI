import { Dispatch, MutableRefObject, SetStateAction, useEffect, useState } from 'react'

interface AboutProps {
    setIndex: Dispatch<SetStateAction<number>>
    animationFlag: MutableRefObject<boolean>
}

const About: React.FC<AboutProps> = ({ setIndex, animationFlag }) => {
    const [startY, setStartY] = useState(0)
    
    useEffect(() => {
        const content: HTMLElement | null = document.getElementById('mainSection');
        
        if (content) {
            const handleWheel = async (event: WheelEvent) => {
                if (animationFlag.current) return;

                animationFlag.current = true;
                if (event.deltaY > 0) {
                    await new Promise<void>(resolve => {
                        content.classList.remove('animate-fade-in');
                        content.classList.add('animate-fade-out');
                        setTimeout(() => {
                            setIndex(2);
                            resolve();
                        }, 1000);
                    });
                } else if (event.deltaY < 0) {
                    await new Promise<void>(resolve => {
                        content.classList.remove('animate-fade-in');
                        content.classList.add('animate-fade-out');
                        setTimeout(() => {
                            setIndex(0);
                            resolve();
                        }, 1000);
                    });
                }
                animationFlag.current = false;
            };

            const handleTouchStart = (e: TouchEvent) => {
                if (animationFlag.current) return;
                setStartY(e.touches[0].clientY);
            };

            const handleTouchMove = async (e: TouchEvent) => {
                if (animationFlag.current) return;
                const endY = e.touches[0].clientY;
                const deltaY = endY - startY;

                if (Math.abs(deltaY) > 50) {
                    animationFlag.current = true;
                    if (deltaY < 0) {
                        await new Promise<void>(resolve => {
                            content.classList.remove('animate-fade-in');
                            content.classList.add('animate-fade-out');
                            setTimeout(() => {
                                setIndex(2);
                                resolve();
                            }, 1000);
                        });
                    } else {
                        await new Promise<void>(resolve => {
                            content.classList.remove('animate-fade-in');
                            content.classList.add('animate-fade-out');
                            setTimeout(() => {
                                setIndex(0);
                                resolve();
                            }, 1000);
                        });
                    }
                    animationFlag.current = false;
                }
            };

            window.addEventListener('touchstart', handleTouchStart);
            window.addEventListener('touchmove', handleTouchMove);
            window.addEventListener('wheel', handleWheel);

            return () => {
                window.removeEventListener('touchstart', handleTouchStart);
                window.removeEventListener('touchmove', handleTouchMove);
                window.removeEventListener('wheel', handleWheel);
            };
        }
    }, [setIndex, animationFlag]);

    return <div id="mainSection">About Content</div>;
};

export default About;