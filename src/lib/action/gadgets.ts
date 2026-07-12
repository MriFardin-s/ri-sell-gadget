import { serverMutation } from "../core/server";

interface GadgetInput {
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

export const addGadget = async (gadget: GadgetInput) => {
    return await serverMutation("/api/add-gadget", gadget, "POST");
}