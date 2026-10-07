export function SectionHeading({ eyebrow, title, children, titleId }) {
  return (
    <div className="section-heading">
      <div>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2 id={titleId}>{title}</h2>
      </div>
      {children && <div className="section-heading-aside">{children}</div>}
    </div>
  )
}
