'use client'
import {
    Dispatch,
    MutableRefObject,
    SetStateAction,
    useEffect,
    useState,
} from 'react'

interface TopProps {
    setIndex: Dispatch<SetStateAction<number>>
    eventFlg: MutableRefObject<boolean>
}

const Top: React.FC<TopProps> = ({ setIndex, eventFlg }) => {
    const [startY, setStartY] = useState(0)

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
                        setIndex(1)
                    }, 1000)
                } else if (event.deltaY < 0) {
                    eventFlg.current = true
                    console.log('上方向にホイールしました')
                    setTimeout(() => {
                        eventFlg.current = false
                    }, 1000)
                }
            }

            const handleTouchStart = (e: TouchEvent) => {
                setStartY(e.touches[0].clientY)
            }

            const handleTouchMove = (e: TouchEvent) => {
                if (eventFlg.current) return
                const endY = e.touches[0].clientY
                const deltaY = endY - startY

                if (Math.abs(deltaY) > 50) {
                    // スワイプ距離が50px以上であるか確認
                    if (deltaY < 0) {
                        eventFlg.current = true
                        content.classList.remove('animate-fade-in')
                        content.classList.add('animate-fade-out')
                        setTimeout(() => {
                            setIndex(1)
                        }, 1000)
                    } else {
                        eventFlg.current = true

                        setTimeout(() => {
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
            className="size-full flex justify-end md:items-end animate-fade-in"
        >
            <div className="w-full md:w-2/5 h-2/5">
                <div className="size-full">
                    <div className="flex size-full md:block items-center justify-center flex-col">
                        <p className="text-white text-4xl md:text-[360%] text-center md:text-start tracking-[0.5rem] leading-[3.5rem] md:leading-[5rem] font-zen-maru font-bold">
                            人と人を技術
                            <br />
                            でつなぐ。
                        </p>
                        <div className="w-full flex justify-center md:justify-start">
                            <p className="text-white font-nico tracking-[0.5rem] border-b border-solid border-white w-fit">
                                apical-point
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Top
