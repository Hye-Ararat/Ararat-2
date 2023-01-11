export default function List({items, variant, fontColor, fontColorDark} : {items: string[], variant?: string, fontColor?: string, fontColorDark?: string}) {
    return (
<ul className={`max-w-md space-y-1 text-${fontColor? fontColor : "gray-500"} list-disc list-inside dark:text-${fontColorDark ? fontColorDark : "gray-400"}`}>
            {items.map((item) => {
                return (
                    <li>
                        {item}  
                    </li>
                )
            })}
        </ul>
    )
}