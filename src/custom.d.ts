type RecordItem = {
  tag: string;
  notes: string;
  type: string;
  amount: number | string;
  createdAt?: string;
};
type Tag = {
  id: string;
  name: string;
};
type RootState = {
  recordList: RecordItem[];
  tagList: Tag[];
  currentTag: Tag | undefined;
};
