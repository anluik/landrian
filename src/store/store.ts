import { create } from "zustand";
import type { Issue, IssueId } from "@/types/issue.ts";
import type { User, UserId } from "@/types/user.ts";
import type { Label, LabelId } from "@/types/label.ts";
import { getIssues } from "@/database/issues.repo.ts";

export type InitStatus = "loading" | "ready" | "error";

export interface BoardState {
    initStatus: InitStatus;
    issues: Record<IssueId, Issue>;
    users: Record<UserId, User>;
    labels: Record<LabelId, Label>;
}

const initialState: BoardState = {
    initStatus: "loading",
    issues: {},
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

export const useBoardStore = create<BoardState>()(() => initialState);

export const loadIssues = async () => {
    useBoardStore.setState({ initStatus: "loading" });
    try {
        const issues = await getIssues();
        useBoardStore.setState({
            initStatus: "ready",
            issues: Object.fromEntries(issues.map(issue => [issue.id, issue]))
        });
    } catch {
        useBoardStore.setState({ initStatus: "error" });
    }
};
