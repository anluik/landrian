import { SquarePenIcon, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { CreateViewId, CreateViewProps } from "./CreateButton";

interface CreateOption {
    icon: LucideIcon;
    label: string;
    description: string;
    target: CreateViewId;
}

const options: CreateOption[] = [
    {
        icon: SquarePenIcon,
        label: "New issue",
        description: "Add an issue to the board",
        target: "newIssue"
    }
];

export function CreateMenu({ onNavigate }: CreateViewProps) {
    return (
        <div className="flex flex-col gap-2">
            {options.map(option => (
                <Button
                    key={option.target}
                    variant="outline"
                    onClick={() => onNavigate(option.target)}
                    className="h-auto justify-start gap-3 p-3 text-left whitespace-normal"
                >
                    <option.icon className="text-muted-foreground" />
                    <span className="flex flex-col gap-0.5">
                        <span>{option.label}</span>
                        <span className="font-normal text-muted-foreground">
                            {option.description}
                        </span>
                    </span>
                </Button>
            ))}
        </div>
    );
}
