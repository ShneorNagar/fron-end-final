$(document).ready(function(){
    loadItemsFromLocalStorage();
    $(document).on("click", ".remove", function () {
        var row = $(this).parent().parent();
        var id = row.find(".item-id").html();
        var inCartIdsJson = localStorage.getItem("inCartIds") || "[]";
        var inCartIds = JSON.parse(inCartIdsJson);
        var index = inCartIds.findIndex(function (currId) {
            return currId == id;
        });
        if (index > -1) {
            inCartIds.splice(index, 1);
        }
        localStorage.setItem("inCartIds", JSON.stringify(inCartIds));
        loadItemsFromLocalStorage();
    });
    $(".empty-cart").on("click", function () {
        localStorage.removeItem("inCartIds");
        loadItemsFromLocalStorage();
    })
});

function loadItemsFromLocalStorage(){
    // allStorage().forEach(function(item){
    //     var jsonStr = JSON.parse(item);
    //     if(jsonStr["inCart"]){
    //         addItemForSale(jsonStr);
    //     }
    // })
    var sum = 0;
    $("#items tbody").empty();
    var inCartIdsJson = localStorage.getItem("inCartIds") || "[]";
    var inCartIds = JSON.parse(inCartIdsJson);
    inCartIds.forEach(function (id) {
        var item = JSON.parse(localStorage.getItem(id));
        sum += item.price;
        addItemForSale(item);
    });
    $(".sum").html(sum + "$");
    localStorage.setItem("sum", sum);
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
    row.find(".item-added").html(item["timesAdded"]);
    $("#items tbody").append(row);
}