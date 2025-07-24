import { useTRPC } from "@/trpc/client";
import { AgentGetone } from "../../types";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { GeneratedAvatar } from "@/compo/Generated_avatar";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";


import { agentsInsertSchema } from "../../schema";
import { FileEdit } from "lucide-react";
import { toast } from "sonner";

interface AgentFromProps {
  onSuccess?: () => void;
  onCancel?: () => void;
  intialValues?: AgentGetone;
}

function AgentForm({
  onSuccess,
  onCancel,
  intialValues
}: AgentFromProps) {

  const trpc = useTRPC();
  const router = useRouter();
  const queryClient = useQueryClient()
  const createAgent = useMutation(
    trpc.agents.create.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(trpc.agents.getMany.queryOptions());

        if (intialValues?.id) {
          await queryClient.invalidateQueries(trpc.agents.getOne.queryOptions({ id: intialValues.id }));
        }
        onSuccess?.()
      },
      onError: (error) => {
        toast.error(error.message);
        //TODO:check if error code is  forbidden to "/upgrade"
      }
    }),
  );

  // TODO:

  const form = useForm<z.infer<typeof agentsInsertSchema>>({
    resolver: zodResolver(agentsInsertSchema),
    defaultValues: {
      name: intialValues?.name ?? "",
      instructions: intialValues?.instructions ?? "",
    }
  });
  const isEdit = !!intialValues?.id;
  const isPending = createAgent.isPending


  const onSubmit = (values: z.infer<typeof agentsInsertSchema>) => {
    if (isEdit) {
      console.log("TODO:updateAgent")
    } else {
      createAgent.mutate(values);
    }
  }



  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <GeneratedAvatar
          seed={form.watch("name")}
          variant="bottts"
          className="border size-16"
        />

        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="e.g. interviewr" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="instructions"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="i want an interview from ur side " />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between gap-2">
          {onCancel && (<Button variant="ghost"
            disabled={isPending}
            type="button"
            onClick={() => onCancel()}
          >
            Cancel
          </Button>)}
          <Button disabled={isPending} type="submit">
            {isEdit ? "update" : "Create"}
          </Button>
        </div>
      </form>
    </Form>

  )
}

export default AgentForm