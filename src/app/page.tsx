'use client'
import About from '@/features/components/About'
import Info from '@/features/components/Info'
import Top from '@/features/components/Top'
import useThree from '@/hooks/useThree'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import Logo from '../../public/images/logo/Frame 3 (1).png'

export default function Home() {
    const [pageIndex, setPageIndex] = useState<number>(0)
    const [sideText, setSideText] = useState<String>('GO　TO　FIJI')
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
                moveCameraZ(25, 20, 15, 0.02, () => {
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
            if (pageIndex === 2) {
                console.log(pageIndex)
                moveCameraZ(80, 80, 900, 0.01, () => {
                    setCurrentPage(
                        <Info
                            setIndex={setPageIndex}
                            eventFlg={aboutEventFlg}
                        />,
                    )
                    lineAddOpacity(lines)
                    setSideText('Infor　Mation')
                    setCurrentIndex(pageIndex) // ページ遷移後、currentIndexを更新
                    topEventFlg.current = false
                })
            }
        } else if (currentIndex > pageIndex) {
            if (pageIndex === 0) {
                moveCameraZ(80, 50, 50, 0.01, () => {
                    setCurrentPage(
                        <Top setIndex={setPageIndex} eventFlg={topEventFlg} />,
                    )
                    setSideText('GO　TO　FIJI')
                    setCurrentIndex(pageIndex) // ページ遷移後、currentIndexを更新
                    aboutEventFlg.current = false
                })
            } else if (pageIndex === 1) {
                lineRemoveOpacity(lines)
                setTimeout(() => {
                    moveCameraZ(25, 20, 15, 0.01, () => {
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
                }, 500)
            }
        }
    }, [pageIndex, currentIndex, moveCameraZ])

    return (
        <div className="relative z-10 h-screen w-full bg-primary">
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
                        {/* <div className="h-full w-[50%] flex items-center justify-end">
                            <Header />
                        </div> */}
                    </div>
                </div>
                <div className="flex h-[85%] w-full flex-col-reverse md:flex-row">
                    <div className="flex size-full  flex-col justify-end md:w-1/5">
                        <div className="flex h-[30%] w-full items-end justify-center md:h-[50%] md:items-center">
                            <div className="size-fit md:rotate-90">
                                <p className="text-center font-nico text-xl tracking-[1rem] text-white">
                                    TO THE <br /> POINT
                                </p>
                            </div>
                        </div>
                        <div className="flex h-[30%] w-[50%] items-end md:h-[50%]">
                            <div className="size-full border-r border-solid border-white"></div>
                        </div>
                    </div>
                    <div className="w-full md:h-full md:w-4/5">
                        {currentPage}
                    </div>
                </div>
            </div>
            <div className="z-0">
                <canvas ref={canvasRef} />
            </div>
        </div>
    )
}
