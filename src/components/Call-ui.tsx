"use client";

import { StreamTheme, useCall, ParticipantView, useCallStateHooks } from "@stream-io/video-react-sdk";
import { useState } from "react";
import CallLobby from "./CallLobby";
import { SessionProvider } from "next-auth/react";
import CallActive from "./CallActive";
import EndedCall from "./EndedCall";
interface Props {
    customId: string;
}

export const CallUI = ({ customId }: Props) => {
    const call = useCall();
    const { useParticipants } = useCallStateHooks();
    const participants = useParticipants();

    const [show, setShow] = useState<"lobby" | "call" | "ended">("lobby");

    const [hasJoined, setHasJoined] = useState(false);

    const handleJoin = async () => {
      if (!call || hasJoined) return;
    
      try {
        await call.join({ create: true });
        setHasJoined(true);
        setShow("call");
      } catch (err) {
        console.error("Failed to join call", err);
      }
    };
    

    const handleLeave = async () => {
        if (!call) return;
      //  await call.leave();
        setShow("ended");
    };

    return (
        <StreamTheme className="h-[100vh]">

            {show === "lobby" && <SessionProvider>
                <CallLobby onJoin={handleJoin} />
                </SessionProvider>}
            {show === "call" && <CallActive onLeave={handleLeave} customId={customId}/>}
            {show === "ended" && <EndedCall/>}
        </StreamTheme>
    );
};
