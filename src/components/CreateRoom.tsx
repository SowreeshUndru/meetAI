"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTRPC } from "@/trpc/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";


export default function CreateRoom() {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const router = useRouter();
  const [customId, setCustomId] = useState("");

  const createRoomMutation = useMutation(
    trpc.room.createRoom.mutationOptions({
      onSuccess: async (createdRoom) => {
        router.push(`/rooms/${customId}`);
        toast.success(`Room "${createdRoom.customId}" created!`);
       
        await queryClient.invalidateQueries(); // optional
      },
      onError: (err) => {
        toast.error(err.message);
      },
    })
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = customId;
    
    if (!id) {
      toast.error("Custom ID is required");
      return;
    }
    
    createRoomMutation.mutate({ customId: id }); 
 
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-w-md mx-auto p-4 bg-white rounded shadow"
    >
      <h2 className="text-xl font-semibold">Create a New Room</h2>

      <Input
        placeholder="Enter a unique room name"
        value={customId}
        onChange={(e) => setCustomId(e.target.value)}
        disabled={createRoomMutation.isPending}
      />

      <Button type="submit" disabled={createRoomMutation.isPending}>
        {createRoomMutation.isPending ? "Creating…" : "Create & Join Room"}
      </Button>
    </form>
  );
}
