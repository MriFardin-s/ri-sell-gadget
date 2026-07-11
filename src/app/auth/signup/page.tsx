"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    Button,
    Card,
    Form,
    TextField,
    Label,
    Input,
} from '@heroui/react';
import {
    Envelope,
    Key,
    Person,
    Eye,
    EyeSlash
} from '@gravity-ui/icons';
import { signUp } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function SignupPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        const formData = new FormData(e.currentTarget);
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const confirmPassword = formData.get("confirmPassword") as string;


        if (!name || !email || !password || !confirmPassword) {
            setError("All fields are required");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            setLoading(true);


            const { data, error: authError } = await signUp.email({
                email: email,
                password: password,
                name: name,
                // data: {
                //     role: "user",
                // }
            });

            if (authError) {
                setError(authError.message || "Signup failed");
            } else {
                router.push("/");
                console.log("Signup Success:", data);
            }

        } catch (err) {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 animate-fade-in">
            <Card className="w-full max-w-md bg-[var(--theme-scrollbar-track)] dark:bg-[#2a201c] p-8 rounded-2xl shadow-xl border-none">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-[var(--theme-text)]">
                        Create Account
                    </h2>
                    <p className="text-sm text-[var(--theme-text)] opacity-70 mt-2">
                        Join us to manage and explore your favorite gadgets
                    </p>
                </div>

                {error && (
                    <div className="bg-red-500/10 text-red-500 text-sm p-3 rounded-lg mb-4 text-center font-medium">
                        {error}
                    </div>
                )}

                <Form onSubmit={handleSubmit} className="space-y-5">
                    {/* Full Name */}
                    <TextField className="w-full">
                        <Label className="block text-sm font-medium text-[var(--theme-text)] mb-1">Full Name</Label>
                        <div className="relative flex items-center">
                            <span className="absolute left-3 text-[var(--theme-text)] opacity-50 z-10 pointer-events-none">
                                <Person className="w-4 h-4" />
                            </span>
                            <Input
                                type="text"
                                name="name"
                                required
                                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 dark:border-zinc-700 bg-[var(--theme-bg)] text-[var(--theme-text)] focus:outline-none"
                                placeholder="John Doe"
                            />
                        </div>
                    </TextField>

                    {/* Email Address */}
                    <TextField className="w-full">
                        <Label className="block text-sm font-medium text-[var(--theme-text)] mb-1">Email Address</Label>
                        <div className="relative flex items-center">
                            <span className="absolute left-3 text-[var(--theme-text)] opacity-50 z-10 pointer-events-none">
                                <Envelope className="w-4 h-4" />
                            </span>
                            <Input
                                type="email"
                                name="email"
                                required
                                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 dark:border-zinc-700 bg-[var(--theme-bg)] text-[var(--theme-text)] focus:outline-none"
                                placeholder="example@mail.com"
                            />
                        </div>
                    </TextField>

                    {/* Password */}
                    <TextField className="w-full">
                        <Label className="block text-sm font-medium text-[var(--theme-text)] mb-1">Password</Label>
                        <div className="relative flex items-center">
                            <span className="absolute left-3 text-[var(--theme-text)] opacity-50 z-10 pointer-events-none">
                                <Key className="w-4 h-4" />
                            </span>
                            <Input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                required
                                className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-gray-300 dark:border-zinc-700 bg-[var(--theme-bg)] text-[var(--theme-text)] focus:outline-none"
                                placeholder="••••••••"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 text-[var(--theme-text)] opacity-50 hover:opacity-80 transition-opacity z-10 cursor-pointer"
                            >
                                {showPassword ? <EyeSlash className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                    </TextField>

                    {/* Confirm Password */}
                    <TextField className="w-full">
                        <Label className="block text-sm font-medium text-[var(--theme-text)] mb-1">Confirm Password</Label>
                        <div className="relative flex items-center">
                            <span className="absolute left-3 text-[var(--theme-text)] opacity-50 z-10 pointer-events-none">
                                <Key className="w-4 h-4" />
                            </span>
                            <Input
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                required
                                className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-gray-300 dark:border-zinc-700 bg-[var(--theme-bg)] text-[var(--theme-text)] focus:outline-none"
                                placeholder="••••••••"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 text-[var(--theme-text)] opacity-50 hover:opacity-80 transition-opacity z-10 cursor-pointer"
                            >
                                {showConfirmPassword ? <EyeSlash className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                    </TextField>

                    <Button
                        type="submit"
                        isDisabled={loading}
                        className="w-full py-3 rounded-lg btn-theme-brown mt-2 cursor-pointer transition-all duration-300 flex items-center justify-center font-bold text-[#fffdfa] disabled:opacity-50"
                    >
                        {loading ? "Signing Up..." : "Sign Up"}
                    </Button>
                </Form>

                <div className="text-center mt-6">
                    <p className="text-sm text-[var(--theme-text)] opacity-80">
                        Already have an account?{" "}
                        <Link
                            href="/login"
                            className="text-[var(--color-theme-brown-primary)] font-semibold hover:text-[var(--color-theme-brown-hover)] transition-colors duration-200"
                        >
                            Login
                        </Link>
                    </p>
                </div>
            </Card>
        </div>
    );
}