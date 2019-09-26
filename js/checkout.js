$(document).ready(function () {
    $(".buy-btn").on("click", function (e) {
        var creditCard = $(".credit-card").val();
        var isValid = isValidCreditCard(creditCard);
        console.log(isValid);
        if (isValid) {
            $(".result").html("");
            var checkCardWorker = new Worker("./js/checkCard.js");
            checkCardWorker.addEventListener("message", function (e) {
                if (e.data === "VALID") {
                    $(".result").html("Purchase successful!");
                } else {
                    $(".result").html(e.data + "%");
                }
            });
            checkCardWorker.postMessage(isValid);
        } else {
            $(".result").html("Error! Credit card is invalid!");
        }
    })

});

function isValidCreditCard(creditCard) {
    var isValid = creditCard.length >= 12 && creditCard.length <= 16;
    var onlyNumbersAndDashes = !(/[^0-9-]+/.test(creditCard));
    isValid = isValid && onlyNumbersAndDashes;
    return isValid;
}