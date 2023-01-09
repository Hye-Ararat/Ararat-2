import Link from "next/link";
import Table from "../../../components/Table";
import {HyeXD} from "../../../lib/hyexd"
import prisma from "../../../lib/prisma";

export default async function Home() {
    function instanceFormatter(name: string, id: string, nodeUrl: string) {
        return [
            <Link href={nodeUrl + `/instances/${id}`}>
            <div className="text-base font-semibold">{name}</div>,
            "Live Data Here?",
            <div className="flex items-center">
                <div className="h-2.5 w-2.5 rounded-full bg-green-400 mr-2"></div> Online
            </div>,
            <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit Instance</a>
            </Link>
        ]
    }
    let instances = await prisma.instance.findMany({
        include: {
            node: true
        }
    })

    let tableData : (string|JSX.Element)[][] = [];

    instances.forEach((instance) => {
        tableData.push(instanceFormatter(instance.name, instance.id, instance.node.url))
    })
    return (
        <>
            <h1 className="text-3xl dark:text-white font-serif mb-5">
                Instances
            </h1>
            <Table 
            columns={["Name", "Resource Usage", "Status", "Edit"]}
            rows={tableData} />
        </>
    )
}
