import { create } from "zustand";
import type { Issue, IssueId } from "@/types/Issue.ts";
import type { User, UserId } from "@/types/User.ts";
import type { Label, LabelId } from "@/types/Label.ts";

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
            description:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. " +
                "b aspernatur beatae consequatur illum laboriosam voluptate.",
            assigneeId: "u1",
            labelIds: ["l1"],
            orderKey: "a0"
        },
        i2: {
            id: "i2",
            title: "Add dark mode to the settings panel",
            status: "todo",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. " +
                "Ab aspernatur beatae consequatur illum laboriosam voluptate.",
            assigneeId: "u1",
            labelIds: ["l2", "l3"],
            orderKey: "a1"
        },
        i3: {
            id: "i3",
            title: "Page crashes when submitting form",
            status: "in_progress",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. " +
                "b aspernatur beatae consequatur illum laboriosam voluptate.",
            assigneeId: "u1",
            labelIds: [],
            orderKey: "a0"
        },
        i4: {
            id: "i4",
            title: "Incident: logs not being recorded",
            status: "todo",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. " +
                "b aspernatur beatae consequatur illum laboriosam voluptate.",
            assigneeId: "u2",
            labelIds: [],
            orderKey: "a2"
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
