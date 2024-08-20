'use client'
import {
    Dispatch,
    MutableRefObject,
    SetStateAction,
    useEffect,
    useState,
} from 'react'
import { setTimeout } from 'timers'

interface AboutProps {
    setIndex: Dispatch<SetStateAction<number>>
    eventFlg: MutableRefObject<boolean>
}

const About: React.FC<AboutProps> = ({ setIndex, eventFlg }) => {
    const [startY, setStartY] = useState(0)

    useEffect(() => {
        const content: HTMLElement | null =
            document.getElementById('mainSection')
        if (content) {
            const handleWheel = async (event: WheelEvent) => {
                if (eventFlg.current) return

                if (event.deltaY > 0) {
                    eventFlg.current = true
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
                window.removeEventListener('touchstart', handleTouchStart)
                window.removeEventListener('touchmove', handleTouchMove)
            }
        }
    }, [setIndex, eventFlg, startY])

    return (
        <section
            id="mainSection"
            className="flex size-full animate-fade-in items-end p-3 md:p-0"
        >
            <div className="h-4/5 w-full">
                <div className="flex h-[10%] w-full items-center md:justify-center">
                    <p className="font-zen-maru text-xl font-bold md:text-4xl">
                        人と人を技術でつなぐ
                    </p>
                </div>
                <div className="flex h-[35%] w-full flex-col justify-center md:items-center">
                    <div className="w-fit">
                        <div className="h-[50%]">
                            <p className="font-zen-maru text-lg font-bold">
                                「ITとどう向き合っていくか？」をお客様と一緒にトコトン考えます。
                            </p>
                        </div>
                        <p className="font-zen-maru text-sm font-bold">
                            技術への知見がない方へも、わかりやすい言葉で説明させていただきます。
                        </p>
                        <p className="font-zen-maru text-sm font-bold">
                            お客様のご要望をどのようにシステムで実現するか一緒にトコトン考えていきましょう。
                        </p>
                    </div>
                </div>
                <div className="flex h-[30%] w-full flex-col justify-center md:items-center">
                    <div className="h-[30%]">
                        <p className="font-zen-maru text-lg font-bold">
                            「お客様の成長」を長期的にサポート。
                        </p>
                    </div>
                    <p className="font-zen-maru text-sm font-bold">
                        導入後には社内SEの育成などを通じて保守・運用を内製化できるよう支援させていただきます。
                    </p>
                    <p className="font-zen-maru text-sm font-bold">
                        お客様に寄り添い他社では実現できないシステム開発や課題解決案などご提案させていただきます。
                    </p>
                </div>
            </div>
        </section>
    )
}

export default About
