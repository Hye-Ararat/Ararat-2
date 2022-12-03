"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar({ variant, items }) { 
    const pathname = usePathname();
    console.log(pathname)
    return (
        <aside className="w-64" aria-label="Sidebar">
            <div className="overflow-y-auto py-4 px-3 bg-gray-50 dark:bg-dark2 h-full">
           
                <ul className="space-y-2">
                    {items.map((item) => {
                        return (
                            <li key={item.name}>
                                <Link href={item.url} className={"flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white " + (pathname == item.url ? "dark:bg-gray-600 bg-gray-300" : "dark:hover:bg-gray-700 hover:bg-gray-100")}>
                                    {item.icon}
                                    <span className="ml-3">{item.name}</span>
                                    
                                </Link>
                                
                            </li>
                        )
                    })}
                </ul>
            </div>
        </aside>
    )
}