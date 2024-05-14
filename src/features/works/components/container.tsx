import { Item } from '@/features/works/components/Item'

//データ取得
const items = [
    {
        id: 1,
        title: '某劇団チケット販売管理システム開発',
        created_at: '2023/2',
    },
    {
        id: 2,
        title: '販売促進システム開発',
        created_at: '2023/2',
    },
    {
        id: 3,
        title: '某劇団チケット販売管理システム開発',
        created_at: '2023/2',
    },
    {
        id: 4,
        title: '某劇団チケット販売管理システム開発',
        created_at: '2023/2',
    },
]
export function Container() {
    return (
        <div className="flex flex-col items-center justify-center w-full space-y-4">
            {items.map((item, index) => (
                <Item key={item.id} index={index} {...item} />
            ))}
        </div>
    )
}
