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
    item.inCart = false;
    item.timesAdded = 0;
    $("#items tbody").append(row);
    
    addItemToLocalStorage(item);
}

function addItemToLocalStorage(item) {
    localStorage.setItem(item.id, JSON.stringify(item));
}
