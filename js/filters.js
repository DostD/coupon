function enableFilters(){
  var productCards = document.querySelectorAll('.catalog_cart');

  var filterState = {
   type: [],
   special: true,
   price:{from:0,to:99999999},
   date:0,
   metro:[]
  };

  var filterFunctions = {
   type: validateType,
   special: validateSpecial,
   //price: validatePrice,
   //date: validateDate,
   metro: validateMetro
  };


  function pushOrSplice(arr, item, cond) {
    if(cond == true){
      arr.push(item);
    }else{
      arr.splice(arr.indexOf(item),1);
    }
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
    var priceFrom = prices.querySelector('.filter__input');
    var priceTo = prices.querySelector('.filter__input:nth-child(2)');

    if(state.from != "" && state.to != ""){
      filterState.price.from = priceFrom.value;
      filterState.price.to = pticeTo.value;
    }else if(state.from != "" && state.to == ""){
      filterState.price.from = priceFrom.value;
      filterState.price.to = 999999999;
    }else if(state.from == "" && state.to != ""){
      state.from = 0;
      filterState.price.to = pticeTo.value;
    } else {
      filterState.price.from = 0;
      filterState.price.to = 999999999;
    }


  }

  function refilter() {

      for (var i = 0; i<productCards.length; i++) {
          var ok = true;
          for (var key in filterFunctions) {
              var validator = filterFunctions[key]
              ok = ok && validator(productCards[i].dataset, filterState[key])
             }
          productCards[i].style.display = ok ? 'inline-block' : 'none';
      }
  }

  var filterByTypeList = document.querySelector('.filter__content');
  var typeChecks = filterByTypeList.querySelectorAll('.checkbox__input');

  function validateType(card , state){
    var check = false;
    if(state.includes(card.type)){
      check = true;
    }
    return check;
  }

  function validateMetro(card,state){
    var check=false;
    if(state.includes(card.type)){
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
      if (cardDate < state){
        return true;
      }

  }


  function validatePrice(card, state){
    var check = false;
    if(card.price >= state.from && card.price <= state.to){
          check = true;
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
}

