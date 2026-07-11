import AddGadget from '@/components/AddGadget';
import { getUserSession } from '@/lib/core/session';
import { redirect } from 'next/navigation';

const AddItemPage = async () => {
    const user = await getUserSession();
    
    if (!user) {
        redirect("/auth/signin");
    }

    return (
        <main>
            <AddGadget />
        </main>
    );
};

export default AddItemPage;