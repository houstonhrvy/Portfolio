export default function ThirdImpact() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 2 }}>
      {/* Atmospheric dark at very top */}
      <div className="absolute top-0 inset-x-0 h-1/4"
        style={{ background: 'linear-gradient(to bottom, rgba(15,0,30,0.35) 0%, transparent 100%)' }} />

      {/* LCL sea / orange horizon at bottom */}
      <div className="absolute bottom-0 inset-x-0 h-[38%]"
        style={{ background: 'linear-gradient(to top, rgba(160,25,0,0.18) 0%, rgba(220,60,0,0.05) 45%, transparent 100%)' }} />

      {/* Radial orange event glow from horizon center */}
      <div className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 80% 40% at 50% 105%, rgba(180,30,0,0.15) 0%, transparent 60%)' }} />
    </div>
  )
}
