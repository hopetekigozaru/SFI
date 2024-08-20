'use client'
import Header from '@/components/Header'
import About from '@/features/components/About'
import Info from '@/features/components/Info'
import Top from '@/features/components/Top'
import useThree from '@/hooks/useThree'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import Logo from '../../public/images/logo/Frame 3 (1).png'

export default function Home() {
    const topEventFlg = useRef<boolean>(false)
    const aboutEventFlg = useRef<boolean>(false)
    const [pageIndex, setPageIndex] = useState<number>(0)
    const [sideText, setSideText] = useState<String>('TO　THE　POINT')
    const [currentIndex, setCurrentIndex] = useState<number>(0)
    const [currentPage, setCurrentPage] = useState<React.ReactElement>(
        <Top setIndex={setPageIndex} eventFlg={topEventFlg} />,
    )
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const { THREE, renderer, camera, scene, topNextAnime, aboutPrevAnime } =
        useThree(canvasRef)

    useEffect(() => {
        if (currentIndex < pageIndex) {
            if (pageIndex === 1) {
                console.log(121212)
                topNextAnime(() => {
                    setCurrentPage(
                        <About
                            setIndex={setPageIndex}
                            eventFlg={aboutEventFlg}
                        />,
                    )
                    setSideText('ABOUT')
                    setCurrentIndex(pageIndex) // ページ遷移後、currentIndexを更新
                    topEventFlg.current = false
                })
            }
        } else if (currentIndex > pageIndex) {
            if (pageIndex === 0) {
                aboutPrevAnime(() => {
                    setCurrentPage(
                        <Top setIndex={setPageIndex} eventFlg={topEventFlg} />,
                    )
                    setSideText('TO　THE　POINT')
                    setCurrentIndex(pageIndex) // ページ遷移後、currentIndexを更新
                    aboutEventFlg.current = false
                })
            }
        }
    }, [pageIndex, currentIndex, topNextAnime, aboutPrevAnime])

    return (
        <div className="relative z-10  h-screen w-screen">
            <div className="absolute size-full">
                <div className="top-0 flex h-[15%] w-full items-center justify-center">
                    <div className="flex h-[70%] w-[95%] justify-between">
                        <div className="flex h-full w-[10%] items-center">
                            <Image
                                src={Logo}
                                alt="ロゴ"
                                width={65}
                                height={65}
                            />
                        </div>
                        <div className="flex h-full w-[50%] items-center justify-end">
                            <Header />
                        </div>
                    </div>
                </div>
                <div className="flex h-[85%] w-full flex-col-reverse md:flex-row">
                    <div className="flex  size-full flex-col justify-end md:w-1/5">
                        <div className="flex h-[30%] w-full items-end justify-center md:h-1/2 md:items-center">
                            <div className="size-fit md:rotate-90">
                                <p className="text-center font-nico text-xl tracking-[1rem] text-white">
                                    {sideText}
                                </p>
                            </div>
                        </div>
                        <div className="flex h-1/5 w-1/2 items-end md:h-[30%]">
                            <div className="size-full border-r border-solid border-white"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="size-full">{currentPage}</div>
            <div className="absolute top-0 z-[-1] size-full">
                <canvas ref={canvasRef} />
            </div>
        </div>
    )
}
