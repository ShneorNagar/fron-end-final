$(document).ready(function () {
    loadItems();
    $(document).on("click", ".add-to-cart", function (e) {
        var row = $(this).parent().parent();
        var id = row.find(".item-id").html();
        
        var itemStr = localStorage.getItem(id);
        var item = JSON.parse(itemStr);
        console.log(item);
        if (!item.inCart) {
            item.timesAdded++;
            item.inCart = true;
        } 
        console.log(item);
        // Update item in localstorage
        addItemToLocalStorage(item);
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
    row.find(".item-price").html(item.price + "$<br>" + shekels + "&#8362");
    row.find(".item-state").html(item.state);
    row.find(".item-image img").attr("src", item.imgUrl);
    item.inCart = false;
    item.timesAdded = 0;
    $("#items tbody").append(row);
    
    addItemToLocalStorage(item);
}

function addItemToLocalStorage(item) {
    localStorage.setItem(item.id, JSON.stringify(item));
}

function updatePrices() {
    $("#items .item-row").each(function () {
        var id = $(this).find(".item-id").html();
        var itemStr = localStorage.getItem(id);
        var item = JSON.parse(itemStr);
        var shekelRate = localStorage.getItem("shekel");
        var shekels = item.price * shekelRate;
        $(this).find(".item-price").html(item.price + "$<br>" + shekels + "&#8362");
    });
}
