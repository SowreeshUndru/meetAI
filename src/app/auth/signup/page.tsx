"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { redirect } from "next/dist/server/api-utils";

export default function Signup() {
    const Router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showpassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");

    function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        setError(""); 

        axios.post("/api/auth/signup", { email, password })
            .then(response => {
                console.log("Response:", response.data);
                setError("signup successfully");
                setEmail("");
                setPassword("");
              
            setTimeout(() => {
                Router.push("/");
                
            }, 1000);
            })
            .catch(error => {
                console.error("Error during signup:", error);
                setError(error.response?.data?.error || "Signup failed. Please try again.");
            });
    }

    return (
        <div className="space-y-4 p-4 max-w-md mx-auto">
            <div>
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
            </div>
            <div>
                <Label htmlFor="password">Password</Label>
                <Input
                    id="password"
                    type={showpassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <Button
                    type="button"
                    variant="outline"
                    className="ml-2"
                    onClick={() => setShowPassword(!showpassword)}
                >
                    {showpassword ? "Hide" : "Show"} Password
                </Button>
            </div>

            {error && (
                <p className="text-red-500 text-sm">{error}</p>
            )}

            <Button onClick={handleSubmit}>Submit</Button>
        </div>
    );
}
