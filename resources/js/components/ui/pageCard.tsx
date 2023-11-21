export const PageCard = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  return (
    <div className="border bg-card text-card-foreground shadow space-y-1.5 p-4 md:p-6 rounded-sm">
      {children}
    </div>
  )
}