import { useState } from 'react'

export default function EvaUnit01({ className, style }: { className?: string; style?: React.CSSProperties }) {
  const [failed, setFailed] = useState(false)

  if (failed) return null

  return (
    <img
      src="/eva-01.png"
      alt="Evangelion Unit-01"
      className={className}
      style={{ objectFit: 'contain', objectPosition: 'center bottom', ...style }}
      onError={() => setFailed(true)}
    />
  )
}
