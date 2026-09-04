import { generateKeyBetween } from "fractional-indexing";
import { selectIssueIdsByStatus } from "./selectors.ts";
import { useBoardStore } from "./store.ts";
import { persist } from "./persist.ts";
import type { Issue, IssueId, Status } from "@/types/issue.ts";
import { addIssue, updateIssue } from "@/database/issues.repo.ts";
import { reportFailure } from "@/lib/notify.ts";

export type NewIssue = {
    title: string;
    description: string;
    assigneeId?: string;
};

export const createIssue = async (newIssueData: NewIssue) => {
    const state = useBoardStore.getState();
    const newId = crypto.randomUUID();
    const todoIds = selectIssueIdsByStatus("todo")(state);
    const lastId = todoIds.at(-1);
    const newIssue: Issue = {
        id: newId,
        title: newIssueData.title,
        status: "todo",
        description: newIssueData.description,
        assigneeId: newIssueData.assigneeId ?? null,
        labelIds: [],
        orderKey: generateKeyBetween(
            lastId ? state.issues[lastId].orderKey : null,
            null
        )
    };

    try {
        await addIssue(newIssue);
    } catch (error) {
        reportFailure("Could not create issue", error);
        throw error;
    }

    useBoardStore.setState(current => ({
        issues: { ...current.issues, [newId]: newIssue }
    }));
};

export const moveIssue = (
    issueId: IssueId,
    toStatus: Status,
    placementIndex?: number // if missing, issue will be appended to the end
) => {
    const state = useBoardStore.getState();
    const issue = state.issues[issueId];
    if (!issue) return;

    const siblingIds = selectIssueIdsByStatus(toStatus)(state).filter(
        id => id !== issueId
    );
    const index = placementIndex ?? siblingIds.length;
    const beforeId = siblingIds[index - 1];
    const afterId = siblingIds[index];

    const changes: Partial<Issue> = {
        status: toStatus,
        orderKey: generateKeyBetween(
            beforeId ? state.issues[beforeId].orderKey : null,
            afterId ? state.issues[afterId].orderKey : null
        )
    };

    useBoardStore.setState(current => ({
        issues: { ...current.issues, [issueId]: { ...issue, ...changes } }
    }));

    return persist({
        write: () => updateIssue(issueId, changes),
        rollback: () =>
            useBoardStore.setState(current => ({
                issues: { ...current.issues, [issueId]: issue }
            })),
        errorMessage: "Could not move issue"
    });
};
