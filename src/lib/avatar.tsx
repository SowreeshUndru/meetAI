import { createAvatar } from "@dicebear/core"
import { botttsNeutral,initials } from "@dicebear/collection"

interface props{
    seed:string;
    variant:"botttsNeutral" | "intials"
}


export const generateAvatarUri=({seed,variant}:props)=> {
     let avatar;
     if(variant==="botttsNeutral"){
        avatar=createAvatar(botttsNeutral,{seed});
     }else{
        avatar=createAvatar(initials,{seed,fontWeight:500,fontSize:42});
     }
  return avatar.toDataUri();
};

