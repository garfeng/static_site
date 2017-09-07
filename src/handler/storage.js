class BaseStorage {
  setItems(obj = {}) {
    for (let i in obj) {
      this.setItem(i, obj[i])
    }
  }

  removeItems(...arr) {
    const fn = this.removeItem.bind(this);
    arr.map(fn);
  }

  getItems(...arr) {
    let result = {}
    for (var i in arr) {
      let key = arr[i];
      result[key] = this.getItem(key)
    }
    return result;
  }

  setItem(key = "", value = "") {}
  getItem(key = "") {}
  removeItem(key = "") {}
  clear() {}
}

class SpareStorage extends BaseStorage {
  constructor() {
    super();
    this.clear();
  }

  setItem(key = "", value = "") {
    if (key !== "") {
      this.Data[key] = value;
      this.length = this.Data.length;
    }
  }

  getItem(key = "") {
    return this.Data[key];
  }

  removeItem(key = "") {
    delete this.Data[key];
    this.length = this.Data.length;
  }

  clear() {
    this.Data = {};
    this.length = 0;
  }
}

class ExtendsLocalStorage extends BaseStorage {
  constructor() {
    super();
    this.localStorage = window.localStorage;
    this.length = this.localStorage.length;
  }

  setItem(key = "", value = "") {
    this.localStorage.setItem(key, value);
    this.length = this.localStorage.length;
  }

  getItem(key = "") {
    return this.localStorage.getItem(key);
  }

  removeItem(key = "") {
    this.localStorage.removeItem(key);
    this.length = this.localStorage.length;
  }

  clear() {
    this.localStorage.clear();
    this.length = this.localStorage.length;
  }
}

let storage = null;
const InitStorage = () => {
  if (typeof window.localStorage === "undefined") {
    storage = new SpareStorage();
  } else {
    storage = new ExtendsLocalStorage();
  }
};

InitStorage();

export default storage;