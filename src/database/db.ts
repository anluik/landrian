import { Dexie, type EntityTable } from "dexie";
import type { Issue } from "@/types/issue.ts";

export const db = new Dexie("BoardDB") as Dexie & {
    issues: EntityTable<Issue, "id">;
};

db.version(1).stores({
    issues: "id, status"
});

db.on("populate", function () {
    db.issues.add({
        id: crypto.randomUUID(),
        title: "Login redirects to a blank page",
        status: "todo",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. " +
            "b aspernatur beatae consequatur illum laboriosam voluptate.",
        assigneeId: "u1",
        labelIds: ["l1"],
        orderKey: "a0"
    });
    db.issues.add({
        id: crypto.randomUUID(),
        title: "Add dark mode to the settings panel",
        status: "todo",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. " +
            "Ab aspernatur beatae consequatur illum laboriosam voluptate.",
        assigneeId: "u1",
        labelIds: ["l2", "l3"],
        orderKey: "a1"
    });
    db.issues.add({
        id: crypto.randomUUID(),
        title: "Page crashes when submitting form",
        status: "in_progress",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. " +
            "b aspernatur beatae consequatur illum laboriosam voluptate.",
        assigneeId: "u1",
        labelIds: [],
        orderKey: "a0"
    });
    db.issues.add({
        id: crypto.randomUUID(),
        title: "Incident: logs not being recorded",
        status: "todo",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. " +
            "b aspernatur beatae consequatur illum laboriosam voluptate.",
        assigneeId: "u2",
        labelIds: [],
        orderKey: "a2"
    });
});
