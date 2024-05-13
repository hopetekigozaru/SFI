import { Container } from '@/features/works/components/container'

export default function Works() {
    return (
        <section className="flex flex-col w-full h-[100vh] justify-center items-center">
            <Container />
            <div className="flex items-end justify-end text-white w-full animate-text-focus-in p-6">
                本サイト掲載以外にも、多数実績ございます。
                お気軽にお問い合わせください。
            </div>
        </section>
    )
}
