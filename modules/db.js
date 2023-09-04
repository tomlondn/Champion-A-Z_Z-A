import { set, del, values, keys, get } from "./idb-src.js";

export const db = {
    // return all keys as Array
        readKeys: function(){
        return keys();
    },

    // return all values of DB as array
    readDB: function(){
        return values();
    },
    // write key - val pair in DB
    writeItem: function(key, data){
        return set(key, data);
    },
    // read key - val pair of DB
    readItem: function(key){
        return get(key);
    },
    deleteItem: function(key){
        del(key);
    },
    // write or overwrite a key-val pair in DB
    updateItem: function(newItem){
        const key = newItem.id;
        this.writeItem(key, newItem);
    }
}