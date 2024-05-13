import { Dispatch, SetStateAction, useEffect } from 'react'

interface AboutProps {
    setIndex: Dispatch<SetStateAction<number>> // 正しい型指定に修正
}

const About: React.FC<AboutProps> = ({ setIndex }) => {
    useEffect(() => {
        const handleWheel = async (event: WheelEvent) => {
            if (event.deltaY > 0) {
                // 下方向にホイールした場合の処理
            } else if (event.deltaY < 0) {
                // 上方向にホイールした場合の処理
                setIndex(0)
                console.log('上方向にホイールしました')
            }
        }

        // イベントリスナーを追加
        window.addEventListener('wheel', handleWheel)

        return () => {
            window.removeEventListener('wheel', handleWheel)
        }
    }, [setIndex]) // setIndexを依存リストに追加

    return <div>aaaaaaaaaaaaaa</div>
}

export default About
