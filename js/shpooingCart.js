$(document).ready(function(){
    loadItemsFromLocalStorage();
});

function loadItemsFromLocalStorage(){
    // allStorage().forEach(function(item){
    //     var jsonStr = JSON.parse(item);
    //     if(jsonStr["inCart"]){
    //         addItemForSale(jsonStr);
    //     }
    // })
    var inCartIdsJson = localStorage.getItem("inCartIds") || "[]";
    var inCartIds = JSON.parse(inCartIdsJson);
    inCartIds.forEach(function (id) {
        var item = JSON.parse(localStorage.getItem(id));
        addItemForSale(item);
    });
}

function allStorage() {

    var values = [],
        keys = Object.keys(localStorage),
        i = keys.length;

    while ( i-- ) {
        values.push( localStorage.getItem(keys[i]) );
    }

    return values;
}

function addItemForSale(item) {
    console.log(item);
    var row = $(".templates .item-row").clone();
    var shekels = item.price * 4;
    row.find(".item-id").html(item["id"]);
    console.log(item["id"]);
    row.find(".item-name").html(item["name"]);
    console.log(item["name"]);
    row.find(".item-price").html(item["price"] + "$<br>" + shekels + "&#8362");
    console.log(item["price"]);
    row.find(".item-state").html(item["state"]);
    console.log(item["state"]);
    row.find(".item-image img").attr("src", item["imgUrl"]);
    console.log(item["imgUrl"]);
    $("#items tbody").append(row);
}