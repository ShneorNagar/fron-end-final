$(document).ready(function () {
    //loadInCartHolders();
    loadItems();
    $(document).on("click", ".add-to-cart", function (e) {
        var row = $(this).parent().parent();
        var id = row.find(".item-id").html();
        
        var itemStr = localStorage.getItem(id);
        var item = JSON.parse(itemStr);
        
        addToInCart(item);
        
        console.log(item);
        
    });

    // Listen to exchange rate updates
    var source = new EventSource("/exchange/stream");
    source.addEventListener("shekel", function (e) {
        localStorage.setItem("shekel", e.data);
        updatePrices();
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
    var shekelRate = localStorage.getItem("shekel") || 4;
    var shekels = item.price * shekelRate;
    row.find(".item-id").html(item.id);
    row.find(".item-name").html(item.name);
    row.find(".item-price").html(item.price + "$<br>" + (Math.round(shekels * 100) / 100) + "&#8362");
    row.find(".item-state").html(item.state);
    row.find(".item-image img").attr("src", item.imgUrl);
    $("#items tbody").append(row);
    

    addItemToLocalStorage(item);
}

function addItemToLocalStorage(item) {
    if (!localStorage.getItem(item.id)) {
        localStorage.setItem(item.id, JSON.stringify(item));
    }
    
}

function updateItemInLocalStorage(item) {
    localStorage.setItem(item.id, JSON.stringify(item));
}

function updatePrices() {
    $("#items .item-row").each(function () {
        var id = $(this).find(".item-id").html();
        var itemStr = localStorage.getItem(id);
        var item = JSON.parse(itemStr);
        var shekelRate = localStorage.getItem("shekel");
        var shekels = item.price * shekelRate;
        $(this).find(".item-price").html(item.price + "$<br>" + (Math.round(shekels * 100) / 100) + "&#8362");
    });
}

function addToInCart(item) {
    var inCartIdsJson = localStorage.getItem("inCartIds") || "[]";
    var inCartIds = JSON.parse(inCartIdsJson);
    var index = inCartIds.findIndex(function (currId) {
        return currId === item.id;
    });
    if (index === -1) {
        inCartIds.push(item.id);
        item.timesAdded = item.timesAdded === undefined? 0 : item.timesAdded + 1;
        item.inCart = true;
    }
    localStorage.setItem("inCartIds", JSON.stringify(inCartIds));
    // Update item in localstorage
    updateItemInLocalStorage(item);
}
