import { useShallow } from "zustand/react/shallow";
import {
    selectInitStatus,
    selectIssue,
    selectIssueIdsByStatus,
    selectLabels,
    selectUser
} from "./selectors.ts";
import { useBoardStore } from "./store.ts";
import type { IssueId, Status } from "@/types/issue.ts";
import type { LabelId } from "@/types/label.ts";
import type { UserId } from "@/types/user.ts";

export const useInitStatus = () => useBoardStore(selectInitStatus);

export const useIssueIdsByStatus = (status: Status) =>
    useBoardStore(useShallow(selectIssueIdsByStatus(status)));

export const useIssue = (id: IssueId) => useBoardStore(selectIssue(id));

export const useUser = (id: UserId | null) => useBoardStore(selectUser(id));

export const useLabels = (ids: LabelId[]) =>
    useBoardStore(useShallow(selectLabels(ids)));
