import { useSortable } from "@dnd-kit/react/sortable";
import { IssueCard } from "./IssueCard.tsx";
import type { IssueId, Status } from "@/types/Issue.ts";

interface SortableIssueCardProps {
    id: IssueId;
    status: Status;
    index: number;
}

export function SortableIssueCard({
    id,
    status,
    index
}: SortableIssueCardProps) {
    const { ref } = useSortable({
        id,
        index,
        group: status,
        type: "issue",
        accept: "issue"
    });

    return (
        <li ref={ref}>
            <IssueCard id={id} status={status} />
        </li>
    );
}
