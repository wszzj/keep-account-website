import clone from "@/lib/clone";
const localStorageName = "recordList";

const recordListModel = {
  data: [] as RecordItem[],
  fetch() {
    this.data = JSON.parse(
      window.localStorage.getItem(localStorageName) || "[]"
    );
    return this.data;
  },
  save() {
    window.localStorage.setItem(localStorageName, JSON.stringify(this.data));
  },

  create(record: RecordItem) {
    const record2: RecordItem = clone(record);
    record2.createdAt = new Date();
    this.data.push(record2);
    this.save();
  },
};

export default recordListModel;
