"use client";

import "@stream-io/video-react-sdk/dist/css/styles.css";
interface Props {
  meetingId: string;
  meetingName: string;
  userId: string;
  userName: string;
  userImage: string;
};
import {
  StreamCall,
  StreamVideo,
  StreamVideoClient,
  useCallStateHooks,
  ParticipantView,
  Call,
  CallingState
} from '@stream-io/video-react-sdk';
import { useEffect, useRef, useState } from 'react';
import { useTRPC } from '@/trpc/client';

import { useQueryClient, useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import CreateRoom from './CreateRoom';
import { Divide } from "lucide-react";
import { CallUI } from "./Call-ui";

export default function VideoRoom({ creatorId,customId, userId ,userEmail}: { customId: string, userId: string ,userEmail:string,creatorId:string}) {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  
//////////////////////////////////////////
  
///////////////////////////////////
  const joinRoomMutation = useMutation(
    trpc.room.joinRoom.mutationOptions({
      
      onError: (error) => {
        toast.error(error.message);
      }
    })
  );
////////////////////////////////////
  const saveTranscriptMutation = useMutation(
    trpc.room.saveTranscript.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(trpc.room.getTranscripts.queryOptions({ roomId: customId }));
      },
      onError: () => {
        toast.error('Failed to save transcript');
      }
    })
  );
  
 //////////////////start//////////////////////////////

 const [client,setClient]=useState<StreamVideoClient>()
  
 const { data: token, error: tokenError } = useSuspenseQuery(
  trpc.room.generateToken.queryOptions()
);

console.log(token);

  useEffect(()=>{
    
    const _client=new StreamVideoClient({
      apiKey:"hqcmvyajp2g4",
      token:token ,
      user: { id: userId ,
        name:userEmail,
       
      },
     
      
    });
    setClient(_client);

    return ()=>{
      _client.disconnectUser();
      
      setClient(undefined);
    }


  },[userId,userEmail,token]);

  const [call,setCall]=useState<Call>();
  useEffect(()=>{
    if(!client) return;

    const _call=client.call("default",customId);
    _call.camera.disable();
    _call.microphone.disable();
    setCall(_call);


    return ()=>{
      if(_call.state.callingState!==CallingState.LEFT){
        _call.leave();
        _call.endCall();
        setCall(undefined);
      }
    }

  },[customId,client]);
  if(!client||!call){
    return (
      <div>
        loading..............
      </div>
    )
  }
  
  
 

  if (tokenError) throw tokenError;

  return (
    <>
      
        <StreamVideo client={client}>
          <StreamCall call={call}>
           <CallUI userId={userId} customId={customId} creatorId={creatorId} />
          </StreamCall>
        </StreamVideo>
      
    </>
  );
}



