import { Dispatch, SetStateAction, useEffect } from 'react'

interface AboutProps {
    setIndex: Dispatch<SetStateAction<number>> // 正しい型指定に修正
}

const About: React.FC<AboutProps> = ({ setIndex }) => {
    useEffect(() => {
        const content: HTMLElement | null =
            document.getElementById('mainSection')
        if (content) {
            const handleWheel = async (event: WheelEvent) => {
                if (eventFlg.current) return

                if (event.deltaY > 0) {
                    eventFlg.current = true
                    content.classList.remove('animate-fade-in')
                    content.classList.add('animate-fade-out')
                    setTimeout(() => {
                        setIndex(2)
                        eventFlg.current = false
                    }, 1000)

                    eventFlg.current = false
                } else if (event.deltaY < 0) {
                    eventFlg.current = true

                    content.classList.remove('animate-fade-in')
                    content.classList.add('animate-fade-out')
                    setTimeout(() => {
                        setIndex(0)
                        eventFlg.current = false
                    }, 1000)
                }
            }

            const handleTouchStart = (e: TouchEvent) => {
                setStartY(e.touches[0].clientY)
            }

            const handleTouchMove = (e: TouchEvent) => {
                const endY = e.touches[0].clientY
                const deltaY = endY - startY

                if (Math.abs(deltaY) > 50) {
                    if (eventFlg.current) return

                    if (deltaY < 0) {
                        eventFlg.current = true
                        eventFlg.current = false
                    } else {
                        eventFlg.current = true
                        content.classList.remove('animate-fade-in')
                        content.classList.add('animate-fade-out')
                        setTimeout(() => {
                            setIndex(0)
                            eventFlg.current = false
                        }, 1000)
                    }
                }
            }

            window.addEventListener('touchstart', handleTouchStart)
            window.addEventListener('touchmove', handleTouchMove)
            window.addEventListener('wheel', handleWheel)

            return () => {
                window.removeEventListener('wheel', handleWheel)
            }
        }, [setIndex]) // setIndexを依存リストに追加

    return <div>aaaaaaaaaaaaaa</div>
}

export default About
