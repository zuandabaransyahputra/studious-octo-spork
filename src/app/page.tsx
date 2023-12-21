"use client";
import {
  MutationOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import FullPageSpinner from "@/app/full-page-spinner";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { useState } from "react";
import { deleteData, getData, postData, updateData } from "@/api";
import ExpenseRow from "@/modules/homepage/expand-row";
import NewRow from "@/modules/homepage/new-row";

export default function Home() {
  const queryClient = useQueryClient();
  const [form, setForm] = useState<any>({
    id: "",
    description: "",
    date: "",
    amount: "",
    paymentMethod: "",
    status: "Pending",
  });
  let USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  let { data, isLoading } = useQuery<any[], Error>({
    queryKey: ["expenses"],
    queryFn: getData,
  });
  const mutationOption: MutationOptions = {
    mutationKey: ["expenses"],
    onMutate(variables: any) {
      variables.amount = USDollar.format(variables.amount);
      postData(variables);
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
    },
  };

  const mutation = useMutation(mutationOption);
  const mutationOptionUpdate: MutationOptions = {
    mutationKey: ["expenses"],
    onMutate(variables: any) {
      updateData(variables, variables.index);
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
    },
  };

  const mutationUpdate = useMutation(mutationOptionUpdate);

  const mutationOptionDelete: MutationOptions = {
    mutationKey: ["expenses"],
    onMutate(variables: any) {
      deleteData(variables);
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
    },
  };

  const mutationDelete = useMutation(mutationOptionDelete);

  if (isLoading) {
    return <FullPageSpinner />;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(form);
    setForm({
      id: "",
      description: "",
      date: "",
      amount: "",
      paymentMethod: "",
      status: "Pending",
    });
  };

  return (
    <main className="min-h-screen p-10">
      <form onSubmit={handleSubmit}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px]">Code</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Payment Method</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map(
              (
                { id, description, date, amount, paymentMethod, status },
                index: number
              ) => (
                <ExpenseRow
                  key={id}
                  id={id}
                  description={description}
                  date={date}
                  amount={amount}
                  paymentMethod={paymentMethod}
                  status={status}
                  index={index}
                  mutationUpdate={mutationUpdate}
                  mutationDelete={mutationDelete}
                />
              )
            )}
            <NewRow form={form} setForm={setForm} />
          </TableBody>
        </Table>
      </form>
    </main>
  );
}
