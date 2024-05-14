'use client'
import Header from '@/components/Header'
import About from '@/features/components/About'
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
        <div className="h-screen w-screen  z-10 relative">
            <div className="size-full absolute">
                <div className="top-0 flex items-center justify-center h-[15%] w-full">
                    <div className="w-[95%] h-[70%] flex justify-between">
                        <div className="h-full w-[10%] flex items-center">
                            <Image
                                src={Logo}
                                alt="ロゴ"
                                width={65}
                                height={65}
                            />
                        </div>
                        <div className="h-full w-[50%] flex items-center justify-end">
                            <Header />
                        </div>
                    </div>
                </div>
                <div className="h-[85%] w-full flex flex-col-reverse md:flex-row">
                    <div className="size-full  md:w-1/5 flex flex-col justify-end">
                        <div className="w-full h-[30%] md:h-1/2 flex items-end md:items-center justify-center">
                            <div className="size-fit md:rotate-90">
                                <p className="text-white font-nico tracking-[1rem] text-center text-xl">
                                    {sideText}
                                </p>
                            </div>
                        </div>
                        <div className="w-1/2 h-1/5 md:h-[30%] flex items-end">
                            <div className="border-r border-solid border-white size-full"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="size-full">{currentPage}</div>
            <div className="z-[-1] absolute top-0 size-full">
                <canvas ref={canvasRef} />
            </div>
        </div>
    )
}
