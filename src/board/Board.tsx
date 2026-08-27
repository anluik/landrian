import { Column } from './Column'
import { STATUSES } from './types'

export function Board() {
  return (
    <div className="mx-auto grid max-w-275 grid-cols-3 items-start gap-4 p-6">
      {STATUSES.map((status) => (
        <Column key={status.id} status={status.id} title={status.title} />
      ))}
    </div>
  )
}
