export default function Label({value} : {value: string}) {
    return (
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{value}</label>
    )
}