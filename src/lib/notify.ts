import { toast } from "sonner";

export const notify = {
    info: (message: string) => toast.info(message),
    success: (message: string) => toast.success(message),
    warning: (message: string) => toast.warning(message),
    error: (message: string) => toast.error(message)
};

export function reportFailure(message: string, error: unknown) {
    console.error(message, error);
    notify.error(message);
}
