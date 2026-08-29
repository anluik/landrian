import { useBoardStore } from "./store";
import type { Issue } from "./types";

export type NewIssue = {
    title: string;
    description: string;
    assigneeId?: string;
};

export const createIssue = (newIssueData: NewIssue) => {
    const newId = crypto.randomUUID();
    const newIssue: Issue = {
        id: newId,
        status: "todo",
        title: newIssueData.title,
        description: newIssueData.description,
        assigneeId: newIssueData.assigneeId ?? null,
        labelIds: []
    };
    return useBoardStore.setState(state => ({
        issues: {
            ...state.issues,
            [newId]: newIssue
        }
    }));
};
