let id: number = parseInt(window.localStorage.getItem("_id") || "0") || 0;

function createId() {
  id++;
  window.localStorage.setItem("_id", id.toString());

  return id;
}

export default createId;
