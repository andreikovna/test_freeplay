class IndexedMap {
  constructor() {
    this._array = [];
    this._map = {};
  }

  set(key, value) {
    if (this.has(key)) {
      this._map[key] = value;
    } else {
      this._map[key] = value;
      this._array.push(key);
    }
    return this;
  }

  has(key) {
    return this._map.hasOwnProperty(key);
  }

  hasIndex(index) {
    return !!this._array[index];
  }

  get(key) {
    if (this.has(key)) {
      return this._map[key];
    } else {
      console.log(`The key ${key} is not existed`);
      return null;
    }
  }

  getByIndex(index) {
    if (this.hasIndex(index)) {
      return this.get(this._array[index]);
    } else {
      console.log(`The index ${index} is not existed`);
      return null;
    }
  }

  remove(key) {
    if (this.has(key)) {
      delete this._map[key];
      const index = this._array.indexOf(key);
      this._array.splice(index, 1);
    } else {
      console.log(`The key ${key} is not existed`);
    }
    return this;
  }

  size() {
    return this._array.length;
  }

  union(...maps) {
    maps.map((element) => {
      this._map = { ...this._map, ...element._map };
      this._array = Object.keys(this._map);
    });
    return this;
  }

  uniq() {
    return Array.from(new Set(Object.values(this._map)));
  }

  sortIndexes(callback) {
    if (typeof callback === "function") {
      this._array.sort((a, b) => {
        return callback(this._map[a], this._map[b]);
      });
    } else {
      this._array.sort();
    }
    return this;
  }

  setTo(index, key, value) {
    if (!this.has(key)) {
      this._map[key] = value;

      if (
        index < 0 ||
        typeof index !== "number" ||
        index >= this._array.length
      ) {
        this._array.push(key);
      } else {
        this._array.splice(index, 0, key);
      }
    }
    return this;
  }

  removeAt(index, count = 1) {
    return this;
  }
}
