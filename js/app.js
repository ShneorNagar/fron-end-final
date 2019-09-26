$(document).ready(function () {
    loadInCartHolders();
    loadItems();
    $(document).on("click", ".add-to-cart", function (e) {
        var row = $(this).parent().parent();
        var id = row.find(".item-id").html();
        
        var itemStr = localStorage.getItem(id);
        var item = JSON.parse(itemStr);
        
        addToInCart(item.id, true);
        
        console.log(item);
        if (!item.inCart) {
            item.timesAdded++;
            item.inCart = true;
        } 
        console.log(item);
        // Update item in localstorage
        addItemToLocalStorage(item);
    });
});

function loadItems() {
    $.getJSON("items.json", function (res) {
        res.forEach(item => {
            addItemForSale(item);
        });
    });
}

// Adds item to items table and to localstorage.
function addItemForSale(item) {

    var row = $(".templates .item-row").clone();
    var shekels = item.price * 4;
    row.find(".item-id").html(item.id);
    row.find(".item-name").html(item.name);
    row.find(".item-price").html(item.price + "$<br>" + shekels + "&#8362");
    row.find(".item-state").html(item.state);
    row.find(".item-image img").attr("src", item.imgUrl);
    $("#items tbody").append(row);
    

    addItemToLocalStorage(item);
}

function addItemToLocalStorage(item) {
    localStorage.setItem(item.id, JSON.stringify(item));
}

function loadInCartHolders(){
    var inCartIds = localStorage.getItem("inCartIds") || "[]";
    localStorage.setItem("inCartIds", inCartIds);
}

function addToInCart(id){
    var inCartIdsStr = localStorage.getItem("inCartIds") || "[]";
    var inCartIds = JSON.parse(inCartIdsStr);
    inCartIds.push(id);
    localStorage.setItem("inCartIds", JSON.stringify(inCartIds));
}