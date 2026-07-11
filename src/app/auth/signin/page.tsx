"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Button, 
  Card, 
  Form, 
  TextField, 
  Label, 
  Input 
} from '@heroui/react';
import { 
  Envelope, 
  Key, 
  Eye, 
  EyeSlash 
} from '@gravity-ui/icons';
import { signIn } from "@/lib/auth-client";



export default function SignInPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

  
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      
      const { data, error: authError } = await signIn.email({
        email: email,
        password: password,
        callbackURL: "/", 
      });

      if (authError) {
        setError(authError.message || "Invalid email or password");
      } else {
        console.log("Login Success:", data);
        router.push("/"); 
        router.refresh(); 
      }

    } catch (error) {
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
            Welcome Back
          </h2>
          <p className="text-sm text-[var(--theme-text)] opacity-70 mt-2">
            Sign in to access your favorite gadgets and account
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 text-red-500 text-sm p-3 rounded-lg mb-4 text-center font-medium">
            {error}
          </div>
        )}

        <Form onSubmit={handleSubmit} className="space-y-5">
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
          <Button
            type="submit"
            isDisabled={loading}
            className="w-full py-3 rounded-lg btn-theme-brown mt-4 cursor-pointer transition-all duration-300 flex items-center justify-center font-bold text-[#fffdfa] disabled:opacity-50"
          >
            {loading ? "Signing In..." : "Sign In"}
          </Button>
        </Form>

        <div className="text-center mt-6">
          <p className="text-sm text-[var(--theme-text)] opacity-80">
            Do not have an account?{" "}
            <Link
              href="/auth/signup"
              className="text-[var(--color-theme-brown-primary)] font-semibold hover:text-[var(--color-theme-brown-hover)] transition-colors duration-200"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
}