import type { CSSProperties } from 'react'
import { useShallow } from 'zustand/react/shallow'
import { selectIssue, selectLabels, selectUser } from './selectors'
import { useBoardStore } from './store'
import type { IssueId } from './types'

/**
 * The card takes an id, not an issue object. It denormalizes for itself:
 * it looks up its own assignee and labels. That keeps each card subscribed to
 * only the slices it actually renders — the payoff of the normalized store.
 */
export function IssueCard({ id }: { id: IssueId }) {
  const issue = useBoardStore(selectIssue(id))
  const assignee = useBoardStore(selectUser(issue.assigneeId))
  const labels = useBoardStore(useShallow(selectLabels(issue.labelIds)))

  return (
    <article className="rounded-lg border border-line bg-canvas px-3 py-2.5">
      <p className="mb-2.5 text-sm/relaxed">{issue.title}</p>

      <div className="flex items-center gap-1.5">
        {labels.map((label) => (
          // Label colors come from the store, so they stay inline — a utility
          // class can't express a value that only exists at runtime.
          <span
            key={label.id}
            className="rounded-full border px-[7px] text-[11px]/[18px]"
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
            className="ml-auto grid size-[22px] shrink-0 place-items-center rounded-full text-[11px] font-semibold text-white"
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
