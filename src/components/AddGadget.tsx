'use client';

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import {
    Form, Fieldset, TextField, Input, Select, Label,
    SelectTrigger, SelectValue, SelectIndicator, SelectPopover,
    ListBox, ListBoxItem, Button
} from "@heroui/react";
import { toast } from "react-hot-toast";
import { addGadget } from "@/lib/action/gadgets";

interface GadgetData {
    title: string;
    shortDescription: string;
    fullDescription: string;
    price: number;
    priority: string;
    imageUrl: string;
    status: string;
    user: {
        name: string | null | undefined;
        email: string | null | undefined;
        id: string;
    };
}

interface AddGadgetProps {
    addProduct?: (data: GadgetData) => Promise<{ success: boolean; insertedId?: string; message?: string }>;
}

export default function AddGadget({ addProduct }: AddGadgetProps) {
    const { data: session, isPending } = useSession();
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!isPending && !session) {
            router.push("/auth/signin");
        }
    }, [session, isPending, router]);

    if (isPending || !session) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white dark:bg-neutral-950">
                <div className="w-8 h-8 border-4 border-theme-brown-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const triggerFileSelect = () => {
        fileInputRef.current?.click();
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        const title = data.title as string | undefined;
        const shortDescription = data.shortDescription as string | undefined;
        const fullDescription = data.fullDescription as string | undefined;
        const price = data.price as string | undefined;
        const priority = data.priority as string | undefined;

        if (!title || !shortDescription || !fullDescription || !price || !priority || !selectedImage) {
            toast.error("Please fill in all fields and select an image", {
                style: {
                    background: '#fef2f2',
                    color: '#991b1b',
                    border: '1px solid #fca5a5',
                    borderRadius: '12px',
                    fontSize: '14px',
                    fontWeight: '600'
                }
            });
            setIsSubmitting(false);
            return;
        }

        try {
            const imgFormData = new FormData();
            imgFormData.append('image', selectedImage);

            const response = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`, {
                method: 'POST',
                body: imgFormData
            });

            const result = await response.json();

            if (!result.success) {
                toast.error("Failed to upload image to ImgBB.", {
                    style: {
                        background: '#fef2f2',
                        color: '#991b1b',
                        border: '1px solid #fca5a5',
                        borderRadius: '12px',
                        fontSize: '14px',
                        fontWeight: '600'
                    }
                });
                setIsSubmitting(false);
                return;
            }

            const uploadedImageUrl = result.data.url;

            const newGadgetData = {
                title,
                shortDescription,
                fullDescription,
                price: Number(price),
                priority,
                imageUrl: uploadedImageUrl,
                status: "pending",
                user: {
                    name: session.user?.name,
                    email: session.user?.email,
                    id: session.user?.id
                }
            };

            const res = await addGadget(newGadgetData);

            if (res && (res.insertedId || res.acknowledged || res.success)) {
                toast.success("Gadget added successfully!", {
                    style: {
                        background: '#fdf8f2',
                        color: '#854d0e',
                        border: '1px solid #d9a066',
                        borderRadius: '12px',
                        fontSize: '14px',
                        fontWeight: '600'
                    }
                });
                router.push("/explore");
            } else {
                throw new Error("Backend operation failed");
            }

        } catch (error) {
            console.error("Submission error details:", error);
            toast.error("Failed to add gadget. Try again.", {
                style: {
                    background: '#fef2f2',
                    color: '#991b1b',
                    border: '1px solid #fca5a5',
                    borderRadius: '12px',
                    fontSize: '14px',
                    fontWeight: '600'
                }
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
            <div className="max-w-2xl mx-auto bg-white dark:bg-neutral-900 rounded-2xl shadow-xl border border-neutral-200 dark:border-neutral-800 p-6 sm:p-10">
                <div className="mb-8">
                    <h1 className="text-3xl font-black tracking-tight text-neutral-900 dark:text-neutral-100 flex items-center gap-3">
                        Add New <span className="bg-gradient-to-r from-[var(--color-theme-brown-primary)] to-[#d9a066] bg-clip-text text-transparent uppercase">Gadget</span>
                    </h1>
                    <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
                        Fill up the details below to list a new product item.
                    </p>
                </div>

                <div className="flex flex-col items-start gap-2">
                    <button
                        type="button"
                        onClick={triggerFileSelect}
                        className="p-2 bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 hover:border-theme-brown-primary dark:hover:border-theme-brown-primary rounded-xl transition cursor-pointer text-neutral-600 dark:text-neutral-400 hover:text-theme-brown-primary"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14" />
                            <path d="M12 5v14" />
                        </svg>
                    </button>
                    <span className="text-sm text-neutral-500 dark:text-neutral-400">
                        Click to select an image
                    </span>
                </div>

                <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageChange} className="hidden" />

                <Form onSubmit={handleSubmit} className="space-y-6 mt-5">
                    <Fieldset className="space-y-6">
                        {imagePreview && (
                            <div className="w-full flex justify-center mb-4">
                                <div className="relative w-40 h-40 border border-neutral-300 dark:border-neutral-700 rounded-2xl overflow-hidden shadow-inner bg-neutral-50 dark:bg-neutral-800 flex items-center justify-center">
                                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                    <button type="button" onClick={() => { setSelectedImage(null); setImagePreview(null); }} className="absolute top-2 right-2 p-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow transition cursor-pointer">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                                    </button>
                                </div>
                            </div>
                        )}

                        <div className="flex flex-col gap-1.5">
                            <Label className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">Title</Label>
                            <TextField aria-label="Title">
                                <Input name="title" placeholder="e.g., iPhone 15 Pro Max" className="w-full px-4 py-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-theme-brown-primary dark:text-neutral-100 transition" />
                            </TextField>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <Label className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">Short Description</Label>
                            <TextField aria-label="Short Description">
                                <Input name="shortDescription" placeholder="Brief summary of the gadget features" className="w-full px-4 py-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-theme-brown-primary dark:text-neutral-100 transition" />
                            </TextField>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <Label className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">Full Description</Label>
                            <textarea name="fullDescription" rows={4} placeholder="Detailed specification and condition details..." className="w-full px-4 py-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-theme-brown-primary text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-500 transition resize-none" />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-1.5">
                                <Label className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">Price ($)</Label>
                                <TextField aria-label="Price">
                                    <Input name="price" type="number" placeholder="999" className="w-full px-4 py-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-theme-brown-primary dark:text-neutral-100 transition" />
                                </TextField>
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <Label className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">Priority Level</Label>
                                <Select aria-label="Priority Level" name="priority" className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-theme-brown-primary transition">
                                    <SelectTrigger className="w-full px-4 py-3 flex justify-between items-center text-neutral-900 dark:text-neutral-100">
                                        <SelectValue>Select priority</SelectValue>
                                        <SelectIndicator />
                                    </SelectTrigger>
                                    <SelectPopover className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl shadow-lg mt-1 overflow-hidden">
                                        <ListBox className="py-1">
                                            <ListBoxItem id="low" textValue="Low" className="px-4 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 cursor-pointer">Low</ListBoxItem>
                                            <ListBoxItem id="medium" textValue="Medium" className="px-4 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 cursor-pointer">Medium</ListBoxItem>
                                            <ListBoxItem id="high" textValue="High" className="px-4 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 cursor-pointer">High</ListBoxItem>
                                        </ListBox>
                                    </SelectPopover>
                                </Select>
                            </div>
                        </div>
                    </Fieldset>

                    <Button type="submit" isDisabled={isSubmitting} className="w-full py-4 bg-gradient-to-r from-[var(--color-theme-brown-primary)] to-[#d9a066] hover:opacity-90 text-white font-bold text-base rounded-xl shadow-md transition disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer">
                        {isSubmitting ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Adding Gadget...
                            </>
                        ) : (
                            "Submit (Add Gadget)"
                        )}
                    </Button>
                </Form>
            </div>
        </div>
    );
}