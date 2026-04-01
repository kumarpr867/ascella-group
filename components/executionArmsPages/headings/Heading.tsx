export default function Heading({ text, className, size }: { text?: string, className?: string, size?: number }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg width="16" height="16" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14 14H0V11.2002H14V14ZM2.7998 8.40039H0V5.59961H2.7998V8.40039ZM14 8.40039H11.2002V5.59961H14V8.40039ZM5.59961 5.59961H2.7998V2.7998H5.59961V5.59961ZM11.2002 5.59961H8.40039V2.7998H11.2002V5.59961ZM8.40039 2.7998H5.59961V0H8.40039V2.7998Z" fill="white" />
      </svg>

      {text ? (
        <h1 className="text-b1 font-bold" style={size ? { fontSize: size } : undefined}>
          {text}
        </h1>
      ) : null}
    </div>
  )
}