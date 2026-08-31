import type { BoardState } from "./store";
import type { IssueId, LabelId, Status, UserId } from "./types";

export const selectIssueIdsByStatus =
    (status: Status) =>
    (state: BoardState): IssueId[] =>
        state.columnOrder[status];

export const selectIssue = (id: IssueId) => (state: BoardState) =>
    state.issues[id];

export const selectUser = (id: UserId | null) => (state: BoardState) =>
    id === null ? undefined : state.users[id];

export const selectLabels = (ids: LabelId[]) => (state: BoardState) =>
    ids.map(id => state.labels[id]);
