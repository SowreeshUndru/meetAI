import { NextRequest ,NextResponse as res } from "next/server";
import { PrismaClient } from "@/generated/prisma";
import bcrypt from "bcryptjs";
const prisma=new PrismaClient();

export  async function POST(req: NextRequest) {

    const  body=await req.json();
    const {  email, password } = body;
    console.log("Received data:", body);
    if (!email || !password) {
        return res.json({ error: "Email and password are required" }, { status: 400 });
    }
   const user=await prisma.user.findUnique({
        where:{
            email:email
        }
    });
    
    
    if(user)  return res.json({ error: "User already exists" }, { status: 400 });

    const hashed=await bcrypt.hash(password,10);
    await prisma.user.create({
        data:{
            email,
            password:hashed
        }
    });

    return res.json({ message: "signup successfully", email });
}