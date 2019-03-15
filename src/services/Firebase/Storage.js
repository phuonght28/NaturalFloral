const firebase = require('firebase')
require('firebase.storage')
let storage

let instance = null
export class Storage {
  static getInstance() {
    return new Storage()
  }
  constructor() {
    if (instance) {
      return instance
    }
    instance = this
    storage = firebase.storage()
  }

  uploadImage = async (uri, imageName) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    var ref = storage.ref().child("images/" + imageName);
    ref.put(blob)
      .then(function (snapshot) {
        console.log('Uploaded a blob or file!');
      })
      .catch((error) => {
        console.log('ref.put(blob) error', error)
      })
  }
}
