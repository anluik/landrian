import { useShallow } from "zustand/react/shallow";
import {
    selectIssue,
    selectIssueIdsByStatus,
    selectLabels,
    selectUser
} from "./selectors";
import { useBoardStore } from "./store";
import type { IssueId, LabelId, Status, UserId } from "./types";

export const useIssueIdsByStatus = (status: Status) =>
    useBoardStore(useShallow(selectIssueIdsByStatus(status)));

export const useIssue = (id: IssueId) => useBoardStore(selectIssue(id));

export const useUser = (id: UserId | null) => useBoardStore(selectUser(id));

export const useLabels = (ids: LabelId[]) =>
    useBoardStore(useShallow(selectLabels(ids)));
