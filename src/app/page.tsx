import { Zen_Maru_Gothic } from 'next/font/google'
import Image from 'next/image'


export default function Home() {
  return (
    <div className='w-full h-full flex justify-end items-end'>
      <div className='w-[50%] h-[50%]'>
        <div className='w-[85%]'>
          <p className={`text-white text-6xl tracking-[0.5rem] leading-[5rem] font-zen-maru font-bold`}>
            人と人を技術<br />でつなぐ。
          </p>
          <p className='text-white font-nico text-end tracking-[0.5rem]'>
            apical-point
          </p>
        </div>
      </div>
    </div>
  )
}
