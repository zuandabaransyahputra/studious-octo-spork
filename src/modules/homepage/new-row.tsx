import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TableCell, TableRow } from "@/components/ui/table";

function NewRow({
  form,
  setForm,
}: {
  form: any;
  setForm: React.Dispatch<React.SetStateAction<any>>;
}) {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    setForm({
      ...form,
      [name]: e.target.value,
    });
  };

  const handleSelect = (value: string) => {
    setForm({
      ...form,
      paymentMethod: value,
    });
  };

  return (
    <TableRow>
      <TableCell className="font-medium">
        <Input
          className="w-full"
          placeholder="EXP003"
          name="id"
          required
          value={form.id}
          onChange={(e) => handleChange(e, e.target.name)}
        />
      </TableCell>
      <TableCell>
        <Input
          className="w-full"
          placeholder="Description"
          name="description"
          required
          value={form.description}
          onChange={(e) => handleChange(e, e.target.name)}
        />
      </TableCell>
      <TableCell>
        <Input
          className="w-full"
          type="date"
          name="date"
          required
          value={form.date}
          onChange={(e) => handleChange(e, e.target.name)}
        />
      </TableCell>
      <TableCell>
        <Input
          className="w-full"
          step="0.01"
          type="number"
          name="amount"
          required
          value={form.amount}
          onChange={(e) => handleChange(e, e.target.name)}
        />
      </TableCell>
      <TableCell>
        <div className="relative inline-block text-left w-full">
          <div>
            <Select
              required
              onValueChange={(e) => handleSelect(e)}
              value={form.paymentMethod}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Payment Method" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Payment Method</SelectLabel>
                  <SelectItem value="Credit Card">Credit Card</SelectItem>
                  <SelectItem value="Debit Card">Debit Card</SelectItem>
                  <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <Badge variant={"default"}>-</Badge>
      </TableCell>
      <TableCell className="flex items-center justify-center">
        <Button type="submit" size="sm" variant="outline">
          Add
        </Button>
      </TableCell>
    </TableRow>
  );
}

export default NewRow;
