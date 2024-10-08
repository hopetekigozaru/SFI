import { Dispatch, MutableRefObject, SetStateAction, useEffect, useCallback } from 'react'

interface TopProps {
    setIndex: Dispatch<SetStateAction<number>>
    animationFlag: MutableRefObject<boolean>
}

const Top: React.FC<TopProps> = ({ setIndex, animationFlag }) => {
    const handlePageTransition = useCallback(() => {
        const content = document.getElementById('mainSection')
        if (content) {
            content.classList.remove('animate-fade-in')
            content.classList.add('animate-fade-out')

            return new Promise<void>((resolve) => {
                setTimeout(() => {
                    setIndex(1)
                    resolve()
                }, 1000)
            })
        }
        return Promise.resolve()
    }, [setIndex])

    useEffect(() => {
        const content = document.getElementById('mainSection')
        if (content) {
            const handleWheel = async (event: WheelEvent) => {
                if (animationFlag.current) return
                
                if (event.deltaY > 0) {
                    animationFlag.current = true
                    await handlePageTransition()
                    animationFlag.current = false
                } else if (event.deltaY < 0) {
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

            window.addEventListener('wheel', handleWheel)

            return () => {
                window.removeEventListener('wheel', handleWheel)
                window.removeEventListener('touchstart', handleTouchStart)
                window.removeEventListener('touchmove', handleTouchMove)
            }
        }
    }, [animationFlag, handlePageTransition])

    return (
        <section
            id="mainSection"
            className="flex size-full animate-fade-in justify-end md:items-end"
        >
            <div className="h-2/5 w-full md:w-2/5">
                <div className="size-full">
                    <div className="flex size-full flex-col items-center justify-center md:block">
                        <p className="text-center font-zen-maru text-4xl font-bold leading-[3.5rem] tracking-[0.5rem] text-white md:text-start md:text-[250%] md:leading-[5rem]">
                            創造性を解き放つ。
                        </p>
                        <div className="flex w-full justify-center md:justify-start">
                            <p className="w-fit border-b border-solid border-white font-nico tracking-[0.5rem] text-white">
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