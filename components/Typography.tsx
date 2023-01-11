export default function Typography({children, size, variant, fontWeight, fontColor, fontColorDark, className} : {children: any, size?: string, variant?: string, fontWeight?: string, fontColor?: string, fontColorDark?: string, className?: string}) {
    return (<>
        {variant == "h1" ? <h1 className="text-5xl font-extrabold dark:text-white">{children}</h1> : ""}
        {variant == "h2" ? <h2 className="text-4xl font-bold dark:text-white">{children}</h2>  : "" }
        {variant == "h3" ? <h3 className="text-3xl font-bold dark:text-white">{children}</h3>: ""}
        {variant == "h4" ? <h4 className="text-2xl font-bold dark:text-white">{children}</h4> : ""}
        {variant == "h5" ? <h5 className="text-xl font-bold dark:text-white">{children}</h5> : ""}
        {variant == "h6" ? <h6 className="text-lg font-bold dark:text-white">{children}</h6> : ""}
        {!variant ? <p className={`font-${fontWeight ? fontWeight: "light"} text-${fontColor ? fontColor : "gray-500"} dark:text-${fontColorDark ? fontColorDark : "gray-400"} ${className}`}>{children}</p> : ""}
        </>
    )
}