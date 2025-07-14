import {createAvatar} from "@dicebear/core";
import {botttsNeutral,initials} from "@dicebear/collection";
import { cn } from "@/lib/utils";
import { Avatar,AvatarFallback,AvatarImage } from "@/components/ui/avatar";



interface GeneratedAvatarProps {
    seed: string;
    className?: string;
    variant: "bottts" | "initials";

}

export const GeneratedAvatar = ({ seed, className, variant }: GeneratedAvatarProps) => {
    let avatar;

    if (variant === "bottts") {
        avatar = createAvatar(botttsNeutral, {
            seed,
       
        });
    } else if (variant === "initials") {
        avatar = createAvatar(initials, {
            seed,
          fontWeight: 500,
          fontSize: 42,
        });
    } else {
        throw new Error("Invalid variant specified");
    }

    return (
        <Avatar className={cn("h-10 w-10", className)}>
            <AvatarImage src={avatar.toDataUri()} alt="Generated Avatar" />
            <AvatarFallback>{seed.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
    );
}