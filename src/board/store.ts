import { create } from "zustand";
import type {
    Issue,
    IssueId,
    Label,
    LabelId,
    Status,
    User,
    UserId
} from "./types";

export interface BoardState {
    issues: Record<IssueId, Issue>;
    users: Record<UserId, User>;
    labels: Record<LabelId, Label>;
    columnOrder: Record<Status, IssueId[]>
}

const seed: BoardState = {
    issues: {
        i1: {
            id: "i1",
            title: "Login redirects to a blank page",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. " +
                "b aspernatur beatae consequatur illum laboriosam voluptate.",
            assigneeId: "u1",
            labelIds: ["l1"]
        },
        i2: {
            id: "i2",
            title: "Add dark mode to the settings panel",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. " +
                "Ab aspernatur beatae consequatur illum laboriosam voluptate.",
            assigneeId: "u1",
            labelIds: ["l2", "l3"]
        },
        i3: {
            id: "i3",
            title: "Page crashes when submitting form",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. " +
                "b aspernatur beatae consequatur illum laboriosam voluptate.",
            assigneeId: "u1",
            labelIds: []
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
    },
    columnOrder: {
        todo: ["i1", "i3"],
        in_progress: ["i2"],
        done: []
    }
};

export const useBoardStore = create<BoardState>()(() => seed);
