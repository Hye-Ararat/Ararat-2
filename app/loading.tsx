import Spinner from "../components/Spinner";

export default function Loading() {
    return(
        <>
        <div className="text-center mt-16">
            <Spinner size={10} />
            <h6 className="text-1xl dark:text-white font-serif mb-5 mt-2">
                Hye Ararat
            </h6>        </div>
        </>
    )
}