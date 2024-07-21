import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { formatDate } from "@/lib/utils"


export function GenericTable({data = [], columns= []}:{data:any, columns:any}) {
  return (
    <Table>
      <TableCaption>Paket satın alma geçmişi</TableCaption>
      <TableHeader>
        <TableRow>
          {columns.map((column: any) => (
            <TableHead key={column.key}>{column.title}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item: any) => (
          <TableRow key={item.id}>
            {columns.map((column: any) => (
              <TableCell key={column.key}>{column.valueFormatter ? column.valueFormatter(item[column.value]) : item[column.value]}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
