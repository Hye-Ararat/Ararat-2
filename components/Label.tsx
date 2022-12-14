export default function Label({value, htmlFor}) {
    return (
        <label for={htmlFor} class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{value}</label>
    )
}