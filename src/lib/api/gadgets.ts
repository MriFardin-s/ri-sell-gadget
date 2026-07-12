import { serverFetch } from "../core/server"

export const getGadgets = async () => {
    return serverFetch("/api/gadgets");
}


export const getGadgetById = async (id: string) => {
    return serverFetch(`/api/gadgets/${id}`)
}

export const getGadgetForManage = async (email: string, role: string) => {
    return serverFetch(`/api/manage-gadgets?email=${email}&role=${role}`);
}