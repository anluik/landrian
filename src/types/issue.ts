import type { UserId } from "@/types/user.ts";
import type { LabelId } from "@/types/label.ts";

export type IssueId = string;

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
    description: string;
    assigneeId: UserId | null;
    labelIds: LabelId[];
    orderKey: string;
}