var indexedDB = window.indexedDB;

export default class IDBKeystore {
  constructor({ storeName }) {
    this.store = storeName;
    this.dbName = storeName + "." + "Database";
    this.storeName = storeName + "." + "ObjectStore";
    this.db_open = indexedDB.open(this.dbName);
    this.db_open.onupgradeneeded = () => {
      this.db = this.db_open.result;
      this.store = this.db.createObjectStore(this.storeName, {
        keyPath: "id"
      });
    };
  }

  async init() {
    return new Promise((resolve, reject) => {
      this.db_open.onsuccess = async () => {
        // Start a new transaction
        this.db = this.db_open.result;
        resolve(this.db);
      };
    });
  }

  async write(data) {
    return new Promise((resolve, reject) => {
      var db = this.db;
      var tx = db.transaction(this.storeName, "readwrite");
      var store = tx.objectStore(this.storeName);
      store.put(data);
      tx.oncomplete = function() {
        resolve(data);
      };
    });
  }

  async read(id) {
    return new Promise((resolve, reject) => {
      var db = this.db;
      var tx = db.transaction(this.storeName, "readwrite");
      var store = tx.objectStore(this.storeName);
      const record = store.get(id);
      tx.oncomplete = function(event) {
        resolve(record.result);
      };
    });
  }

  async close() {
    return this.db.close();
  }
}
