import { DragDropProvider } from "@dnd-kit/react";
import { isSortable } from "@dnd-kit/react/sortable";
import { moveIssue } from "./actions";
import { Column } from "./Column";
import { useBoardStore } from "./store";
import { STATUSES, type IssueId, type Status } from "./types";
import { useRef } from "react";

export function Board() {
    const sourceParentRef = useRef<Element | null>(null);
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
                    const toStatus = target.id as Status;
                    moveIssue(
                        issueId,
                        toStatus,
                        useBoardStore.getState().columnOrder[toStatus].length
                    );
                } else if (isSortable(source)) {
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
