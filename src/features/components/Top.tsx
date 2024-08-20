import { Dispatch, SetStateAction, useEffect } from 'react'

interface TopProps {
    setIndex: Dispatch<SetStateAction<number>> // 正しい型指定に修正
}

const Top: React.FC<TopProps> = ({ setIndex }) => {
    useEffect(() => {
        const content: HTMLElement | null =
            document.getElementById('mainSection')
        if (content) {
            const handleWheel = async (event: WheelEvent) => {
                if (event.deltaY > 0) {
                    // 下方向にホイールした場合の処理
                    content.classList.remove('animate-fade-in')
                    content.classList.add('animate-fade-out')

                    // 1秒待機してからログを出力する
                    setTimeout(() => {
                        setIndex(1)
                    }, 1000)
                } else if (event.deltaY < 0) {
                    // 上方向にホイールした場合の処理
                    console.log('上方向にホイールしました')
                }
            }

            // イベントリスナーを追加
            window.addEventListener('wheel', handleWheel)

            return () => {
                window.removeEventListener('wheel', handleWheel)
            }
        }
    }, [])

    return (
        <section
            id="mainSection"
            className="flex size-full animate-fade-in justify-end md:items-end"
        >
            <div className="h-2/5 w-full md:w-2/5">
                <div className="size-full">
                    <div className="flex size-full flex-col items-center justify-center md:block">
                        <p className="text-center font-zen-maru text-4xl font-bold leading-[3.5rem] tracking-[0.5rem] text-white md:text-start md:text-[250%] md:leading-[5rem]">
                            私たちはフィジーへ
                            <br />
                            行きたい。
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
