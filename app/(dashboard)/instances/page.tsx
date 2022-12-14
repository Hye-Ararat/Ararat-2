import Table from "../../components/Table";

export default function Home() {
    function instanceFormatter(name) {
        return [
            <div className="text-base font-semibold">{name}</div>,
            "Live Data Here?",
            <div className="flex items-center">
                <div className="h-2.5 w-2.5 rounded-full bg-green-400 mr-2"></div> Online
            </div>,
            <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit Instance</a>

        ]
    }
    return (
        <>
            <h1 className="text-3xl dark:text-white font-serif mb-5">
                Instances
            </h1>
            <Table 
            columns={["Name", "Resource Usage", "Status", "Edit"]}
            rows={[instanceFormatter("Express Server"), instanceFormatter("Web Server"), instanceFormatter("Development")]} />
        </>
    )
}
