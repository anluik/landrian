import type { CSSProperties } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { Card, CardContent } from "@/components/ui/card.tsx";
import { useIssue, useLabels, useUser } from "@/store/hooks.ts";
import type { IssueId, Status } from "@/types/issue.ts";

const statusRail: Record<Status, string> = {
    todo: "border-l-muted-foreground/40",
    in_progress: "border-l-amber-500",
    done: "border-l-emerald-500"
};

interface IssueCardProps {
    id: IssueId;
    status: Status;
}

export function IssueCard({ id, status }: IssueCardProps) {
    const issue = useIssue(id);
    const assignee = useUser(issue.assigneeId);
    const labels = useLabels(issue.labelIds);

    return (
        <Card
            size="sm"
            className={`gap-2.5 rounded-lg border border-l-2 py-2.5 shadow-none ring-0 transition-transform ${statusRail[status]}`}
        >
            <CardContent className="text-sm/relaxed">
                {issue.title} ({issue.orderKey})
            </CardContent>

            {issue.description && (
                <CardContent>
                    <div className="rounded-md border border-input bg-muted px-2 py-1.5 text-xs/relaxed text-muted-foreground">
                        <p className="line-clamp-2">{issue.description}</p>
                    </div>
                </CardContent>
            )}

            <CardContent className="flex items-center gap-1.5">
                {labels.map(label => (
                    <Badge
                        key={label.id}
                        variant="outline"
                        className="px-1.75 font-mono text-[10px] tracking-wide uppercase"
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
