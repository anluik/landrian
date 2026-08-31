import { DragDropProvider } from "@dnd-kit/react";
import { moveIssue } from "./actions";
import { Column } from "./Column";
import { useBoardStore } from "./store";
import { STATUSES, type IssueId, type Status } from "./types";

export function Board() {
    return (
        <DragDropProvider
            onDragEnd={event => {
                const { source, target } = event.operation;
                if (event.canceled || !source || !target) return;
                const toStatus = target.id as Status;
                const issueId = source.id as IssueId;
                moveIssue(
                    issueId,
                    toStatus,
                    useBoardStore.getState().columnOrder[toStatus].length
                );
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
