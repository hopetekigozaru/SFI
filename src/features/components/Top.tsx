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
            className="w-full h-full flex justify-end md:items-end animate-fade-in"
        >
            <div className="w-full md:w-[50%] h-[50%]">
                <div className="w-full md:w-[85%]">
                    <p
                        className={`text-white text-4xl md:text-6xl text-center md:text-start tracking-[0.5rem] leading-[3.5rem] md:leading-[5rem] font-zen-maru font-bold`}
                    >
                        人と人を技術
                        <br />
                        でつなぐ。
                    </p>
                    <div className="w-full flex justify-center md:justify-end">
                        <p className="text-white font-nico tracking-[0.5rem] border-b border-solid border-white w-fit">
                            apical-point
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Top
