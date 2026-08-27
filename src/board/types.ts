export type IssueId = string;
export type UserId = string;
export type LabelId = string;

export type Status = "todo" | "in_progress" | "done";

export const STATUSES: readonly { id: Status; title: string }[] = [
    { id: "todo", title: "Todo" },
    { id: "in_progress", title: "In Progress" },
    { id: "done", title: "Done" }
];

export interface Issue {
    id: IssueId;
    title: string;
    status: Status;
    assigneeId: UserId | null;
    labelIds: LabelId[];
}

export interface User {
    id: UserId;
    name: string;
    color: string;
}

export interface Label {
    id: LabelId;
    name: string;
    color: string;
}
