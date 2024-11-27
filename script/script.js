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

            // add pop up description
            product_element.on("click", function(){
                get_pro_des(item.id)
            })

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

function get_pro_des(pro_id) {
    $.getJSON("../data/items.json", function(data){
        const product = data.products.find(p => p.id === pro_id)

        var star_rating = $('<div></div>').addClass("star")
        for (var i = 0; i < product.rating; i++){
            star_rating.append("<i class='fas fa-star'></i>")
        }

        // add price
        var price = $("<h5></h5>").text(product.price)

        // add name
        var name = $("<h4></h4>").text(product.category)

        // add image
        var image = $('<img>').attr("src", product.image)

        // add brand
        var brand = $('<span></span>').text(product.brand)

        // add description
        var description = $("<p></p>").text(product.description)

        // assemble
        var pro_desc = $('<div></div>').addClass("pre-des").append(name, brand, star_rating, price, description)

        // cart
        var cart = $("<button></button>").addClass("normal des-cart").append("<i class='fa fa-cart-plus cart' aria-hidden='true'></i>")

        // exit
        var exit = $("<button></button>").addClass('exit').text("X")
        exit.on("click", function(){
            $(".product-pre").remove()
            $(".blank-space").remove()
        })

        var product_element = $('<div></div>').addClass("product-pre");
        product_element.append(image, pro_desc, cart, exit)

        $("body").append(product_element)
        $("body").append($("<div></div>").addClass("blank-space").on("click", function(){
            $(".product-pre").remove()
            $(".blank-space").remove()
        }))
    })
}