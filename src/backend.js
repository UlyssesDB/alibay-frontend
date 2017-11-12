import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyBWQ_wngBXONCUaVIGLQ7QDN7qL1TZVEXw",
    authDomain: "alibay-backend.firebaseapp.com",
    databaseURL: "https://alibay-backend.firebaseio.com",
    projectId: "alibay-backend",
    storageBucket: "alibay-backend.appspot.com",
    messagingSenderId: "517588095856"
};
firebase.initializeApp(config);

const database = firebase.database();
var provider = new firebase.auth.GoogleAuthProvider();
const storageRef = firebase.storage().ref();

export async function initializeUserIfNeeded(uid) {
    const googleUser = await firebase.auth().signInWithPopup(provider)
    const existingUser = await database.ref('users/').child(googleUser.additionalUserInfo.profile.id).once('value')
    if (existingUser.val()) {
        return existingUser.val()
    } else {
        const newUser = {
            name: googleUser.additionalUserInfo.profile.name,
            id: googleUser.additionalUserInfo.profile.id,
            email: googleUser.additionalUserInfo.profile.email,
            img: googleUser.additionalUserInfo.profile.picture
        }
        database.ref('users/').child(googleUser.additionalUserInfo.profile.id).set(newUser)
        return newUser
    }
}

export function genUID() {
    return Math.floor(Math.random() * 100000000) + Date.now()
}

export async function createListing(sellerID, name, image, price, blurb) {
    let listingID = genUID();
    const newItem = await database.ref(`items/${listingID}`).set({sellerID, name, image, price, blurb})
    return newItem
}

export async function uploadImage(e) {
  const image = await firebase.storage().ref('items/').put(e.target.files[0])
  return image.downloadURL
}

export async function getItemDescription(listingID) {
    const listing = await database.ref('items/').child(listingID).once("value")
    return {...listing.val(), listingID}
}

export async function buy(buyerID, sellerID, listingID) {
    const uid = genUID()
    const sale = database.ref(`sales/${uid}`).set({buyerID, sellerID, listingID})
    return sale    
}

export async function allItemsSold(sellerID) {
    const itemsObj = await database.ref('items').once("value")
    const items = itemsObj.val()
    const salesObj = await database.ref('sales').once("value")
    const sales = salesObj.val()
    const salesArray = Object.keys(sales).map(i => (sales[i])).filter(s => s.sellerID === sellerID).map(item=>item.listingID)
    const keys = Object.keys(items).map(i => ({...items[i], listingID: i})).filter((s) => {
        let found = false
        for (var i = 0; i < salesArray.length; i++) {
            if (s.listingID === salesArray[i]) {
                found = true
            }
        }
        return found
    })
    return keys
}

export async function allItemsBought(buyerID) {
    const itemsObj = await database.ref('items').once("value")
    const items = itemsObj.val()
    const salesObj = await database.ref('sales').once("value")
    const sales = salesObj.val()
    const salesArray = Object.keys(sales).map(i => (sales[i])).filter(s => s.buyerID === buyerID).map(item=>item.listingID)
    const keys = Object.keys(items).map(i => ({...items[i], listingID: i})).filter((s) => {
        let found = false
        for (var i = 0; i < salesArray.length; i++) {
            if (s.listingID === salesArray[i]) {
                found = true
            }
        }
        return found
    })
    return keys
}

export async function getItemsForSale(sellerID) {
    const itemsObj = await database.ref('items').once("value")
    const items = itemsObj.val()
    const keys = Object.keys(items).map(i => ({...items[i], listingID: i}))
    return keys.filter(s => s.sellerID === sellerID)
}

export async function allListings() {
    const itemsObj = await database.ref('items').once("value")
    const items = itemsObj.val()
    if(!items) return 
    const keys = Object.keys(items).map(i => ({...items[i], listingID: i}))
    return keys
}

export async function searchForListings(searchTerm) {
    const itemsObj = await database.ref('items').once("value")
    const items = itemsObj.val()
    const keys = Object.keys(items)
        .map(i => ({...items[i], listingID: i}))
        .filter(a => a.blurb.includes(searchTerm) || a.name.includes(searchTerm))
    return keys || []
}
