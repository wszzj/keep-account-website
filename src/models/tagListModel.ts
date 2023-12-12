const localStorageName = 'tagList'

const tagListModel = {
    data:[] as string[],
    fetch() {
        this.data = JSON.parse(window.localStorage.getItem(localStorageName) || "[]") as string[]
        return this.data
    },
    save() {
       window.localStorage.setItem(localStorageName, JSON.stringify(this.data));
    },
    create(name:string) {
        this.data.push(name)
        this.save()
        return name
    }
   
}

export default tagListModel