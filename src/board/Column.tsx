import { useIssueIdsByStatus } from "./hooks";
import { IssueCard } from "./IssueCard";
import type { Status } from "./types";

interface ColumnProps {
    status: Status;
    title: string;
}

export function Column({ status, title }: ColumnProps) {
    const issueIds = useIssueIdsByStatus(status);

    return (
        <section className="flex min-h-0 flex-col rounded-xl border border-line bg-surface p-3">
            <header className="mb-3 flex items-center gap-2">
                <h2 className="text-[13px] font-semibold tracking-wider text-muted uppercase">
                    {title}
                </h2>
                <span className="rounded-full border border-line bg-canvas px-1.75 text-xs text-muted">
                    {issueIds.length}
                </span>
            </header>

            <ul className="flex min-h-10 flex-1 flex-col gap-2 overflow-y-auto overscroll-contain [scrollbar-gutter:stable]">
                {issueIds.map(id => (
                    <li key={id}>
                        <IssueCard id={id} />
                    </li>
                ))}
            </ul>
        </section>
    );
}
