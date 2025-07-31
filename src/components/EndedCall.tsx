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






function EndedCall() {
    

    

    
    return (
        <div className="flex flex-col items-center justify-center h-full bg-radial from-sidebar-accent to-sidebar">
            <div className="py-4 px-8 flex-1 items-center justify-center">
                <div className="flex  flex-col items-center justify-center gap-y-6 bg-background rounded-lg p-10 shadow-sm">
                    <div className="flex flex-col gap-y-2 text-center">
                        <h6 className="text-lg font-medium"> You have ended the call</h6>
                        <p className="text-sm">summary will appear in a few minutes</p>
                    </div>
                   <Button>
                    <Link href="/">Goback</Link>
                   </Button>
                </div>
            </div>
        </div>
    )
}

export default EndedCall