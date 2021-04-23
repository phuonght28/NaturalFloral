import moment from 'moment';
import LANGUAGE from '../constants/LanguageFrench'

export const Firebase_API = {
  apiKey: "AIzaSyDkm9W_7FOkWziBaNi7jJdiuXpqkL-EdHE",
  authDomain: "my-test-4ef11.firebaseapp.com",
  projectId: "my-test-4ef11",
  databaseURL: "https://my-test-4ef11.firebaseio.com",
  storageBucket: "my-test-4ef11.appspot.com",
  messagingSenderId: "323036969672"
}
export const SendBird_API = '800349B4-D01F-4C5C-8691-DE9F42288B8D'


export const uuid4 = () => {
  let d = new Date().getTime();
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = ((d + Math.random() * 16) % 16) | 0;
    d = Math.floor(d / 16);
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
};
export const isEmpty = value => {
  return value === null || value === undefined || value.length === 0
};

export const isBlank = value => {
  if (value !== null && value !== undefined) {
    return value.trim().length == 0
  }
  else return false
};


export const getSum = (total, num) => {
  return total + Math.round(num)
}
export const errorAlert = (message, FROM = '', reload = true, ) => {
  //alert(message);
  console.warn(`* ${FROM} ${message}`)
  //redirectToIndex(message);
};

export const redirectToIndex = message => {
  if (message) {
    return message
  }
  return
};

/** 
 * 
 * 
    const datetime = moment(new Date())
    const timestamp = returnToTimestamp(datetime)
    //console.log(datetime)
    //console.log(timestamp)
    //console.log(returnToDateTime(timestamp))

*/

export const returnToDateTime = timestamp => {
  return moment(timestamp).format("YYYY-MM-DD hh:mm:ss");
}

export const returnToTimestamp = datetime => {
  return Date.parse(datetime)
}


export const StoreGlobal = (obj) => {
  if (obj.type === 'set') {
    globalState[obj.key] = obj.value;
    return true;
  }
  else if (obj.type === 'get') {
    return globalState[obj.key];
  }
  else {
    return null;
  }
}

export const sortByStatus = (list) => {
  list.sort(function (vote1, vote2) {
    if (vote1.connectionStatus > vote2.connectionStatus) return -1;
    if (vote1.connectionStatus < vote2.connectionStatus) return 1;
    if (vote1.displayName > vote2.displayName) return 1;
    if (vote1.displayName < vote2.displayName) return -1;
  })
  return list
}

export const removeCurrentUser = (userList, currentUser) => {
  let element
  if (currentUser.userId) {
    element = userList.find((user) => user.userId === currentUser.userId)
  }
  else if (currentUser.uid) {
    element = userList.find((user) => user.uid === currentUser.uid)
  }
  else {
    return false
  }
  const index = userList.indexOf(element)
  userList.splice(index, 1);
  return userList
}



export const HandleErrors = (errorCode) => {
  let errorMessage = ''
  switch (errorCode) {
    case 'auth/email-already-in-use':
      errorMessage = LANGUAGE.Email_Already_In_Use
      break
    case 'auth/invalid-email':
      errorMessage = LANGUAGE.Invalid_Email
      break
    case 'auth/weak-password':
      errorMessage = LANGUAGE.Weak_Password
      break
    default:
      errorMessage = errorCode
  }
  return (errorMessage)
}