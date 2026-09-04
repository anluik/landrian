import { type SyntheticEvent, useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import { createIssue } from "@/store/actions.ts";
import type { CreateViewProps } from "./CreateDialog.tsx";

export function NewIssueForm({ onClose }: CreateViewProps) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [saving, setSaving] = useState(false);

    const onSubmit = async (event: SyntheticEvent) => {
        event.preventDefault();
        setSaving(true);
        try {
            await createIssue({
                title: title.trim(),
                description: description.trim()
            });
            onClose();
        } catch {
            setSaving(false);
        }
    };
    return (
        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
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
            <Button
                type="submit"
                disabled={!title.trim() || saving}
                className="self-end"
            >
                Create issue
            </Button>
        </form>
    );
}
