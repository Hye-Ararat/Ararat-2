export default function Button({variant, children, color, className}) {
    return (
        <>
        {variant == "default" || !variant ? 
        color == "default" || !color  ?
        <button type="button" className={"text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" + " " + className}>{children}</button>
        : ""
        : ""}
        {variant == "pill" ? 
        color == "default" || !color ?
        <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{children}</button>
        : ""
    : ""}
        </>
    )
}