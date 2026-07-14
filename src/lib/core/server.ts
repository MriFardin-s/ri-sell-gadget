import { redirect } from "next/navigation";
import { getUserToken } from "./session";




const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;


export const authHeader = async (): Promise<Record<string, string>> => {
    const token = await getUserToken();
    const header: Record<string, string> = token ? {
        authorization: `Bearer ${token}`
    } : {};
    return header
}


export const serverFetch = async <T,>(path: string): Promise<T> => {
    console.log("Sending request to:", `${process.env.NEXT_PUBLIC_BASE_URL}${path}`);
    const res = await fetch(`${baseUrl}${path}`, {
        cache: "no-store",
    });


    return handleStatusCode<T>(res);
};

export const protectedFetch = async <T,>(path: string): Promise<T> => {
    const res = await fetch(`${baseUrl}${path}`, {
        cache: "no-store",
        headers: await authHeader()
    })

    return handleStatusCode<T>(res)

}



export const serverMutation = async <T,>(
    path: string,
    data: T | null = null,
    method = "POST"
) => {
    const res = await fetch(`${baseUrl}${path}`, {
        method,
        headers: {
            "Content-Type": "application/json",
            ...(await authHeader()),
        },
        body: data ? JSON.stringify(data) : undefined,
    });
    return handleStatusCode<T>(res)
};










const handleStatusCode = async <T,>(res: Response): Promise<T> => {
    if (!res.ok) {
        switch (res.status) {
            case 401:
                redirect("/unauthorized");
            case 403:
                redirect("/forbidden");
            case 404:
                redirect("/not-found");
            case 400:
            case 500:
                redirect("/error");
            default:
                redirect("/error");
        }
    }

    return res.json() as Promise<T>;
};