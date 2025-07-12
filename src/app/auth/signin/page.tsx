"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function SignIn() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        setError("");

        const res = await signIn("credentials", {
            redirect: false,
            email,
            password,
        });

        if (res?.error) {
            setError(res.error || "Invalid credentials");
        } else {
            setError("Signed in successfully");
            setTimeout(() => router.push("/"), 1000);
        }
    }

    return (
        <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-md md:max-w-3xl">
                <Card className="p-6 grid grid-cols-2">
                    <div className="flex flex-col space-y-8">
                        <h1 className="text-center text-xl">Sign In</h1>

                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                required
                                placeholder="you@example.com"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="mb-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <div className="flex items-center space-x-2 mt-2">
                                <input
                                    type="checkbox"
                                    id="togglePassword"
                                    checked={showPassword}
                                    onChange={() => setShowPassword(!showPassword)}
                                    className="h-4 w-4 accent-blue-600 cursor-pointer"
                                />
                                <label htmlFor="togglePassword" className="text-sm cursor-pointer">
                                    Show Password
                                </label>
                            </div>
                        </div>

                        <p className={`text-red-500 text-sm my-1 ${error ? "visible" : "invisible"}`}>
                            {error || "Signin failed"}
                        </p>

                        <Button onClick={handleSubmit}>Sign In</Button>

                        <div className="w-full text-center my-4 relative -mt-4">
                            <span className="w-full text-center">or</span>
                            <div className="relative flex items-center justify-center">
                                <span className="px-4 bg-white z-10 text-sm text-muted-foreground">continue with</span>
                                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                    <div className="w-full border-t border-muted" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 relative top-1/4 space-x-2">
                                <Button
                                    className="bg-[#ABC3E4] text-black"
                                    onClick={() => signIn("google")}
                                >
                                    <img src="/google_logo.png" alt="" className="md:h-7 md:w-7 h-4 w-4 rounded-full" /> Google
                                </Button>
                                <Button
                                    className="bg-[#4D4D4D]"
                                    onClick={() => signIn("github")}
                                >
                                    <img src="/github_logo.png" alt="github_logo" className="md:h-7 md:w-7 h-4 w-4 rounded-full" /> Github
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center items-center m-2">
                        <img
                            src="/logo.png"
                            alt="Meet.io logo featuring stylized text meet.io in bold blue font, centered on a white background. The design conveys a friendly and professional tone."
                            className="h-full w-full"
                        />
                    </div>
                </Card>
            </div>
        </div>
    );
}
