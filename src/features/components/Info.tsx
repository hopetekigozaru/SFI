'use client'
import {
    Dispatch,
    MutableRefObject,
    SetStateAction,
    useEffect,
    useState,
} from 'react'
import { setTimeout } from 'timers'

interface InfoProps {
    setIndex: Dispatch<SetStateAction<number>>
    eventFlg: MutableRefObject<boolean>
}

const Info: React.FC<InfoProps> = ({ setIndex, eventFlg }) => {
    const [startY, setStartY] = useState(0)

    useEffect(() => {
        const content: HTMLElement | null =
            document.getElementById('mainSection')
        if (content) {
            const handleWheel = async (event: WheelEvent) => {
                if (eventFlg.current) return

                if (event.deltaY > 0) {
                    eventFlg.current = true

                    setTimeout(() => {
                        eventFlg.current = false
                    }, 1000)

                    eventFlg.current = false
                } else if (event.deltaY < 0) {
                    eventFlg.current = true

                    content.classList.remove('animate-fade-in')
                    content.classList.add('animate-fade-out')
                    console.log(0)
                    setTimeout(() => {
                        setIndex(1)
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
                            setIndex(1)
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
                window.removeEventListener('touchstart', handleTouchStart)
                window.removeEventListener('touchmove', handleTouchMove)
            }
        }
    }, [setIndex, eventFlg, startY])

    return (
        <section
            id="mainSection"
            className="size-full flex items-end animate-fade-in p-3 md:p-0"
        >
            aa
        </section>
    )
}

export default Info
