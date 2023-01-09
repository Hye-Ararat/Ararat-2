import Spinner from "../../components/Spinner";

export default function Loading() {
    return(
        <>
       <div role="status" className="max-w-sm animate-pulse">
       <div className="h-6 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
    <span className="sr-only">Loading...</span>
</div>
<div className="text-center">
        <Spinner size={10} />
</div>
        </>
    )
}