import { Loader2Icon } from "lucide-react"

interface props {

    title: string;
    description?: string;
}

function Loading({
    title,
    description
}: props) {
    return (
        <div className="py-4 px-8 flex flex-1 items-center justify-center ">
            <div className="flex flex-col items-center justify-center gap-y-6 bg-background ronded-lg p-10 shadow-sm">
                <Loader2Icon className=" size-6 animate-spin text-primary" />
                <div className="flex flex-col text-center gap-y-2">
                    <h6 className="text-lg font-medium">{title}</h6>
                    <p className="text-sm">{description}</p>
                </div>
            </div>
        </div>
    )
}

export default Loading