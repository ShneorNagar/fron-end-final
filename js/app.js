// your code here
$(document).ready(function () {
    loadItems();
    $(".add-to-cart").on("click", function (e) {
        var row = $(this).parent().parent();
        
    });
});

function loadItems() {
    $.getJSON("items.json", function (res) {
        res.forEach(item => {
            addItemForSale(item);
        });
    });
}

function addItemForSale(item) {
    var row = $(".templates .item-row").clone();
    var shekels = item.price * 4;
    row.find(".item-name").html(item.name);
    row.find(".item-price").html(item.price + "$<br>" + shekels + "&#8362");
    row.find(".item-state").html(item.state);
    row.find(".item-image img").attr("src", item.imgUrl);

    $("#items tbody").append(row);
}