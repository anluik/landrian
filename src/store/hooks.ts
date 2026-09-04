import { useShallow } from "zustand/react/shallow";
import {
    selectIssue,
    selectIssueIdsByStatus,
    selectLabels,
    selectUser
} from "./selectors.ts";
import { useBoardStore } from "./store.ts";
import type { IssueId, Status } from "@/types/Issue.ts";
import type { LabelId } from "@/types/Label.ts";
import type { UserId } from "@/types/User.ts";

export const useIssueIdsByStatus = (status: Status) =>
    useBoardStore(useShallow(selectIssueIdsByStatus(status)));

export const useIssue = (id: IssueId) => useBoardStore(selectIssue(id));

export const useUser = (id: UserId | null) => useBoardStore(selectUser(id));

export const useLabels = (ids: LabelId[]) =>
    useBoardStore(useShallow(selectLabels(ids)));
