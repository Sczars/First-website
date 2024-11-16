$(document).ready(function(){
    $.getJSON("../data/items.json", function(data){
        get_product(data, 0, 7, $("#se-product-1 .pro-container"))
        get_product(data, 8, 15, $("#se-product-2 .pro-container"))
    })

    $.getJSON("../data/feature.json", function(data, des) {
        get_feature_des(data, $("#feature"))
    }).then(function(){
        $("#fe-de-1").show()
        $("#feature #1").addClass("fe-active")
    })

})

function get_product(data, start, end, des) {
    $.each(data.products, function(index, item) {
        if (index >= start && index <= end) {
            //add star
        var star_rating = $('<div></div>').addClass("star")
        for (var i = 0; i < item.rating; i++){
            star_rating.append("<i class='fas fa-star'></i>")
        }

        // add price
        var price = $("<h4></h4>").text(item.price)

        // add name
        var name = $("<h5></h5>").text(item.category)

        // add image
        var image = $('<img>').attr("src", item.image)

        // add brand
        var brand = $('<span></span>').text(item.brand)

        // add cart
        var cart = $('<a></a>').attr('href', '#').append("<i class='fa fa-cart-plus cart' aria-hidden='true'></i>")

        // assemble
        var desc = $('<div></div>').addClass("des").append(brand, name, star_rating, price)

        var product_element = $('<div></div>').addClass("product");
        product_element.append(image, desc, cart)

        des.append(product_element)
        }
    })
}

async function get_feature_des(data, des) {
    $.each(data, function(index, fe){
        // add image
        var image = $('<img>').attr("src", fe.image)

        // add feature name
        var name = $("<h6></h6>").text(fe.name)

        // assemble
        var desc = $('<div></div>').attr("id", String(index)).addClass("fe-box").append(image, name)

        des.append(desc)

        var text = $('<p></p>').text(fe.description)

        var desc_sec = $('<section></section>').attr("id", "fe-de-" + String(index)).addClass('se-p1 fe-de').hide().append(text)

        $(".fe-box").hover(function(){
            $(".fe-de").hide()
            $("#fe-de-" + $(this).attr("id")).show()
            $('.fe-box').removeClass('fe-active')
            $(this).addClass('fe-active')
        })

        $(desc_sec).insertAfter('#feature')
    })
}