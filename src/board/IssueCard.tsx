import type { CSSProperties } from 'react'
import { useIssue, useLabels, useUser } from './hooks'
import type { IssueId } from './types'

export function IssueCard({ id }: { id: IssueId }) {
  const issue = useIssue(id)
  const assignee = useUser(issue.assigneeId)
  const labels = useLabels(issue.labelIds)

  return (
    <article className="rounded-lg border border-line bg-canvas px-3 py-2.5">
      <p className="mb-2.5 text-sm/relaxed">{issue.title}</p>

      <div className="flex items-center gap-1.5">
        {labels.map((label) => (
          <span
            key={label.id}
            className="rounded-full border px-1.75 text-[11px]/[18px]"
            style={
              {
                '--chip': label.color,
                color: 'var(--chip)',
                borderColor: 'color-mix(in srgb, var(--chip) 40%, transparent)',
                backgroundColor: 'color-mix(in srgb, var(--chip) 12%, transparent)',
              } as CSSProperties
            }
          >
            {label.name}
          </span>
        ))}

        {assignee && (
          <span
            className="ml-auto grid size-5.5 shrink-0 place-items-center rounded-full text-[11px] font-semibold text-white"
            style={{ background: assignee.color }}
            title={assignee.name}
          >
            {assignee.name.charAt(0)}
          </span>
        )}
      </div>
    </article>
  )
}
