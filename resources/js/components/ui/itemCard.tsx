import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/shadcn/ui/card"

interface ItemCardProps {
  title: string | JSX.Element;
  body: JSX.Element;
  description?: string;
}

export const ItemCard = (props: ItemCardProps) => {
  const { title, body, description } = props;

  return (
    <Card className="rounded-sm">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>Card Description</CardDescription>}
      </CardHeader>
      <CardContent>
        {body}
      </CardContent>
    </Card>

  )
}