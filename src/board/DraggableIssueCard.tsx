import { useDraggable } from "@dnd-kit/react";
import { IssueCard } from "./IssueCard";
import type { IssueId, Status } from "./types";

interface DraggableIssueCardProps {
    id: IssueId;
    status: Status;
}

export function DraggableIssueCard({ id, status }: DraggableIssueCardProps) {
    const { ref } = useDraggable({ id });

    return (
        <li ref={ref}>
            <IssueCard id={id} status={status} />
        </li>
    );
}
