import { useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import type { CreateViewProps } from "./CreateButton.tsx";

export function NewIssueForm({ onClose }: CreateViewProps) {
    const [title, setTitle] = useState("");

    return (
        <form
            className="flex flex-col gap-4"
            onSubmit={event => {
                event.preventDefault();
                onClose();
            }}
        >
            <Input
                autoFocus
                placeholder="Issue title"
                value={title}
                onChange={event => setTitle(event.target.value)}
            />
            <Button type="submit" disabled={!title.trim()} className="self-end">
                Create issue
            </Button>
        </form>
    );
}
