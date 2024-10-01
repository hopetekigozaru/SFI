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
                }
            }

            window.addEventListener('wheel', handleWheel)

            return () => {
                window.removeEventListener('wheel', handleWheel)
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
                                SFI-aggregation
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Top