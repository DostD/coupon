function enableFilters(){
  var productCards = document.querySelectorAll('.catalog__item');

  var filterState = {
   type: [],
   special: false,
   price:{from:0,to:99999999},
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
  function handleType(e){
      var checkbox = e.target
      var title = e.target.nextElementSibling.nextElementSibling.innerHTML;
      pushOrSplice(filterState.type, title, checkbox.checked);
      refilter()

  }
  function handleSpecial(e){
    filterState.special=true;
    refilter()
  }

  function handleDate(e){
    var checkbox = e.target;
    var filterDateInput = new Date(checkbox.valueAsDate);
    filterDateInput = filterDateInput/1000;
    filterState.date = filterDateInput;
    refilter()
  }

  function handlePrice(e){

    var prices = document.querySelector('.filter__column:nth-child(2)');
    var priceFrom = prices.querySelector('input');
    var priceTo = prices.querySelector('input:nth-child(2)');

    filterState.price.from = Number(priceFrom.value);
    filterState.price.to = Number(priceTo.value);

    refilter();


  }

  function refilter() {
    console.log(filterState);
    var productCards = document.querySelectorAll('.catalog_cart');
      for (var i = 0; i<productCards.length; i++) {
          var ok = true;
          for (var key in filterFunctions) {
              var validator = filterFunctions[key]
              ok = ok && validator(productCards[i].dataset, filterState[key])
              console.log(ok)
             }
             console.log('-')
          productCards[i].style.display = ok ? 'inline-block' : 'none';
      }
      //console.log(ok);
  }

  var filterByTypeList = document.querySelector('.filter__content');
  var typeChecks = filterByTypeList.querySelectorAll('.checkbox__input');

  function validateType(card, state){
    var check = false;
    if(state.includes(card.type) || state.length == 0){
      check = true;
    }
    return check;
  }

  function validateMetro(card,state){
    var check= false;
    if(state.includes(card.metro) || state.length == 0){
      check = true;
    }
    return check;
  }

  function validateSpecial(card,state){
    var check  = true;
    if(state != false){
      if(card.special != 'true'){
          check = false;
      }
    } return check;
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
      if (cardDate < state || state.length == 0){
        check = true;
      }
     return check;
  }


  function validatePrice(card, state){
    var check = false;

    if(state.from == "" && state.to == ""){
      state.from = 0;
      state.to = 999999999;
    }else if(state.from != "" && state.to == ""){
      state.to = 999999999;
    }else if(state.from == "" && state.to != ""){
      state.from = 0;
    }

    if(Number(card.price) >= state.from && Number(card.price) <= state.to){
          check = true;
          console.log(Number(card.price))
          console.log(state)
    }
     return check;
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
  specialCheck.addEventListener('change',handleSpecial);

  var dateInput = document.querySelector('.catalog_filters__item:nth-child(4) input');
  dateInput.addEventListener('change', handleDate);

  var priceFromInput = document.querySelector('.catalog_filters__item:nth-child(3) input');
  var priceToInput = document.querySelector('.catalog_filters__item:nth-child(3) input:nth-child(2)');
  priceFromInput.addEventListener('change', handlePrice);
  priceToInput.addEventListener('change', handlePrice);
}

