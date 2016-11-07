function enableFilters(){
  var productCards = document.querySelectorAll('.catalog__item');

  var filterState = {
   type: [],
   special: false,
   price:{from:null,to:null},
   date:null,
   metro:[]
  };

  var filterFunctions = {
   type: validateType,
   special: validateSpecial,
   price: validatePrice,
   date: validateDate,
   metro: validateMetro
  };


  function pushOrSplice(arr, item, cond) {
    if(cond == true){
      arr.push(item);
    }else{
      arr.splice(arr.indexOf(item),1);
    }
    console.log(arr);
  }

  function handleMetro(e) {
      var checkbox = e.target
      var title = e.target.nextElementSibling.nextElementSibling.innerHTML;
      pushOrSplice(filterState.metro, title, checkbox.checked)
      refilter()
  }
  function validateMetro(card,state){
    var check= false;
    if(state.includes(card.metro) || state.length == 0){
      check = true;
    }
    return check;
  }
  function handleType(e){
      var checkbox = e.target
      var title = e.target.nextElementSibling.nextElementSibling.innerHTML;
      pushOrSplice(filterState.type, title, checkbox.checked);
      refilter()
  }
  function validateType(card, state){
    var check = false;
    if(state.includes(card.type) || state.length == 0){
      check = true;
    }
    return check;
  }

  function handleSpecial(e){
    var checkbox = e.target
    if (checkbox.checked){
      filterState.special=true;
    } else if(! checkbox.checked){
      filterState.special=false;
    }
    refilter()
  }
  function validateSpecial(card,state){
    var check  = true;
    if(state != false){
      if(card.special != 'true'){
          check = false;
      }
    } return check;
  }

  function handleDate(){
    var inputDate = document.querySelector('.catalog_filters__item:nth-child(4) input');
    var dateValue = (inputDate.valueAsDate)/1000;
    filterState.date = dateValue;
    console.log(filterState.date);

    refilter()
  }
  function validateDate (card , state){

      function getInitialSeconds(card){

       var endingDate = card.dateTo;
       endingDate = new Date(endingDate.split(' ')[0]);
       endingDate = endingDate/1000;
       return endingDate;

    }
      var cardDate = getInitialSeconds(card)
      var check = false;
      console.log(cardDate)

      if (cardDate > state || state == null){
        check = true
      }
     return check;
  }

  function handlePrice(e){

    var prices = document.querySelector('.filter__column:nth-child(2)');
    var priceFrom = Number(prices.querySelector('input').value);
    var priceTo = Number(prices.querySelector('input:nth-child(2)').value);

    if(priceFrom == "" && priceTo == ""){
      filterState.price.from = 0;
      filterState.price.to = 999999999;
    }else if(priceFrom != "" && priceTo == ""){
      filterState.price.from = Number(priceFrom);
      filterState.price.to = 999999999;
    }else if(priceFrom == "" && priceTo != ""){
      filterState.price.from = 0;
      filterState.price.to = Number(priceTo);
    } else {
      filterState.price.from = Number(priceFrom);
      filterState.price.to = Number(priceTo);
    }
    refilter();
  }
  function validatePrice(card, state){
    var price = Number(card.price);
     var isFromValid = price >= state.from || (state.from == null);
     var isToValid = price <= state.to || (state.to == null) ;
     return isFromValid && isToValid;
  }

  function refilter() {
    var productCards = document.querySelectorAll('.catalog_cart');
      for (var i = 0; i<productCards.length; i++) {
          var ok = true;
          for (var key in filterFunctions) {
              var validator = filterFunctions[key]
              ok = ok && validator(productCards[i].dataset, filterState[key])
             }
          productCards[i].style.display = ok ? 'inline-block' : 'none';
      }
  }

  var typesList = document.querySelector('.filter-type__type');
  var typesItems = typesList.querySelectorAll('input');
    for(var i=0; i<typesItems.length; i++){
      typesItems[i].addEventListener('change' , handleType);
    }
  var metrosList = document.querySelector('.filter-type__metro');
  var metrosItems = metrosList.querySelectorAll('input');
    for(var i=0; i<metrosItems.length; i++){
      metrosItems[i].addEventListener('change' , handleMetro);
    }

  var specialCheck = document.querySelector('.catalog_filters__item:nth-child(2) input');
  specialCheck.addEventListener('change', handleSpecial);

  var dateInput = document.querySelector('.catalog_filters__item:nth-child(4) input');
  dateInput.addEventListener('change', handleDate);

  var priceFromInput = document.querySelector('.catalog_filters__item:nth-child(3) input');
  var priceToInput = document.querySelector('.catalog_filters__item:nth-child(3) input:nth-child(2)');
  priceFromInput.addEventListener('change', handlePrice);
  priceToInput.addEventListener('change', handlePrice);
}

