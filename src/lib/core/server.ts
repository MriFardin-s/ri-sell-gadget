



const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;








export const serverMutation = async <T,>(
    path: string,
    data: T | null = null, 
    method = "POST"
) => {
    const res = await fetch(`${baseUrl}${path}`, {
        method,
        headers: {
            "Content-Type": "application/json"
        },
        body: data ? JSON.stringify(data) : undefined,
    });
    return res.json();
};