'use client'
import About from '@/features/components/About'
import Top from '@/features/components/Top'
import useThree from '@/hooks/useThree'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import Logo from '../../public/images/logo/Frame 3 (1).png'

export default function Home() {
    const [pageIndex, setPageIndex] = useState<number>(0)
    const [currentIndex, setCurretIndex] = useState<number>(0)
    const [currentPage, setCurrentPage] = useState(
        <Top setIndex={setPageIndex} />,
    )

    const canvasRef = useRef<HTMLCanvasElement>(null)
    const { THREE, renderer, camera, scene, topNextAnime, aboutPrevAnime } =
        useThree(canvasRef)

    const nextPage = async () => {
        if (camera) {
            if (pageIndex === 0) {
                // 何もしない
            } else if (pageIndex === 1) {
                topNextAnime()
                setTimeout(() => {
                    setCurrentPage(<About setIndex={setPageIndex} />)
                    setCurretIndex(pageIndex)
                }, 3000)
            }
        }
    }

    const prevPage = async () => {
        if (camera) {
            if (pageIndex === 0) {
                aboutPrevAnime()
                setTimeout(() => {
                    setCurrentPage(<Top setIndex={setPageIndex} />)
                    setCurretIndex(pageIndex)
                }, 3000)
            } else if (pageIndex === 1) {
            }
        }
    }
    useEffect(() => {
        if (currentIndex < pageIndex) {
            nextPage()
        } else if (currentIndex > pageIndex) {
            prevPage()
        }
    }, [pageIndex, camera])

    return (
        <div className="h-[100vh] w-full bg-[#21354C] relative z-[10]">
            <div className="absolute w-full h-full">
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
                        <div className="bg-gray-400 h-full w-[50%] flex items-center justify-end">
                            ここにヘッダー
                        </div>
                    </div>
                </div>
                <div className="h-[85%] w-full flex flex-col-reverse md:flex-row">
                    <div className="h-full w-full  md:w-[20%] flex flex-col justify-end">
                        <div className="w-full h-[30%] md:h-[50%] flex items-end md:items-center justify-center">
                            <div className="w-fit h-fit md:rotate-90">
                                <p className="text-white font-nico tracking-[1rem] text-center text-xl">
                                    TO THE <br /> POINT
                                </p>
                            </div>
                        </div>
                        <div className="w-[50%] h-[30%] md:h-[50%] flex items-end">
                            <div className="border-r border-solid border-white w-full h-full"></div>
                        </div>
                    </div>
                    <div className="md:h-full w-full md:w-[80%]">
                        {currentPage}
                    </div>
                </div>
            </div>
            <div className="z-[0]">
                <canvas ref={canvasRef} />
            </div>
        </div>
    )
}
