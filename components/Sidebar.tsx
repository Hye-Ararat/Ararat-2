"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar({ variant, branding, items }) { 
    const pathname = usePathname();
    console.log(pathname)
    return (
        <aside className="w-64" aria-label="Sidebar">
            <div className="overflow-y-auto py-4 px-3 bg-gray-50 rounded dark:bg-gray-800 h-full">
                <Link href={branding.url} className="flex items-center pl-2.5 mb-5">
                    <img src={branding.logo} className="mr-3 h-6 sm:h-7" alt={branding.name + " logo"} />
                    <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">{branding.name}</span>
                    <span className="bg-red-100 text-red-800 text-1xl font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-800 ml-2">PRO</span>
                </Link>
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