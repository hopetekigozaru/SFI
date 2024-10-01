'use client'
import { Dispatch, MutableRefObject, SetStateAction, useEffect, useState } from 'react'

interface InfoProps {
    setIndex: Dispatch<SetStateAction<number>>
    animationFlag: MutableRefObject<boolean>
}

const Info: React.FC<InfoProps> = ({ setIndex, animationFlag }) => {
    const [startY, setStartY] = useState(0)

    useEffect(() => {
        const content: HTMLElement | null = document.getElementById('mainSection')
        if (content) {
            const handleWheel = async (event: WheelEvent) => {
                if (animationFlag.current) return

                if (event.deltaY < 0) {
                    animationFlag.current = true
                    await new Promise<void>(resolve => {
                        content.classList.remove('animate-fade-in')
                        content.classList.add('animate-fade-out')
                        setTimeout(() => {
                            setIndex(1)
                            resolve()
                        }, 1000)
                    })
                    animationFlag.current = false
                }
            }

            const handleTouchStart = (e: TouchEvent) => {
                if (animationFlag.current) return
                setStartY(e.touches[0].clientY)
            }

            const handleTouchMove = async (e: TouchEvent) => {
                if (animationFlag.current) return
                const endY = e.touches[0].clientY
                const deltaY = endY - startY

                if (Math.abs(deltaY) > 50 && deltaY > 0) {
                    animationFlag.current = true
                    await new Promise<void>(resolve => {
                        content.classList.remove('animate-fade-in')
                        content.classList.add('animate-fade-out')
                        setTimeout(() => {
                            setIndex(1)
                            resolve()
                        }, 1000)
                    })
                    animationFlag.current = false
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
    }, [setIndex, animationFlag, startY])

    return (
        <section
            id="mainSection"
            className="size-full flex items-end animate-fade-in p-3 md:p-0"
        >
            Info Content
        </section>
    )
}

export default Info