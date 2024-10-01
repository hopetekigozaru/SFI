'use client'
import Header from '@/components/Header'
import About from '@/features/components/About'
import Info from '@/features/components/Info'
import Top from '@/features/components/Top'
import useThree from '@/hooks/useThree'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import Logo from '../../public/images/logo/SFI-logo.png'

export default function Home() {
    const topEventFlg = useRef<boolean>(false)
    const aboutEventFlg = useRef<boolean>(false)
    const [pageIndex, setPageIndex] = useState<number>(0)
    const [sideText, setSideText] = useState<String>('WELCOME')
    const [currentIndex, setCurrentIndex] = useState<number>(0)
    const animationFlag = useRef(false)
    const [currentPage, setCurrentPage] = useState<React.ReactElement>(
        <Top setIndex={setPageIndex} animationFlag={animationFlag} />,
    )
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const {
        moveCameraZ,
        lineAddOpacity,
        lineRemoveOpacity,
        lines,
    } = useThree(canvasRef)

    useEffect(() => {
        const handlePageTransition = async () => {
            if (animationFlag.current) return;
            animationFlag.current = true;

            if (currentIndex < pageIndex) {
                if (pageIndex === 1) {
                    await moveCameraZ(25, 20, 15, 0.02)
                    setCurrentPage(
                        <About
                            setIndex={setPageIndex}
                            animationFlag={animationFlag}
                        />,
                    )
                    setSideText('ABOUT')
                } else if (pageIndex === 2) {
                    await moveCameraZ(1500, 80, 900, 0.01)
                    setCurrentPage(
                        <Info
                            setIndex={setPageIndex}
                            animationFlag={animationFlag}
                        />,
                    )
                    await lineAddOpacity(lines)
                    setSideText('Info')
                }
            } else if (currentIndex > pageIndex) {
                if (pageIndex === 0) {
                    await moveCameraZ(80, 50, 50, 0.01)
                    setCurrentPage(
                        <Top setIndex={setPageIndex} animationFlag={animationFlag} />,
                    )
                    setSideText('WELCOME')
                } else if (pageIndex === 1) {
                    await lineRemoveOpacity(lines)
                    await moveCameraZ(25, 20, 15, 0.01)
                    setCurrentPage(
                        <About
                            setIndex={setPageIndex}
                            animationFlag={animationFlag}
                        />,
                    )
                    setSideText('ABOUT')
                }
            }

            setCurrentIndex(pageIndex)
            animationFlag.current = false;
        }

        handlePageTransition()
    }, [pageIndex, currentIndex, moveCameraZ, lineAddOpacity, lineRemoveOpacity, lines])

    return (
        <div className="relative z-10  h-screen w-screen">
            <div className="absolute size-full">
                <div className="top-0 flex h-[15%] w-full items-center justify-center">
                    <div className="flex h-[70%] w-[95%] justify-between">
                        <div className="flex h-full w-[10%] items-center">
                            <Image
                                src={Logo}
                                alt="ロゴ"
                                width={200}
                                height={200}
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
