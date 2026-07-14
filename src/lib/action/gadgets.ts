import { GadgetInput } from "@/types/gadgets";
import { serverMutation } from "../core/server";

// interface GadgetInput {
//     title: string;
//     shortDescription: string;
//     fullDescription: string;
//     price: number;
//     priority: string;
//     imageUrl: string;
//     status: string;
//     user: {
//         name: string | null | undefined;
//         email: string | null | undefined;
//         id: string;
//     };
// }

interface MutationResponse {
    success?: boolean;
    ok?: boolean;
    message?: string;
}

export const addGadget = async (gadget: GadgetInput) => {
    return await serverMutation("/api/add-gadget", gadget, "POST");
}


export const deleteGadget = async (id: string): Promise<MutationResponse> => {
    const res = await serverMutation(`/api/delete-gadget/${id}`, {}, "DELETE");
    return res as MutationResponse;
}