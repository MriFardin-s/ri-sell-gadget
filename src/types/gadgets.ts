export interface UserInfo {
    name: string | null | undefined;
    email: string | null | undefined;
    id: string;
}

export interface Gadget {
    _id: string;
    title: string;
    shortDescription: string;
    fullDescription: string;
    price: number;
    priority: string;
    condition: string;
    imageUrl: string;
    status: string;
    user: UserInfo;
    createdAt?: { $date: string } | string | Date;
}

export interface GadgetsApiResponse {
    gadgets: GadgetCardData[];
    totalItems: number;
    totalPages: number;
}

export type GadgetCardData = Omit<Gadget, "fullDescription" | "status" | "user">;

export type GadgetInput = Omit<Gadget, "_id">;

export type GadgetData = GadgetInput;


export interface GetGadgetsParams {
    search?: string;
    priority?: string;
    condition?: string;
    sort?: string;
    page?: string | number;
}