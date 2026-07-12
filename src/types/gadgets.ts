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
    imageUrl: string;
    status: string;
    user: UserInfo;
}

export type GadgetCardData = Omit<Gadget, "fullDescription" | "status" | "user">;

export type GadgetInput = Omit<Gadget, "_id">;

export type GadgetData = GadgetInput;