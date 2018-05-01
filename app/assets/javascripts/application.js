// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require rails-ujs
//= require turbolinks
//= require_tree .


// LOGIN AND CREATE ACCOUNT STUFF
  $(function() {
    setTimeout(function(){
      $('.flash-notice').slideUp(500);
    }, 4000);
  });

  $(document).on("click", "#new-customer-next", function(){
    $("#new-customer-part-1").css('display', 'none');
    $("#new-customer-header h2").html("Create Account &mdash; Part 2")
    $("#new-customer-header").append("<p id='new-customer-back'>&lt;&mdash; Back</p>")
    $("#new-customer-part-2").css('display', 'block');
  });

  $(document).on("click", "#new-customer-back", function(){
    $("#new-customer-part-2").css('display', 'none');
    $("#new-customer-header h2").html("Create Account &mdash; Part 1")
    $("#new-customer-back").remove()
    $("#new-customer-part-1").css('display', 'block');
  })
// END OF LOGIN STUFF


  // GLOBAL VARIABLES
  //
  //
  var topNavCounter = 0;
  var currentGarment = {name:"", itemTypeId:""};
  var currentAltType = "";
  var currentAlterations = [];
  var currentAlteration = "";
  var currentAltName = [];
  var currentAltPrice = [];
  var quantity = 1;
  var currentPrep = {name: "", instructions: "", gif: "", jpg: ""}
  var currentItem = "";
  var currentItems = [];
  var itemPrice = 0;
  var items = [];
  var totalPrice = 0;
  var counter = 0;
  var orderNotes = "";
  var data;

  //
  //
  // END OF GLOBAL VARIABLES

  // EDIT ACCOUNT WHEN YOU HAVE A BASKET
  //
  //
  $(document).on("click", ".edit-account-link", function(event){
    if (items.length > 0){
      localStorage.setItem("items", JSON.stringify(items));
    }
  })
  //
  //
  // END EDIT ACCOUNT WHEN YOU HAVE A BASKET




  // GARMENT SELECTION PAGE
  //
  //


  $(document).on("click", ".garment-card", function(){
    currentGarment.name = $(this).find("h3").html()
    currentGarment.itemTypeId = parseInt($(this).attr('data-id'));
    $("#garment-select").toggleClass('hidden');
    $("#alteration-select").toggleClass('hidden');
    if(currentGarment.name == "suit jacket"){
      $(".suit-jacket-alteration").toggleClass('hidden');
    } else {
    $("." + currentGarment.name +
      "-alteration").toggleClass('hidden');
    }
    $("#header1").toggleClass('hidden');
    $("#header2").toggleClass('hidden');
    if (currentAlterations.length < 1){
        $("#add-alt-to-basket").css('background-color', 'rgba(0,0,53,.5)');
      }
    $(window).scrollTop(0);
  })

  //
  //
  // END OF GARMENT SELECTION PAGE




  // ALTERATION SELECTION PAGE
  //
  //

  $(document).on("click", ".alteration-name-price", function(){
    if ($(this).hasClass("selected")){
      $(this).parent().find('.prep-button').find('p').css('color', '#000033');
      currentAltType = $(this).attr('data-alt-type');
      $("[data-alt-type*=" + currentAltType + "]").not($(this)).parent().css({
        pointerEvents: 'auto',
        opacity: '1'
      });
      currentAlterations.pop()
      itemPrice = 0
      $(this).css('background-color', 'white');
      $(this).toggleClass('selected');
      if (currentAlterations.length < 1){
        $("#add-alt-to-basket").css('background-color', 'rgba(0,0,53,.5)');
        $("#prep-and-quantity").slideUp('slow');
        quantity = 1;
        $("#quantity-input input").val(1);
      }

    } else {
      $(this).parent().find('.prep-button').find('p').css('color', '#de0421');
      currentAltType = $(this).attr('data-alt-type');
      $("[data-alt-type*=" + currentAltType + "]").not($(this)).parent().css({
        pointerEvents: 'none',
        opacity: '.5'
      });
      currentAltName = $(this).find("p").html();
      currentAltPrice = $(this).find("span").html();
      currentAltId = parseInt($(this).attr('data-id'));
      $(this).toggleClass('selected');
      $(this).css('background-color', 'lightgray');
      currentAlteration = {alteration_id:currentAltId, name:currentAltName, price:currentAltPrice}
      currentAlterations.push(currentAlteration)
      $("#add-alt-to-basket").css('background-color', 'rgb(0,0,53)');
      var integerPrice = parseFloat(currentAltPrice)
      itemPrice = itemPrice + integerPrice

      if (currentGarment.name == "pants"){
        $("#sample-name").html("pair of " + currentGarment.name)
      } else {
      $("#sample-name").html(currentGarment.name)
      }

      if (currentGarment.name != "pants"){
        $(".quantity-name").html(currentGarment.name + "s")
      } else {
        $(".quantity-name").html(currentGarment.name)
      }

      $(".garment-name").html(currentGarment.name)

      $("#prep-and-quantity").slideDown('slow');
    }
  });



  $(document).on("click", ".prep-button", function(){
    if ($("#prep-popup").hasClass('hidden')){
      currentPrep.name = $(this).prev().find("p").html()
      popup();
      $("#prep-alt-name").html(currentPrep.name);
      $("#prep-instructions").html(currentPrep.instructions);
      $("#prep-gif").attr({
        src: currentPrep.gif,
        alt: currentPrep.name
      });
      $("#prep-jpg").attr({
        src: currentPrep.jpg,
        alt: currentPrep.name
      });
    $("#overlay, #prep-popup").fadeToggle();

    } else {

    }
  })

  $(document).on("click", "#prep-exit", function(){
    currentPrep = {name: "", instructions: "", gif: "", jpg: ""}
    popup();
      $("#prep-alt-name").html(currentPrep.name);
      $("#prep-instructions").html(currentPrep.instructions);
      $("#prep-gif").attr({
        src: currentPrep.gif,
        alt: currentPrep.name
      });
      $("#prep-jpg").attr({
        src: currentPrep.jpg,
        alt: currentPrep.name
      });
    $("#overlay, #prep-popup").fadeToggle();
  });


  //
  //
  // END OF ALTERATION SELECTION PAGE




  // ALTERATION BACK BUTTON
  //
  //
  $(document).on("click", "#alteration-back-button", function(){
    if(currentGarment.name == "suit jacket"){
      $(".suit-jacket-alteration").toggleClass('hidden');
    } else {
      $("." + currentGarment.name + "-alteration").toggleClass('hidden');
    }
    $("#alteration-select").toggleClass('hidden');
    $("#garment-select").toggleClass('hidden');
    $(".alteration-name-price").css('background-color', 'white');
    $("#prep-and-quantity").hide();

    if(currentAlteration != ""){
      $("[data-alt-type*=" + currentAltType + "]").not($(this)).parent().css({
        pointerEvents: 'auto',
        opacity: '1'
      });
    }


    $('.prep-button').find('p').css('color', '#000033');

    currentAltType = "";
    currentAlterations = [];
    currentGarment.name = "";
    quantity = 1;
    $("#quantity-input input").val(1);
    $("#prep-and-quantity").hide();


    $(".alteration-name-price").removeClass("selected")

    $("#header1").toggleClass('hidden');
    $("#header2").toggleClass('hidden');
  });
  //
  //
  // END ALTERATION BACK BUTTON



  // QUANTITY BUTTONS
  //
  //
    $(document).on("click", "#plus", function(){
      quantity = quantity + 1
      $("#quantity-input input").val(quantity)
      if(quantity > 1 && currentGarment.name != "pants"){
        $(".garment-name").html(currentGarment.name + "s")
        $(".quantity-name").html(currentGarment.name + "s")
      }
    })

    $(document).on("click", "#minus", function(){
      if(quantity > 2){
        quantity = quantity - 1
        $("#quantity-input input").val(quantity)
      } else if (quantity == 2 && currentGarment.name != "pants"){
        $(".garment-name").html(currentGarment.name)
        $(".quantity-name").html(currentGarment.name + "s")
        quantity = quantity - 1
        $("#quantity-input input").val(quantity)
      }
    })
  //
  //
  // END QUANTITY BUTTONS



  // ADD ALTERATIONS BUTTON
  //
  //
  $(document).on("click", "#add-alt-to-basket", function(){
    $(window).scrollTop(0);
    // make basket appear
    if (currentAlterations.length < 1){

    } else {

      if(items.length === 0){
        $("#basket").toggleClass('hidden');
      }
      //

      for(var i = 0; i < quantity; i++) {
        currentItem = {id: counter, item_type_id:currentGarment.itemTypeId, garment: currentGarment.name, alterations: currentAlterations, total: itemPrice, notes: ""}
        currentItems.push(currentItem)
        items.push(currentItem)
        localStorage.setItem("items", JSON.stringify(items));
        counter = counter + 1

      };



      // establish item details
      $.each(currentItems, function(i, item){
        $("#basket-items").append("<div id=" + item.id + " class='basket-item'><p class='basket-garment'><span class='float-left'>" + item.garment + "</span><span class='float-right'><span id='basket-edit'>edit</span> | <span id='basket-delete'>delete</span></span></p></div>")

        $.each(item.alterations, function(i, alteration){
          $(".basket-item:last").append("<p class='basket-alteration clear-float'><span class='float-left'>" + alteration.name + "</span><span class='float-right'>$" + alteration.price + "</span></p>")
        var integerPrice = parseFloat(alteration.price)
        totalPrice = totalPrice + integerPrice
        });
      });
      //

      // add total price
      $("#total-price").html(totalPrice.toFixed(2))
      //

      // hide alteration cards
      if(currentGarment.name == "suit jacket"){
        $(".suit-jacket-alteration").toggleClass('hidden');
      } else {
        $("." + currentGarment.name + "-alteration").toggleClass('hidden');
      };
      //

      // return alterations cards section to original styles
      $("[data-alt-type*=" + currentAltType + "]").not($(this)).parent().css({
        pointerEvents: 'auto',
        opacity: '1'
      });
      $(".alteration-name-price").css('background-color', 'white');
      $(".alteration-name-price").removeClass("selected")
      $('.prep-button').find('p').css('color', '#000033');
      $("#quantity-input input").val(1);
      $("#prep-and-quantity").hide();
      //

      // return view to garment select
      $("#alteration-select").toggleClass('hidden');
      $("#garment-select").toggleClass('hidden');
      //

      // empty current alterations array
      currentAlterations = [];
      currentGarment.name = "";
      currentGarment.name.itemTypeId = "";
      itemPrice = 0;
      currentAltType = "";
      currentAlteration = "";
      currentItems = [];
      quantity = 1;
      //

      // switch headers
      $("#header1").toggleClass('hidden');
      $("#header2").toggleClass('hidden');
    //
    };
  });

  //
  //
  // END OF ADD ALTERATION BUTTON



  // BASKET
  //
  //

  // edit garment button
  $(document).on('click', '#basket-edit', function(){
    var currentDiv = $(this).parent().parent().parent()
    console.log(currentDiv)
    var basketIndex = currentDiv.attr('id')
    console.log(basketIndex)
    $.each(items, function(i, item){
      if(item.id == basketIndex){
        currentItem = item
      }
    });
    var currentIndex = items.indexOf(currentItem)
    console.log(currentIndex)
  });
  //


  // delete garment button
  $(document).on('click', '#basket-delete', function(){
    // save current div to local variable
    var currentDiv = $(this).parent().parent().parent()

    // find id of current div
    var basketIndex = currentDiv.attr('id')

    // use id of current div to find id of item
    $.each(items, function(i, item){
      if(item.id == basketIndex){
        currentItem = item
      }
    });

    // use id of item to find index of item
    var currentIndex = items.indexOf(currentItem)

    // delete current div, subtract price from total, and remove current item from items array
    currentDiv.remove()
    totalPrice = totalPrice - currentItem.total
    $("#total-price").html(totalPrice.toFixed(2))
    items.splice(currentIndex,1)
    localStorage.setItem("items", JSON.stringify(items));
    if (items.length == 0){
      $("#basket").toggleClass('hidden');
    }
  });


  // checkout button
    $(document).on('click', "#checkout-button", function(){
      $(window).scrollTop(0);
      // hide garment and alteration divs, show review page
      $("main").toggleClass('hidden');
      $("#basket").toggleClass('hidden');
      $("#review-order").toggleClass('hidden');

      // show proper header for review page
      if(currentGarment.name == ""){
        $("#header1").toggleClass('hidden');
      } else {
        $("#header2").toggleClass('hidden');
      };
      $("#header3").toggleClass('hidden');

      // display items in basket
      $.each(items, function(i, item){
        $("#review-order-items").append("<div id=" + item.id + " class='review-item'><p class='review-garment'><span class='float-left'>" + item.garment + "</span><span class='float-right'><span id='review-edit'>edit</span> | <span id='review-delete'>delete</span></span></p></div>")

        $.each(item.alterations, function(i, alteration){
          $(".review-item:last").append("<p class='review-alteration clear-float'><span class='float-left'>" + alteration.name + "</span><span class='float-right'>$" + alteration.price + "</span></p>")
        });
      });

      // add total price
      $("#review-total-price").html("$" + (totalPrice + 6).toFixed(2))
      $("#form-amount").val(totalPrice + 6)

    });
  // end of checkout button

  //
  //
  // END OF BASKET


  // ORDER REVIEW PAGE
  //
  //

  // Not done? Add another garment button
  $(document).on('click', "#add-garment", function(){
    $("#review-order").toggleClass('hidden');
    $("#basket").toggleClass("hidden");
    $("main").toggleClass('hidden');

    $("#review-order-items").html("");

    // show proper header for garment page
    if(currentGarment.name == ""){
      $("#header1").toggleClass('hidden');
    } else {
      $("#header2").toggleClass('hidden');
    };

    $("#header3").toggleClass('hidden');
  });


  // review-delete button
  $(document).on('click', '#review-delete', function(){
    // save current div to local variable
    var currentDiv = $(this).parent().parent().parent()

    // find id of current div
    var basketIndex = currentDiv.attr('id')

    // // use id of current div to find id of item
    $.each(items, function(i, item){
      if(item.id == basketIndex){
        currentItem = item
      }
    });

    // // use id of item to find index of item
    var currentIndex = items.indexOf(currentItem)

    // // delete current div
    currentDiv.remove()

    // remove same item from basket
    $("#basket #" + basketIndex).remove()

    // subtract price from total and update total in basket
    totalPrice = totalPrice - currentItem.total
    $("#total-price").html(totalPrice)

    // remove current item from items array
    $("#review-total-price").html(totalPrice.toFixed(2))
    items.splice(currentIndex,1)
    localStorage.setItem("items", JSON.stringify(items));

    // hide review page and basket, return to garments page
    if (items.length === 0){
      $("main").toggleClass('hidden');
      $("#review-order").toggleClass('hidden');
      // $("#basket").toggleClass('hidden');

      // show proper header for garment page
      if(currentGarment.name == ""){
        $("#header1").toggleClass('hidden');
      } else {
        $("#header2").toggleClass('hidden');
      };
      $("#header3").toggleClass('hidden');
    }
  });

  // add notes button
  $(document).on('click', "#review-notes", function(){
    $("#review-notes-textarea").toggleClass('hidden');
  });

  // promo code section

   $(document).on('click', "#promo-button", function(){
    // form promo code
    var customerFirstName = $("#customer-first-name").html().toUpperCase();
    var promocode = customerFirstName + "PROMO"

    // promo button actions

    if($("#promo-input").val() == promocode){
      // adjust price
      totalPrice = 1.00
      console.log(totalPrice)
      $("#review-total-price").html("$" + (totalPrice).toFixed(2))
      $("#form-amount").val(totalPrice)

      // style
      // alert("Success! 10% promo applied to your order")
      $("#promo-button").toggleClass('hidden');
      $("#promo-input").val("SUCCESS! PROMO APPLIED :)")
      $("#promo-input").animate({width: 328}, {duration: 1000});
    }
    else {
      alert("Promo code not recognized. Please check and try again.")
    }
   })

  // end promo code section


  // payment
  $(document).on('click', "#proceed-to-pay", function(){

    var customerFirstName = $("#customer-first-name").html();
    var customerLastName = $("#customer-last-name").html();
    var customerPhone = $("#customer-phone").html();
    var customerEmail = $("#customer-email").html();
    var customerStreet = $("#customer-street").html();
    var customerStreetTwo = $("#customer-street-two").html();
    var customerCity = $("#customer-city").html();
    var customerState = $("#customer-state").html();
    var customerZip = $("#customer-zip").html();

    data = {
      "order": {
        "requester_notes": orderNotes,
        "items": items,
        "customer": {
          "first_name": customerFirstName,
          "last_name": customerLastName,
          "phone": customerPhone,
          "email": customerEmail,
          "street": customerStreet,
          "street_two": customerStreetTwo,
          "city": customerCity,
          "state_province": customerState,
          "zip_code": customerZip
        }
      }
    };

    localStorage.setItem("data", JSON.stringify(data));

  })


  //
  //
  // END ORDER REVIEW PAGE


  // POST REQUEST TO AIR TAILOR API
  //
  //







  // AIR TAILOR API KEY: O7iq7W0Kcg8MynMp3aaHzgtt

  // QwZL2CvAUf8V1vYHZIc2Zgtt


  //  HOW TO PIN POP-UPS

  var gif1 = "https://s3.us-east-2.amazonaws.com/airtailor-images/pin-gifs/1.gif"
  var gif2 = "https://s3.us-east-2.amazonaws.com/airtailor-images/pin-gifs/2.gif"
  var gif3 = "https://s3.us-east-2.amazonaws.com/airtailor-images/pin-gifs/3.gif"
  var gif4 = "https://s3.us-east-2.amazonaws.com/airtailor-images/pin-gifs/4.gif"
  var gif5 = "https://s3.us-east-2.amazonaws.com/airtailor-images/pin-gifs/5.gif"
  var gif6 = "https://s3.us-east-2.amazonaws.com/airtailor-images/pin-gifs/6.gif"
  var gif7 = "https://s3.us-east-2.amazonaws.com/airtailor-images/pin-gifs/7.gif"
  var gif8 = "https://s3.us-east-2.amazonaws.com/airtailor-images/pin-gifs/8.gif"
  var gif9 = "https://s3.us-east-2.amazonaws.com/airtailor-images/pin-gifs/9.gif"
  var gif10 = "https://s3.us-east-2.amazonaws.com/airtailor-images/pin-gifs/10.gif"
  var gif11 = "https://s3.us-east-2.amazonaws.com/airtailor-images/pin-gifs/11.gif"
  var gif12 = "https://s3.us-east-2.amazonaws.com/airtailor-images/pin-gifs/12.gif"
  var gif13 = "https://s3.us-east-2.amazonaws.com/airtailor-images/pin-gifs/13.gif"
  var gif14 = "https://s3.us-east-2.amazonaws.com/airtailor-images/pin-gifs/14.gif"
  var gif15 = "https://s3.us-east-2.amazonaws.com/airtailor-images/pin-gifs/15.gif"
  var gif16 = "https://s3.us-east-2.amazonaws.com/airtailor-images/pin-gifs/16.gif"

  var jpg1 = "https://s3.us-east-2.amazonaws.com/airtailor-images/new_how_to_pin/1.jpg"
  var jpg3 = "https://s3.us-east-2.amazonaws.com/airtailor-images/new_how_to_pin/3.jpg"
  var jpg4 = "https://s3.us-east-2.amazonaws.com/airtailor-images/new_how_to_pin/4.jpg"
  var jpg5 = "https://s3.us-east-2.amazonaws.com/airtailor-images/new_how_to_pin/5.jpg"
  var jpg6 = "https://s3.us-east-2.amazonaws.com/airtailor-images/new_how_to_pin/6.jpg"
  var jpg7 = "https://s3.us-east-2.amazonaws.com/airtailor-images/new_how_to_pin/7.jpg"
  var jpg8 = "https://s3.us-east-2.amazonaws.com/airtailor-images/new_how_to_pin/8.jpg"
  var jpg9 = "https://s3.us-east-2.amazonaws.com/airtailor-images/new_how_to_pin/9.jpg"
  var jpg10 = "https://s3.us-east-2.amazonaws.com/airtailor-images/new_how_to_pin/10.jpg"
  var jpg11 = "https://s3.us-east-2.amazonaws.com/airtailor-images/new_how_to_pin/11.jpg"
  var jpg12 = "https://s3.us-east-2.amazonaws.com/airtailor-images/new_how_to_pin/12.jpg"
  var jpg13 = "https://s3.us-east-2.amazonaws.com/airtailor-images/new_how_to_pin/13.jpg"
  var jpg14 = "https://s3.us-east-2.amazonaws.com/airtailor-images/new_how_to_pin/14.jpg"
  var jpg15 = "https://s3.us-east-2.amazonaws.com/airtailor-images/new_how_to_pin/15.jpg"
  var jpg19 = "https://s3.us-east-2.amazonaws.com/airtailor-images/new_how_to_pin/19.jpg"
  var jpg20 = "https://s3.us-east-2.amazonaws.com/airtailor-images/new_how_to_pin/20.jpg"
  var jpg21 = "https://s3.us-east-2.amazonaws.com/airtailor-images/new_how_to_pin/21.jpg"
  var jpg22 = "https://s3.us-east-2.amazonaws.com/airtailor-images/new_how_to_pin/22.jpg"
  var jpg26 = "https://s3.us-east-2.amazonaws.com/airtailor-images/new_how_to_pin/26.jpg"
  var jpg27 = "https://s3.us-east-2.amazonaws.com/airtailor-images/new_how_to_pin/27.jpg"
  var jpg29 = "https://s3.us-east-2.amazonaws.com/airtailor-images/new_how_to_pin/28.jpg"
  var jpg30 = "https://s3.us-east-2.amazonaws.com/airtailor-images/new_how_to_pin/30.jpg"
  var jpg31 = "https://s3.us-east-2.amazonaws.com/airtailor-images/new_how_to_pin/31.jpg"
  var jpg32 = "https://s3.us-east-2.amazonaws.com/airtailor-images/new_how_to_pin/32.jpg"
  var jpg33 = "https://s3.us-east-2.amazonaws.com/airtailor-images/new_how_to_pin/33.jpg"
  var jpg35 = "https://s3.us-east-2.amazonaws.com/airtailor-images/new_how_to_pin/35.jpg"
  var jpg36 = "https://s3.us-east-2.amazonaws.com/airtailor-images/new_how_to_pin/36.jpg"
  var jpg37 = "https://s3.us-east-2.amazonaws.com/airtailor-images/new_how_to_pin/37.jpg"
  var jpg38 = "https://s3.us-east-2.amazonaws.com/airtailor-images/new_how_to_pin/38.jpg"
  var jpg39 = "https://s3.us-east-2.amazonaws.com/airtailor-images/new_how_to_pin/39.jpg"
  var jpg40 = "https://s3.us-east-2.amazonaws.com/airtailor-images/new_how_to_pin/40.jpg"
  var jpg41 = "https://s3.us-east-2.amazonaws.com/airtailor-images/new_how_to_pin/41.jpg"
  var jpg42 = "https://s3.us-east-2.amazonaws.com/airtailor-images/new_how_to_pin/42.jpg"
  var jpg43 = "https://s3.us-east-2.amazonaws.com/airtailor-images/new_how_to_pin/43.jpg"
  var jpg44 = "https://s3.us-east-2.amazonaws.com/airtailor-images/new_how_to_pin/44.jpg"

  // Shorten Dress
  var instructions1 = "Place safety pin at desired dress length. Use multiple pins to outline a new shape, or one pin to maintain the current shape. If multiple layers, just mark outer layer."

  // Shorten Sleeve
  var instructions2 = "Place safety pin at desired sleeve length. Pin both sleeves for different lengths."

  // Shorten Shoulder Straps
  var instructions3 = "Pinch excess fabric on shoulder straps to desired fit and safety pin the fabric together. Make sure bust and waist still fit comfortably."

  // Shorten Necktie
  var instructions4 = "At the desired shortening location, place a safety on the back of the skinny end of the tie."

  // Slim Necktie
  var instructions5 = "Good news! No prep involved on this service. Just make sure that this is the width that you would like the widest part of your tie slimmed to."

  // Cuffed Hem
  var instructions6 = "Place safety pin at desired pant length. Pin both legs for different lengths. Even if you need to pin on the cuff to mark the desired length, the look and size of the original cuff will remain the same."

  // Original Hem
  var instructions7 = "Place safety pin at desired pant length. Pin both legs for different lengths. An Original Hem is different from a Regular Hem because it will maintain the exact hem at the bottom of the pant as it was originally produced after the pants are shortened. This can be used for frayed or raw edges, or to retain the original stitching from the manufacturer. This type of hem is most commonly used for premium denim."

  // Regular Hem
  var instructions8 = "Place safety pin at desired pant length. Pin both legs for different lengths."

  // Taper Pants
  var instructions9 = "On the inside of one pant leg, safety pin the fabric together in a line along the leg to desired fit. Leave enough room to put on/take off the pants."

  // Shorten Shirt Hem
  var instructions10 = "Place safety pin at desired shirt length. Use multiple pins to outline a new shape, or one pin to maintain the current shape."

  // Take In Shoulders
  var instructions11 = "Place a safety pin at desired shoulder seam area. Be mindful of final sleeve length if also shortening sleeves."

  // Shorten Skirt Single Layer
  var instructions12 = "Place safety pin at desired skirt length. Use multiple pins to outline a new shape, or one pin to maintain the current shape."

  // Shorten Skirt Multiple Layer
  var instructions13 = "Place safety pin at desired skirt length. Use multiple pins to outline a new shape, or one pin to maintain the current shape. If multiple layers, just mark outer layer."

  // Shorten Jacket Length
  var instructions14 = "Place safety pin at desired jacket length. Use multiple pins to outline a new shape, or one pin to maintain the current shape."

  var popup = function() {
    if (currentGarment.name === "pants"){
      switch (currentPrep.name) {
        case 'Shorten Pant Length - Regular Hem':currentPrep = {name:currentPrep.name, instructions:instructions8, gif:gif8, jpg:jpg1};
        break;
        case 'Shorten Pant Length - Original Hem':currentPrep = {name:currentPrep.name, instructions:instructions7, gif:gif2, jpg:jpg1};
        break;
        case 'Shorten Pant Length - Cuffed Hem':currentPrep = {name:currentPrep.name, instructions:instructions6, gif:gif1, jpg:jpg3};
        break;
        case 'Slim Pants Legs (Taper) - Full Leg':currentPrep = {name:currentPrep.name, instructions:instructions9, gif:gif9, jpg:jpg44};
        break;
        case 'Slim Pants Legs (Taper) - Half Leg':currentPrep = {name:currentPrep.name, instructions:instructions9, gif:gif10, jpg:jpg4};
        break;
      }
    } else if (currentGarment.name === "shirt"){

      switch (currentPrep.name) {
        case 'Shorten Shirt Sleeves — With Cuff':currentPrep = {name:currentPrep.name, instructions:instructions2, gif:gif13, jpg:jpg7};
        break;
        case 'Shorten Shirt Sleeves — Without Cuff':currentPrep = {name:currentPrep.name, instructions:instructions2, gif:gif11, jpg:jpg8};
        break;
        case 'Shorten Shirt Straps':currentPrep = {name:currentPrep.name, instructions:instructions3, gif:gif16, jpg:jpg43};
        break;
        case 'Shorten Dress Shirt (Hem)':currentPrep = {name:currentPrep.name, instructions:instructions10, gif:gif14, jpg:jpg11};
        break;
        case 'Shorten T-Shirt (Hem)':currentPrep = {name:currentPrep.name, instructions:instructions10, gif:gif12, jpg:jpg12};
        break;
        case 'Take In Shirt Shoulders':currentPrep = {name:currentPrep.name, instructions:instructions11, gif:gif15, jpg:jpg13};
        break;
      }
    } else if (currentGarment.name === "skirt"){

       switch (currentPrep.name) {
        case 'Shorten Skirt (Hem) — Single Layer':currentPrep = {name:currentPrep.name, instructions:instructions12, gif:gif3, jpg:jpg14};
        break;
        case 'Shorten Skirt (Hem) — 2 Layers':currentPrep = {name:currentPrep.name, instructions:instructions13, gif:gif3, jpg:jpg14};
        break;
        case 'Shorten Skirt (Hem) — 3 Layers':currentPrep = {name:currentPrep.name, instructions:instructions13, gif:gif3, jpg:jpg14};
        break;
      }
    } else if (currentGarment.name === "suit jacket"){

       switch (currentPrep.name) {
        case 'Shorten Jacket Length':currentPrep = {name:currentPrep.name, instructions:instructions14, gif:gif4, jpg:jpg26};
        break;
        case 'Shorten Jacket Sleeves':currentPrep = {name:currentPrep.name, instructions:instructions2, gif:gif5, jpg:jpg27};
        break;
        case 'Take In Jacket Shoulders':currentPrep = {name:currentPrep.name, instructions:instructions11, gif:gif6, jpg:jpg31};
        break;
      }
    } else if (currentGarment.name === "dress"){

      switch (currentPrep.name) {
        case 'Shorten Dress Sleeves — With Cuff':currentPrep = {name:currentPrep.name, instructions:instructions2, gif:gif13, jpg:jpg42};
        break;
        case 'Shorten Dress Sleeves — Without Cuff':currentPrep = {name:currentPrep.name, instructions:instructions2, gif:gif11, jpg:jpg42};
        break;
        case 'Shorten Dress Straps':currentPrep = {name:currentPrep.name, instructions:instructions3, gif:gif16, jpg:jpg43};
        break;
        case 'Shorten Dress (Hem) — Single Layer':currentPrep = {name:currentPrep.name, instructions:instructions1, gif:gif3, jpg:jpg19};
        break;
        case 'Shorten Dress (Hem) — 2 Layers':currentPrep = {name:currentPrep.name, instructions:instructions1, gif:gif3, jpg:jpg19};
        break;
        case 'Shorten Dress (Hem) — 3 Layers':currentPrep = {name:currentPrep.name, instructions:instructions1, gif:gif3, jpg:jpg19};
        break;
      }
    } else if (currentGarment.name === "necktie"){

      switch (currentPrep.name) {
        case 'Shorten Necktie':currentPrep = {name:currentPrep.name, instructions:instructions4, gif:gif7, jpg:jpg39};
        break;
        case 'Slim Necktie — 2 Inches':currentPrep = {name:currentPrep.name, instructions:instructions5, gif:"", jpg:""};
        break;
        case 'Slim Necktie — 2.25 Inches':currentPrep = {name:currentPrep.name, instructions:instructions5, gif:"", jpg:""};
        break;
        case 'Slim Necktie — 2.5 Inches':currentPrep = {name:currentPrep.name, instructions:instructions5, gif:"", jpg:""};
        break;
        case 'Slim Necktie — 2.75 Inches':currentPrep = {name:currentPrep.name, instructions:instructions5, gif:"", jpg:""};
        break;
        case 'Slim Necktie — 3 Inches':currentPrep = {name:currentPrep.name, instructions:instructions5, gif:"", jpg:""};
        break;
        case 'Slim Necktie — 3.25 Inches':currentPrep = {name:currentPrep.name, instructions:instructions5, gif:"", jpg:""};
        break;
        case 'Slim Necktie — 3.5 Inches':currentPrep = {name:currentPrep.name, instructions:instructions5, gif:"", jpg:""};
        break;
      }
    }
  }



