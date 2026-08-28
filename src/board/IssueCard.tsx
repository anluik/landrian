import type { CSSProperties } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useIssue, useLabels, useUser } from "./hooks";
import type { IssueId } from "./types";

export function IssueCard({ id }: { id: IssueId }) {
    const issue = useIssue(id);
    const assignee = useUser(issue.assigneeId);
    const labels = useLabels(issue.labelIds);

    return (
        <Card size="sm" className="gap-2.5 rounded-lg py-2.5">
            <CardContent className="text-sm/relaxed">{issue.title}</CardContent>

            <CardContent className="flex items-center gap-1.5">
                {labels.map(label => (
                    <Badge
                        key={label.id}
                        variant="outline"
                        className="px-1.75 text-[11px]"
                        style={
                            {
                                "--chip": label.color,
                                color: "var(--chip)",
                                borderColor:
                                    "color-mix(in srgb, var(--chip) 40%, transparent)",
                                backgroundColor:
                                    "color-mix(in srgb, var(--chip) 12%, transparent)"
                            } as CSSProperties
                        }
                    >
                        {label.name}
                    </Badge>
                ))}

                {assignee && (
                    <Avatar size="sm" className="ml-auto" title={assignee.name}>
                        <AvatarFallback
                            className="text-[11px] font-semibold text-white"
                            style={{ backgroundColor: assignee.color }}
                        >
                            {assignee.name.charAt(0)}
                        </AvatarFallback>
                    </Avatar>
                )}
            </CardContent>
        </Card>
    );
}
