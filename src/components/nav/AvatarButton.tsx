import { UserRoundIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar.tsx";
import { Button } from "@/components/ui/button.tsx";

export function AvatarButton() {
    return (
        <Button
            variant="ghost"
            size="icon"
            aria-label="Account"
            className="rounded-full"
        >
            <Avatar>
                <AvatarFallback>
                    <UserRoundIcon className="size-4.5" />
                </AvatarFallback>
            </Avatar>
        </Button>
    );
}
