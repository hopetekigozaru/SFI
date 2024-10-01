import { M_PLUS_Rounded_1c } from 'next/font/google'
const mPlusRounded1c = M_PLUS_Rounded_1c({
    subsets: ['latin'],
    weight: ['400'],
})
export default function Header() {
    return (
        <div className={mPlusRounded1c.className}>
            <div id="pc" className="hidden md:block fixed top-0 right-0 ">
                <div className="py-6 px-7 min-w-96 rounded-full mt-5 mr-5 shadow-md	bg-white text-black">
                    <ul className="flex justify-center w-full font-bold">
                        <li className="text-base pr-4">
                            <a
                                href="#"
                                className="hover:border-b-2 border-black pb-1"
                            >
                                HOME
                            </a>
                        </li>
                        <li className="text-base pr-4">
                            <a
                                href="# "
                                className="hover:border-b-2 border-black pb-1"
                            >
                                POLICY
                            </a>
                        </li>
                        <li className="text-base pr-4">
                            <a
                                href="#"
                                className="hover:border-b-2 border-black pb-1"
                            >
                                WORKS
                            </a>
                        </li>
                        <li className="text-base pr-4">
                            <a
                                href="#"
                                className="hover:border-b-2 border-black pb-1"
                            >
                                RECRUIT
                            </a>
                        </li>
                        <li className="text-base pr-4">
                            <a
                                href="#"
                                className="hover:border-b-2 border-black pb-1"
                            >
                                CONTACT
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="hover:border-b-2 border-black pb-1"
                            >
                                BLOG
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <div id="sp" className="md:hidden w-screen">
                <input
                    type="checkbox"
                    id="overlay-input"
                    className="hidden peer"
                />
                <label
                    htmlFor="overlay-input"
                    id="overlay-button"
                    className="pt-6 py-2 z-50 cursor-pointer absolute right-2.5 top-5 select-none
                    peer-checked:visible "
                >
                    <span
                        className="h-1 w-9 rounded-sm bg-white relative block transition-all
                    before:top-[-10px] before:visible before:h-1 before:w-9 before:rounded-sm before:bg-white before:absolute before:content-[''] before:transition-all
                    after:top-2.5 after:h-1 after:w-9 after:rounded-sm after:bg-white after:absolute after:content-[''] after:transition-all"
                    ></span>
                </label>
                <div
                    id="overlay"
                    className="bg-[#21354C] h-screen w-screen invisible fixed z-40 top-0 left-0 peer-checked:visible"
                >
                    <ul className="pt-16 z-10 flex flex-col pl-9 h-screen list-none text-white font-nico">
                        <li className="text-lg py-2.5">
                            <a href="#" className="hover:border-b-4 pb-2">
                                TOP
                            </a>
                        </li>
                        <li className="text-lg py-2.5">
                            <a href="#" className="hover:border-b-4 pb-2">
                                ABOUT
                            </a>
                        </li>
                        <li className="text-lg py-2.5">
                            <a href="#" className="hover:border-b-4 pb-2">
                                SERVICE
                            </a>
                        </li>
                        <li className="text-lg py-2.5">
                            <a href="#" className="hover:border-b-4 pb-2">
                                LANGUAGE & LIBRARY
                            </a>
                        </li>
                        <li className="text-lg py-2.5">
                            <a href="#" className="hover:border-b-4 pb-2">
                                MAP
                            </a>
                        </li>
                        <li className="text-lg py-2.5">
                            <a href="#" className="hover:border-b-4 pb-2">
                                CONTACT
                            </a>
                        </li>
                        <li className="text-lg py-2.5 pt-4">
                            <a href="#" className="hover:border-b-4 pb-2">
                                WORKS
                            </a>
                        </li>
                        <li className="text-lg py-2.5">
                            <a href="#" className="hover:border-b-4 pb-2">
                                BLOG
                            </a>
                        </li>
                        <li className="text-lg py-2.5">
                            <a href="#" className="hover:border-b-4 pb-2">
                                NEWS
                            </a>
                        </li>
                        <li className="text-lg pt-4">
                            <a href="#" className="hover:border-b-4 pb-2">
                                SECURITY POLICY
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
