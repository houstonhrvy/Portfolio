import { useState } from 'react'

export default function EvaUnit02({ className, style }: { className?: string; style?: React.CSSProperties }) {
  const [failed, setFailed] = useState(false)

  if (failed) return null

  return (
    <img
      src="/eva-02.png"
      alt="Evangelion Unit-02"
      className={className}
      style={{ objectFit: 'contain', objectPosition: 'center bottom', ...style }}
      onError={() => setFailed(true)}
    />
  )
}
