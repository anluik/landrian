import { CollisionPriority } from "@dnd-kit/abstract";
import { useDroppable } from "@dnd-kit/react";
import { SortableIssueCard } from "./SortableIssueCard.tsx";
import { useIssueIdsByStatus } from "@/store/hooks.ts";
import type { Status } from "@/types/issue.ts";

const statusDot: Record<Status, string> = {
    todo: "bg-muted-foreground/60",
    in_progress: "bg-amber-500",
    done: "bg-emerald-500"
};

interface ColumnProps {
    status: Status;
    title: string;
}

export function Column({ status, title }: ColumnProps) {
    const issueIds = useIssueIdsByStatus(status);
    const { ref, isDropTarget } = useDroppable({
        id: status,
        type: "column",
        accept: "issue",
        collisionPriority: CollisionPriority.Low
    });

    return (
        <section
            ref={ref}
            className={`flex min-h-0 flex-col rounded-lg transition-colors ${isDropTarget ? "bg-primary/5" : ""}`}
        >
            <header className="mb-3 flex items-center gap-2 border-b border-dashed pb-2.5">
                <span
                    className={`size-1.5 rounded-full ${statusDot[status]}`}
                />
                <h2 className="font-mono text-xs font-semibold tracking-widest text-muted-foreground uppercase">
                    {title}
                </h2>
                <span className="ml-auto font-mono text-xs text-muted-foreground">
                    {issueIds.length}
                </span>
            </header>

            <ul className="flex min-h-10 flex-1 flex-col gap-3 overflow-y-auto overscroll-contain scrollbar-gutter-stable">
                {issueIds.map((id, index) => (
                    <SortableIssueCard
                        key={id}
                        id={id}
                        status={status}
                        index={index}
                    />
                ))}
            </ul>
        </section>
    );
}
