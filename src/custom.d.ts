type RecordItem = {
  tag: string;
  notes: string;
  type: string;
  amount: number | string;
  createdAt?: Date;
};
type Tag = {
  id: string;
  name: string;
};
