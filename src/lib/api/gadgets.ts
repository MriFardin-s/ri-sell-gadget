import { GadgetsApiResponse, GetGadgetsParams } from "@/types/gadgets";
import { serverFetch } from "../core/server"

export const getGadgets = async (params?: GetGadgetsParams): Promise<GadgetsApiResponse> => {
    const queryString = params
        ? `?${new URLSearchParams(
            Object.entries(params).reduce((acc, [key, value]) => {
                if (value !== undefined && value !== null && value !== "") {
                    acc[key] = String(value);
                }
                return acc;
            }, {} as Record<string, string>)
        ).toString()}`
        : "";

    return serverFetch(`/api/gadgets${queryString}`);
};


export const getGadgetById = async (id: string) => {
    return serverFetch(`/api/gadgets/${id}`)
}

export const getGadgetForManage = async (email: string, role: string) => {
    return serverFetch(`/api/manage-gadgets?email=${email}&role=${role}`);
}