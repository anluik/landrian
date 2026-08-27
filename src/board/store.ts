import { create } from "zustand";
import type { Issue, IssueId, Label, LabelId, User, UserId } from "./types";

export interface BoardState {
    issues: Record<IssueId, Issue>;
    users: Record<UserId, User>;
    labels: Record<LabelId, Label>;
}

const seed: BoardState = {
    issues: {
        i1: {
            id: "i1",
            title: "Login redirects to a blank page",
            status: "todo",
            assigneeId: "u1",
            labelIds: ["l1"]
        },
        i2: {
            id: "i2",
            title: "Add dark mode to the settings panel",
            status: "in_progress",
            assigneeId: "u1",
            labelIds: ["l2", "l3"]
        }
    },
    users: {
        u1: { id: "u1", name: "Ada Lovelace", color: "#7c5cff" },
        u2: { id: "u2", name: "Grace Hopper", color: "#0ea5a4" }
    },
    labels: {
        l1: { id: "l1", name: "bug", color: "#ef4444" },
        l2: { id: "l2", name: "feature", color: "#3b82f6" },
        l3: { id: "l3", name: "design", color: "#f59e0b" }
    }
};

export const useBoardStore = create<BoardState>()(() => seed);

// Step 2 lives here: named actions (createIssue, moveIssue, assignIssue) are
// the only things allowed to write to the store. Nothing else calls setState.
