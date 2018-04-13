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

  $(document).on("click", "#new-customer-next", function(){
    $("#new-customer-part-1").css('display', 'none');
    $("#new-customer-part-2").css('display', 'block');
  });


  // GLOBAL VARIABLES
  //
  //

  var currentGarment;
  var currentAlterations = [];
  var currentAlteration;
  var currentAltName = [];
  var currentAltPrice = [];
  var currentItem;
  var itemPrice = 0;
  var items = [];
  var totalPrice = 0;
  var counter = 0;
  var orderNotes;

  //
  //
  // END OF GLOBAL VARIABLES


  // GARMENT SELECTION PAGE
  //
  //

  $(document).on("click", ".garment-card", function(){
    currentGarment = $(this).find("h3").html()
    $("#garment-select").toggleClass('hidden');
    $("#alteration-select").toggleClass('hidden');
    if(currentGarment == "suit jacket"){
      $(".suit-jacket-alteration").toggleClass('hidden');
    } else {
    $("." + currentGarment +
      "-alteration").toggleClass('hidden');
    }
    $("#header1").toggleClass('hidden');
    $("#header2").toggleClass('hidden');
  })

  //
  //
  // END OF GARMENT SELECTION PAGE




  // ALTERATION SELECTION PAGE
  //
  //

  $(document).on("click", ".alteration-card", function(){
    if ($(this).hasClass("selected")){
      currentAlterations.pop()
      itemPrice = 0
      $(this).css('background-color', 'white');
      $(this).toggleClass('selected');
      if (currentAlterations.length < 1){
        $("#add-alt-to-basket").css('background-color', 'rgba(0,0,53,.5)');
      }
    } else {
      currentAltName = (($(this).find("p").html()))
      currentAltPrice = (($(this).find("span").html()))
      $(this).toggleClass('selected');
      $(this).css('background-color', 'lightgray');
      currentAlteration = {name:currentAltName, price:currentAltPrice}
      currentAlterations.push(currentAlteration)
      $("#add-alt-to-basket").css('background-color', 'rgba(0,0,53)');
      var integerPrice = parseInt(currentAltPrice)
      itemPrice = itemPrice + integerPrice
    }
  });


  //
  //
  // END OF ALTERATION SELECTION PAGE




  // ALTERATION BACK BUTTON
  //
  //
  $(document).on("click", "#alteration-back-button", function(){
    if(currentGarment == "suit jacket"){
      $(".suit-jacket-alteration").toggleClass('hidden');
    } else {
      $("." + currentGarment + "-alteration").toggleClass('hidden');
    }
    $("#alteration-select").toggleClass('hidden');
    $("#garment-select").toggleClass('hidden');
    $(".alteration-card").css('background-color', 'white');

    currentAlterations = [];
    currentGarment = "";

    $(".alteration-card").removeClass("selected")

    $("#header1").toggleClass('hidden');
    $("#header2").toggleClass('hidden');
  });
  //
  //
  // END ALTERATION BACK BUTTON



  // ADD ALTERATIONS BUTTON
  //
  //
  $(document).on("click", "#add-alt-to-basket", function(){
    // make basket appear
    if (currentAlterations.length < 1){

    } else {

      if(items.length === 0){
        $("#basket").toggleClass('hidden');
      }
      //

      // establish item details
      currentItem = {id: counter, garment: currentGarment, alterations: currentAlterations, total: itemPrice, notes: ""}

      items.push(currentItem)
      //

      $("#basket-items").append("<div id=" + currentItem.id + "></div>")

      // add item to basket
      $("#" + currentItem.id).append("<p class='basket-garment'><span class='float-left'>" + currentItem.garment + "</span><span class='float-right'><span id='basket-edit'>edit</span> | <span id='basket-delete'>delete</span></span></p>")

      // add alterations to basket
      $.each(currentAlterations, function(i, alteration){
        $("#" + currentItem.id).append("<p class='basket-alteration clear-float'><span class='float-left'>" + alteration.name + "</span><span class='float-right'>$" + alteration.price + "</span></p>")
        var integerPrice = parseInt(alteration.price)
        totalPrice = totalPrice + integerPrice
      });
      //

      // add total price
      $("#total-price").html(totalPrice.toFixed(2))
      //

      // hide alteration cards
      if(currentGarment == "suit jacket"){
        $(".suit-jacket-alteration").toggleClass('hidden');
      } else {
        $("." + currentGarment + "-alteration").toggleClass('hidden');
      };
      //

      // return alterations cards to white
      $(".alteration-card").css('background-color', 'white');
      $(".alteration-card").removeClass("selected")
      //

      // return view to garment select
      $("#alteration-select").toggleClass('hidden');
      $("#garment-select").toggleClass('hidden');
      //

      // empty current alterations array
      currentAlterations = [];
      currentGarment = "";
      itemPrice = 0;
      //

      // update counter
      counter = counter + 1
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
    if (items.length == 0){
      $("#basket").toggleClass('hidden');
    }
  });

  // checkout button
    $(document).on('click', "#checkout-button", function(){
      // hide garment and alteration divs, show review page
      $("main").toggleClass('hidden');
      $("#review-order").toggleClass('hidden');

      // show proper header for review page
      if(currentGarment == ""){
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
    $("main").toggleClass('hidden');
    // show proper header for garment page
    if(currentGarment == ""){
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

    // hide review page and basket, return to garments page
    if (items.length == 0){
      $("main").toggleClass('hidden');
      $("#review-order").toggleClass('hidden');
      $("#basket").toggleClass('hidden');

      // show proper header for garment page
      if(currentGarment == ""){
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

  $(document).on('click', "#proceed-to-pay", function(){
    console.log(click)
  })

  //
  //
  // END ORDER REVIEW PAGE


  // POST REQUEST TO AIR TAILOR API
  //
  //
  var data = {
    order: {
      requester_notes: 'these are notes the customer or revolve can leave',
      items: [
        {
          item_type_id: 7,
          alterations: [{ alteration_id: 208 }, { alteration_id: 219 }],
        },
        {
          item_type_id: 6,
          alterations: [{ alteration_id: 36 }],
        },
      ],
      customer: {
        first_name: 'Jared',
        last_name: 'Murphy',
        phone: '9045668701',
        email: 'jared@airtailor.com',
        street: '1 Saint Nicholas Terrace',
        street_two: 'Apt 53',
        city: 'New York',
        state_province: 'NY',
        zip_code: '10027',
      },
    },
  };



  $("#submit").click(function() {
    /* Act on the event */
    console.log(data)
    $.ajax({
      url: 'https://prod-airtailor-portal-api.herokuapp.com/api/v1/orders',
      method: 'POST',
      headers: {
        'X-Api-Key': 'O7iq7W0Kcg8MynMp3aaHzgtt',
        'Content-Type': 'application/json',
      },
      dataType: 'json',
      data: JSON.stringify(data),
      success: function(res) {
        console.log('success', res);
      },
      error: function(res) {
        console.log('error', res);
      },
    });
  });






  // AIR TAILOR API KEY: O7iq7W0Kcg8MynMp3aaHzgtt

  // QwZL2CvAUf8V1vYHZIc2Zgtt



