

// THIS IS THE MOCK UI BACKEND

export function genUID() {
    return Math.floor(Math.random() * 100000000)
}

let users = {};
let items = {
    item1: {name: 'boat', price: '100', blurb: 'testtesttest', rating: '5', uid: 'item1', sellerId: 'nick', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Lifeboat.17-31.underway.arp.jpg/1024px-Lifeboat.17-31.underway.arp.jpg'},
    item2: {name: 'freighter', price: '200', blurb: 'testtesttest', rating: '3', uid: 'item2', sellerId: 'nick', img: 'http://images.archant.co.uk/polopoly_fs/1.4091556.1432825276!/image/image.jpg_gen/derivatives/landscape_630/image.jpg'},
    item3: {name: 'warship', price: '300', blurb: 'testtesttest', rating: '1', uid: 'item3', sellerId: 'nick', img: 'https://www.cornwalls.co.uk/sites/default/files/photos/penlee-lifeboat.jpg'}
};
let itemsForSale = ['item1', 'item2', 'item3'];
let itemsBought = {};
let itemsSold = {};


/*
initializeUserIfNeeded adds the UID to our global state unless it's already there
parameter: [uid] the UID of the user.
returns: undefined
*/
export function initializeUserIfNeeded(uid) {
    // If the user is not in our global itemsBought variable, add him
    if(!(uid in itemsBought)) itemsBought[uid] = [];
    if(!(uid in itemsSold)) itemsSold[uid] = [];
}

/* 
createListing adds a new listing to our global state.
    parameters: 
      [sellerID] The ID of the seller
      [price] The price of the item
      [blurb] A blurb describing the item
    returns: the ID of the new listing
*/
export function createListing(sellerID, price, blurb) {
    let listingID = "item" + genUID();
    items[listingID] = {sellerID: sellerID, price: price, blurb: blurb, uid: listingID};
    itemsForSale.push(listingID);
    return listingID;
}

/* 
getItemDescription returns the description of a listing
    parameter: [listingID] The ID of the listing
    returns: an object that contains the price and the blurb
*/
export function getItemDescription(listingID) {
    return items[listingID];
}

/* 
buy changes the global state.
Another buyer will not be able to purchase that listing
The listing will no longer appear in search results
The buyer will see the listing in his history of purchases
The seller will see the listing in his history of items sold
    parameters: 
     [buyerID] The ID of buyer
     [sellerID] The ID of seller
     [listingID] The ID of listing
    returns: undefined
*/
export function buy(buyerID, sellerID, listingID) {
    itemsBought[buyerID].push(listingID)
    itemsSold[sellerID].push(listingID)

    // Finding the index of the listingID within the itemsForSale array
    let index = itemsForSale.indexOf(listingID)
    itemsForSale.splice(index, 1)
    // -end- 
}


/* 
allItemsSold returns the IDs of all the items sold by a seller
    parameter: [sellerID] The ID of the seller
    returns: an array of listing IDs
*/
export function allItemsSold(sellerID) {
    return itemsSold[sellerID]
}

/*
allItemsBought returns the IDs of all the items bought by a buyer
    parameter: [buyerID] The ID of the buyer
    returns: an array of listing IDs
*/
export function allItemsBought(buyerID) {
    return itemsBought[buyerID]
}

/*
allListings returns the IDs of all the listings currently on the market
Once an item is sold, it will not be returned by allListings
    returns: an array of listing IDs
*/
export function allListings() {
    return itemsForSale.map(itemId => items[itemId])
}

/*
searchForListings returns the IDs of all the listings currently on the market
Once an item is sold, it will not be returned by searchForListings
    parameter: [searchTerm] The search string matching listing descriptions
    returns: an array of listing IDs
*/
export function searchForListings(searchTerm) {
    let searchResults = [];
    itemsForSale.forEach(listingID => {
        if (items[listingID].blurb.search(searchTerm)>-1) {
            searchResults.push(listingID)}})
    return searchResults
}