import { generateKeyBetween } from "fractional-indexing";
import { selectIssueIdsByStatus } from "./selectors.ts";
import { useBoardStore } from "./store.ts";
import type { Issue, IssueId, Status } from "@/types/Issue.ts";

export type NewIssue = {
    title: string;
    description: string;
    assigneeId?: string;
};

export const createIssue = (newIssueData: NewIssue) => {
    useBoardStore.setState(state => {
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
        return { issues: { ...state.issues, [newId]: newIssue } };
    });
};

export const moveIssue = (
    issueId: IssueId,
    toStatus: Status,
    placementIndex?: number // if missing, issue will be appended to the end
) => {
    useBoardStore.setState(state => {
        const issue = state.issues[issueId];
        if (!issue) return state;

        const siblingIds = selectIssueIdsByStatus(toStatus)(state).filter(
            id => id !== issueId
        );
        const index = placementIndex ?? siblingIds.length;
        const beforeId = siblingIds[index - 1];
        const afterId = siblingIds[index];

        return {
            issues: {
                ...state.issues,
                [issueId]: {
                    ...issue,
                    status: toStatus,
                    orderKey: generateKeyBetween(
                        beforeId ? state.issues[beforeId].orderKey : null,
                        afterId ? state.issues[afterId].orderKey : null
                    )
                }
            }
        };
    });
};
