import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "../../@/components/ui/table";

const documents = [
    {Name: "Dealsheet01", Attachment: "dealsheet01.pdf", date: "11 September 2024 03:00pm", added_by: "Blandine Niyomukiza"},
    {Name: "DBT013", Attachment: "debit013.xlsx", date: "20 May 2024 10:30am", added_by: "Idara Patrick"},
    {Name: "INV001", Attachment: "invoice001.pdf", date: "15 May 2024 09:00am", added_by: "Ashina Cecilia"},
];
  
export default function Folder(){
    return(
        <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Documents</h2>
            <Table>
                <TableCaption>A list of your recent Documents.</TableCaption>
                <TableHeader>
                    <TableRow>
                    <TableHead className="w-[100px]">Name</TableHead>
                    <TableHead>Attachment</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Added by:</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {documents.map((document) => 
                    <TableRow>
                        <TableCell className="font-medium">{document.Name}</TableCell>
                        <TableCell>{document.Attachment}</TableCell>
                        <TableCell>{document.date}</TableCell>
                        <TableCell className="text-right">{document.added_by}</TableCell>
                    </TableRow>)}
                </TableBody>
            </Table>
        </div>
    );
}