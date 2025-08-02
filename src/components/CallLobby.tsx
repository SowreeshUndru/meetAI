import { LogInIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import {
    DefaultVideoPlaceholder,

    StreamVideoParticipant,

    ToggleAudioPreviewButton,

    ToggleVideoPreviewButton,

    useCallStateHooks,

    VideoPreview,

} from "@stream-io/video-react-sdk";
import { useState } from "react";
import Link from "next/link";
import { generateAvatarUri } from "@/lib/avatar";
import { Button } from "./ui/button";

 
import "@stream-io/video-react-sdk/dist/css/styles.css"

interface props {
    onJoin: () => void;
}
const DisabledVideoPreview = () => {
    const session = useSession();
    return (<DefaultVideoPlaceholder participant={
        {
            name: session.data?.user.email ?? "",
            image: session.data?.user.image ?? generateAvatarUri({ seed: session.data?.user.email ?? "", variant: "intials" })

        } as StreamVideoParticipant
    } />)
}

const allowBrowserPermissions = () => {

    return (
        <p className="text-sm">please grant permission</p>

    );
}


function CallLobby({ onJoin }: props) {
    const [joining, setJoining] = useState(false);

    const handleClick = async () => {
        if (joining) return;
        setJoining(true);
        try {
            await onJoin(); // call parent function only once
        } catch (err) {
            console.error("Join failed", err);
            setJoining(false); // allow retry
        }
    };

    const { useCameraState, useMicrophoneState } = useCallStateHooks();
    const { hasBrowserPermission: hasMicPermission } = useMicrophoneState();
    const { hasBrowserPermission: hasCameraPermission } = useCameraState();
    const hasBrowserMediaPermisson = hasCameraPermission && hasMicPermission;

    return (
        <div className="flex flex-col items-center justify-center h-full bg-radial from-sidebar-accent to-sidebar">
            <div className="py-4 px-8 flex-1 items-center justify-center">
                <div className="flex  flex-col items-center justify-center gap-y-6 bg-background rounded-lg p-10 shadow-sm">
                    <div className="flex flex-col gap-y-2 text-center">
                        <h6 className="text-lg font-medium"> Ready to join?</h6>
                        <p className="text-sm">set up your call before joining</p>
                    </div>
                    <VideoPreview
                        DisabledVideoPreview={hasBrowserMediaPermisson ? DisabledVideoPreview : allowBrowserPermissions}
                    />
                    <div className="flex gap-x-2">
                        < ToggleAudioPreviewButton />
                        <ToggleVideoPreviewButton />
                    </div>
                    <div className="flex gap-x-2 justify-between w-full">
                        <Button asChild variant="ghost">
                            <Link href="/agents">
                                Cancel
                            </Link>
                        </Button>
                        <Button onClick={handleClick} disabled={joining}>
                            {joining ? "Joining..." : "Join Call"}
                        </Button>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default CallLobby