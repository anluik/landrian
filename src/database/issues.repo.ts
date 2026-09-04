import type { Issue, IssueId } from "@/types/issue.ts";
import { db } from "@/database/db.ts";

const { issues } = db;

export async function getIssues() {
    return issues.toArray();
}

export async function addIssue(newIssue: Issue) {
    return issues.add(newIssue);
}

export async function updateIssue(id: IssueId, changes: Partial<Issue>) {
    return issues.update(id, changes);
}