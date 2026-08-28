import { Badge } from "@/components/ui/badge";
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
        <section className="flex min-h-0 flex-col rounded-xl border bg-muted p-3">
            <header className="mb-3 flex items-center gap-2">
                <h2 className="text-[13px] font-semibold tracking-wider text-muted-foreground uppercase">
                    {title}
                </h2>
                <Badge variant="outline" className="bg-background px-1.75">
                    {issueIds.length}
                </Badge>
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
