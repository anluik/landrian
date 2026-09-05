import { createFileRoute } from "@tanstack/react-router";
import { useRef } from "react";
import { useInitStatus } from "@/store/hooks.ts";
import { BoardError, BoardLoading } from "@/components/board/BoardPlaceholder.tsx";
import { DragDropProvider } from "@dnd-kit/react";
import { type IssueId, type Status, STATUSES } from "@/types/issue.ts";
import { moveIssue } from "@/store/actions.ts";
import { isSortable } from "@dnd-kit/react/sortable";
import { Column } from "@/components/board/Column.tsx";

export const Route = createFileRoute("/")({
    component: RouteComponent
});

function RouteComponent() {
    const sourceParentRef = useRef<Element | null>(null);
    const initStatus = useInitStatus();

    if (initStatus === "loading") return <BoardLoading />;
    if (initStatus === "error") return <BoardError />;

    return (
        <DragDropProvider
            onDragStart={event => {
                sourceParentRef.current =
                    event.operation.source?.element?.parentElement ?? null;
            }}
            onDragEnd={event => {
                // Workaround for dnd-kit#1747 (the @dnd-kit/react package is experimental):
                // the optimistic sorting plugin reparents the dragged node across columns,
                // which makes React's reconciler throw "removeChild" on commit. We move the
                // node back to its original parent before setState so the DOM and React agree.
                const sourceElement = event.operation.source?.element;
                const prevParent = sourceParentRef.current;
                sourceParentRef.current = null;
                if (
                    sourceElement &&
                    prevParent &&
                    sourceElement.parentElement !== prevParent
                ) {
                    prevParent.appendChild(sourceElement);
                }

                const { source, target } = event.operation;
                if (event.canceled || !source || !target) return;

                const issueId = source.id as IssueId;
                if (target.type === "column") {
                    // outside droppable, but in column - append to the end
                    const toStatus = target.id as Status;
                    moveIssue(issueId, toStatus);
                } else if (isSortable(source)) {
                    // inside droppable, place at index
                    moveIssue(issueId, source.group as Status, source.index);
                }
            }}
        >
            <div className="mx-auto grid h-full max-w-275 grid-cols-3 grid-rows-1 gap-8 p-6">
                {STATUSES.map(status => (
                    <Column
                        key={status.id}
                        status={status.id}
                        title={status.title}
                    />
                ))}
            </div>
        </DragDropProvider>
    );
}
