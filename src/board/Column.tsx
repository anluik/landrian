import { DraggableIssueCard } from "./DraggableIssueCard";
import { useIssueIdsByStatus } from "./hooks";
import type { Status } from "./types";

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

    return (
        <section className="flex min-h-0 flex-col">
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
                {issueIds.map(id => (
                    <DraggableIssueCard key={id} id={id} status={status} />
                ))}
            </ul>
        </section>
    );
}
