interface PageCardProps {
  title?: string;
  action?: JSX.Element;
  children: JSX.Element;
}

export const PageCard = (props: PageCardProps) => {
  const { title, action, children } = props;

  return (
    <div className="border bg-card text-card-foreground shadow space-y-1.5 p-4 md:p-6 rounded-sm">
      <div className="flex items-center justify-between">
        {title && (
          <h2 className="text-lg font-semibold leading-none tracking-tight mb-6">{title}</h2>
        )}
        {action && action}
      </div>

      {children}
    </div>
  )
}

