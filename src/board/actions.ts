import { type BoardState, useBoardStore } from "./store";
import type { Issue, IssueId, Status } from "./types";

export type NewIssue = {
    title: string;
    description: string;
    assigneeId?: string;
};

export const createIssue = (newIssueData: NewIssue) => {
    const newId = crypto.randomUUID();
    const newIssue: Issue = {
        id: newId,
        title: newIssueData.title,
        description: newIssueData.description,
        assigneeId: newIssueData.assigneeId ?? null,
        labelIds: []
    };
    return useBoardStore.setState(state => ({
        issues: {
            ...state.issues,
            [newId]: newIssue
        },
        columnOrder: {
            ...state.columnOrder,
            todo: [...state.columnOrder.todo, newId]
        }
    }));
};

export const moveIssue = (issueId: IssueId, toStatus: Status, placementIndex: number) => {
    useBoardStore.setState(state => {
        if (!(issueId in state.issues)) return state;
        const columnOrder = Object.fromEntries(
            Object.entries(state.columnOrder).map(([status, ids]) => [
                status,
                ids.filter(id => id !== issueId)
            ])
        ) as BoardState["columnOrder"];
        columnOrder[toStatus] = columnOrder[toStatus].toSpliced(placementIndex, 0, issueId);
        return { columnOrder };
    });
};
