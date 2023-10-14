import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "./shadcn/ui/table"

export const LandingsTable = () => {
  return (
    <Table>     
      <TableHeader>
        <TableRow>
          <TableHead className="whitespace-nowrap">Назва (домен)</TableHead>
          <TableHead>Адреса</TableHead>
          <TableHead>Дата</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">INV001</TableCell>
          <TableCell>Paid</TableCell>
          <TableCell>Credit Card</TableCell>
          <TableCell className="text-right">$250.00</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}