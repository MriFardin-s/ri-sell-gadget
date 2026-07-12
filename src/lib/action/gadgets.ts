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

export const addGadget = async (gadget: GadgetInput) => {
    return await serverMutation("/api/add-gadget", gadget, "POST");
}


export const deleteGadget = async (id: string) => {
    return await serverMutation(`/api/delete-gadget/${id}`, {}, "DELETE");
}