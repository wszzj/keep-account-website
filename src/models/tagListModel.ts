import createId from "@/lib/createId";
const localStorageName = "tagList";

const tagListModel = {
  data: [] as Tag[],
  fetch() {
    this.data = JSON.parse(
      window.localStorage.getItem(localStorageName) || "[]"
    ) as Tag[];
    return this.data;
  },
  save() {
    window.localStorage.setItem(localStorageName, JSON.stringify(this.data));
  },
  create(name: string) {
    const names = this.data.map((item) => item.name);

    if (names.indexOf(name) >= 0) {
      window.alert("标签名重复");
      return "duplicate";
    }
    const id = createId().toString();
    this.data.push({ id, name });
    this.save();
    return name;
  },
  update(id: string, name: string) {
    const idList = this.data.map((item) => item.id);
    if (idList.indexOf(id) >= 0) {
      const names = this.data.map((item) => item.name);

      if (names.indexOf(name) >= 0) {
        return "duplicate";
      } else {
        const tag = this.data.filter((item) => item.id === id)[0];
        tag.id = tag.name = name;
        this.save();
      }
    } else {
      return "notFound";
    }
  },
  remove(id: string) {
    let index = -1;
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i].id === id) {
        index = i;
        break;
      }
    }
    this.data.splice(index, 1);
    this.save();
  },
};

export default tagListModel;
