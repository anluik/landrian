import { Column } from './Column'
import { STATUSES } from './types'

export function Board() {
  return (
    <div className="mx-auto grid h-dvh max-w-275 grid-cols-3 grid-rows-1 gap-4 p-6">
      {STATUSES.map((status) => (
        <Column key={status.id} status={status.id} title={status.title} />
      ))}
    </div>
  )
}
