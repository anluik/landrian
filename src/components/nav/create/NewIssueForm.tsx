import { useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import { createIssue } from "@/store/actions.ts";
import type { CreateViewProps } from "./CreateDialog.tsx";

export function NewIssueForm({ onClose }: CreateViewProps) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    return (
        <form
            className="flex flex-col gap-4"
            onSubmit={event => {
                event.preventDefault();
                createIssue({
                    title: title.trim(),
                    description: description.trim()
                });
                onClose();
            }}
        >
            <Input
                autoFocus
                placeholder="Issue title"
                value={title}
                onChange={event => setTitle(event.target.value)}
            />
            <Textarea
                placeholder="Description"
                className="max-h-48"
                value={description}
                onChange={event => setDescription(event.target.value)}
            />
            <Button type="submit" disabled={!title.trim()} className="self-end">
                Create issue
            </Button>
        </form>
    );
}
