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

import { useState } from "react";

function ExpenseRow({
  id,
  description,
  date,
  amount,
  paymentMethod,
  status,
  index,
  mutationUpdate,
  mutationDelete,
}: {
  id: string;
  description: string;
  date: string;
  amount: string;
  paymentMethod: string;
  status: string;
  index: number;
  mutationUpdate: any;
  mutationDelete: any;
}) {
  const [isEdit, setIsEdit] = useState(false);
  const [form, setForm] = useState<any>({
    id,
    description,
    date,
    amount: amount.split("$").join("").split(",")[0],
    paymentMethod,
    status,
    index,
  });

  const handleChange = (e: any, name: string) => {
    setForm({
      ...form,
      [name]: e.target.value,
    });
  };

  const handleSelect = (value: any) => {
    setForm({
      ...form,
      paymentMethod: value,
    });
  };

  const handleUpdate = (e: any) => {
    e.preventDefault();
    mutationUpdate.mutate(form);
    setIsEdit(false);
  };

  const handleDelete = (e: any) => {
    e.preventDefault();
    mutationDelete.mutate(index);
  };

  return (
    <TableRow>
      {isEdit ? (
        <>
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
                      <SelectItem value="Bank Transfer">
                        Bank Transfer
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TableCell>
        </>
      ) : (
        <>
          <TableCell className="font-medium">{id}</TableCell>
          <TableCell>{description}</TableCell>
          <TableCell>{date}</TableCell>
          <TableCell>{amount}</TableCell>
          <TableCell>{paymentMethod}</TableCell>
        </>
      )}
      <TableCell>
        <Badge variant={status === "Pending" ? "default" : "secondary"}>
          {status}
        </Badge>
      </TableCell>
      <TableCell>
        {isEdit ? (
          <Button variant="ghost" type="button" onClick={handleUpdate}>
            Update
          </Button>
        ) : (
          <Button variant="ghost" type="button" onClick={() => setIsEdit(true)}>
            Edit
          </Button>
        )}
        <Button variant="ghost" type="button" onClick={handleDelete}>
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
}

export default ExpenseRow;
