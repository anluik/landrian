import { reportFailure } from "@/lib/notify.ts";

interface PersistOptions {
    write: () => Promise<unknown>;
    rollback: () => void;
    errorMessage: string;
}

export async function persist({
    write,
    rollback,
    errorMessage
}: PersistOptions) {
    try {
        await write();
    } catch (error) {
        rollback();
        reportFailure(errorMessage, error);
    }
}
