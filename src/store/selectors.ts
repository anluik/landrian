import type { BoardState } from "./store.ts";
import type { IssueId, Status } from "@/types/Issue.ts";
import type { UserId } from "@/types/User.ts";
import type { LabelId } from "@/types/Label.ts";

export const selectIssueIdsByStatus =
    (status: Status) =>
    (state: BoardState): IssueId[] =>
        Object.values(state.issues)
            .filter(issue => issue.status === status)
            .sort((a, b) =>
                a.orderKey < b.orderKey ? -1 : a.orderKey > b.orderKey ? 1 : 0
            )
            .map(issue => issue.id);

export const selectIssue = (id: IssueId) => (state: BoardState) =>
    state.issues[id];

export const selectUser = (id: UserId | null) => (state: BoardState) =>
    id === null ? undefined : state.users[id];

export const selectLabels = (ids: LabelId[]) => (state: BoardState) =>
    ids.map(id => state.labels[id]);
