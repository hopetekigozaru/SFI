'use client'
import styles from '@/features/works/styles/styles.module.css'
import { useEffect, useState } from 'react'

interface Props {
    id: number
    index: number
    title: string
    created_at: string
}

export function Item({ id, title, created_at, index }: Props) {
    const [triggerAnimation, setTriggerAnimation] = useState(false)
    const [showText, setShowText] = useState(false)

    //実行に0.2秒かかるアニメーションを0.2秒間隔で上から実行
    useEffect(() => {
        const timer = setTimeout(() => {
            setTriggerAnimation(true)
        }, index * 200)
        return () => clearTimeout(timer)
    }, [])

    //アニメーションが開始してから0.2秒後（アニメーション完了後）にテキストを表示
    useEffect(() => {
        if (triggerAnimation) {
            const timer = setTimeout(() => {
                setShowText(true)
            }, 200)
            return () => clearTimeout(timer)
        }
    }, [triggerAnimation])

    return (
        <section className="flex justify-center items-center w-3/5">
            <div
                className={`${styles.gray} h-[100px] w-[50px] rounded-l-full`}
            ></div>
            <div
                className={`flex items-center ${styles.gray} h-[100px] w-[0px] ${triggerAnimation ? 'animate-expandCircle' : ''}`}
            >
                {showText && (
                    <div className="animate-text-focus-in">
                        <p>{title}</p>
                        <p>{created_at}</p>
                    </div>
                )}
            </div>
            <div
                className={`${styles.gray} h-[100px] w-[50px] rounded-r-full`}
            ></div>
        </section>
    )
}
