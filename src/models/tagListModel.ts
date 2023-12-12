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
    } else {
      this.data.push({ id: name, name });
      this.save();
      return name;
    }
  },
};

export default tagListModel;
