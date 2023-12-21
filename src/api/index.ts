let data = [
  {
    id: "EXP001",
    description: "Business lunch",
    date: "2023-12-15",
    amount: "$45.00",
    paymentMethod: "Credit Card",
    status: "Pending",
  },
  {
    id: "EXP002",
    description: "Flight tickets",
    date: "2023-12-10",
    amount: "$250.00",
    paymentMethod: "Debit Card",
    status: "Reimbursed",
  },
];

export const getData = () => {
  return data;
};

export const postData = (value: any) => {
  data.push(value);
  return data;
};

export const updateData = (value: any, index: number) => {
  let USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  data.forEach((item: any, i: number) => {
    if (i === index) {
      item.id = value.id;
      item.description = value.description;
      item.date = value.date;
      item.amount = USDollar.format(value.amount);
      item.paymentMethod = value.paymentMethod;
      item.status = "Reimbursed";
    }
  });
  return data;
};

export const deleteData = (index: any) => {
  const _temp: any = [];
  data.forEach((item, i) => {
    if (i !== index) {
      _temp.push(item);
    }
  });
  data = _temp;
  return data;
};
