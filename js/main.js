
/*--------------------Add to cart----------------------*/

var cart=[],
    cartList = document.querySelector('.catalog_basket__list'),
    cartSum = document.querySelector('.catalog_basket__summ_text'),
    productCards = document.querySelectorAll('.catalog_cart');
    disabledCards = document.querySelectorAll('.catalog_cart--disabled')


function updateSum(sum){
  cartSum.innerHTML = sum;

}

function makeCart(){
  var sum=0;
  if(cart.length === 0){

   cartList.innerHTML = '<p class="catalog_basket__default">No items</p>';

  } else {
   var sum;
   cartList.innerHTML = '';
   cart.forEach(function(item , i){

    var newItem = document.createElement('div');
    newItem.className = 'catalog_basket__line';

    var newItemProduct = document.createElement('div');
    newItemProduct.className = 'catalog_basket__product';
    newItemProduct.innerHTML = cart[i].name;

    var newItemPrice = document.createElement('div');
    newItemPrice.className  = 'catalog_basket__price price';
    newItemPrice.innerHTML  = cart[i].price;

    var newItemClose = document.createElement('div');
    newItemClose.className = 'catalog_basket__close';
    newItemClose.innerHTML = '<img src="img/svg/i-close.png" alt="close">';

    newItemClose.addEventListener('click', function(){
        removeItem(i);
    })

    newItem.appendChild(newItemProduct);
    newItem.appendChild(newItemPrice);
    newItem.appendChild(newItemClose);

    cartList.appendChild(newItem);


    sum += cart[i].price;

   })

  }
  updateSum(sum);
}

function addToCart(e){
     e.preventDefault();
     var parentBox = e.target.closest('.catalog_cart');

     if( parentBox.classList.contains('catalog_cart--disabled')){
        return;
     }

     var productName = parentBox.querySelector('.catalog_cart__title').innerText;
     var productPrice = parentBox.querySelector('.catalog_cart__price_new').innerText;
     var item = { name: productName , price: Number(productPrice) };
     console.log(item);

     cart.push(item);
     console.log(cart);
     makeCart()

}

function removeItem(i){
  cart.splice(i , 1);
  makeCart();
}

for(i=0; i<productCards.length; i++){
 var currentBtn = productCards[i].querySelector('.btn');
 currentBtn.addEventListener('click', addToCart);
}

 makeCart();

/*-------------------Open / close buy window----------------------*/


var buyBtn = document.querySelector('.catalog_basket__summ a');
var overlay = document.querySelector('.modal_underlay');
var modalClose = document.querySelector('.modal__close');

buyBtn.addEventListener('click' , function(e){
  e.preventDefault();
  document.querySelector('.modal_order').style.display = 'block';
  document.querySelector('.modal_underlay').style.display = 'block';
});

function closeModal(e){
  e.preventDefault();
  document.querySelector('.modal_order').style.display = 'none';
  document.querySelector('.modal_underlay').style.display = 'none';
}

overlay.addEventListener('click' , closeModal);
modalClose.addEventListener('click' , closeModal);

/*----------------------Change layout---------------------------*/

var viewItems = document.querySelectorAll('.catalog_view__item');
var row2 = viewItems[0];
var row3 = viewItems[1];
var productLists = document.querySelectorAll('.catalog__list');


function makeRow2(){
  for(var i=0; i < productLists.length; i++){
    productLists[i].classList.add('catalog__list--two');
    productLists[i].classList.remove('catalog__list--three');
    row2.classList.add('catalog_view__item--active');
    row3.classList.remove('catalog_view__item--active');
  }
}

function makeRow3(){
  for(var i=0; i < productLists.length; i++){
    productLists[i].classList.add('catalog__list--three');
    productLists[i].classList.remove('catalog__list--two');
    row3.classList.add('catalog_view__item--active');
    row2.classList.remove('catalog_view__item--active');
  }
}

row2.addEventListener('click', makeRow2);
row3.addEventListener('click', makeRow3);


/*--------------------Open/Close filters-----------------------*/


var titles = document.querySelectorAll('.filter__title');

function toggleFilter(e){
    e.preventDefault();
    var parent = e.target.closest('.catalog_filters__item');

    if(parent.classList.contains('filter--open')){
      parent.classList.remove('filter--open');
    }else{
      parent.classList.add('filter--open');
    }
}

for(var i=0; i<titles.length; i++){
   titles[i].addEventListener('click' , toggleFilter);
}



/*-----------------------------Filter cards by type-------------------------------*/

var filterByTypeList = document.querySelector('.filter__content');
var typeChecks = filterByTypeList.querySelectorAll('.checkbox__input');

for(var i=0; i<typeChecks.length; i++){
    typeChecks[i] = typeChecks[i].checked = true;
}


function filterByType(e){
  e.preventDefault();
  if(e.target.checked){
   for(var i=0; i<productCards.length; i++){
    if (productCards[i].dataset.type == e.target.nextElementSibling.nextElementSibling.innerHTML){
        productCards[i].style.display = 'inline-block';
    }
   }
 } else {
   for(var i=0; i<productCards.length; i++){
    if (productCards[i].dataset.type == e.target.nextElementSibling.nextElementSibling.innerHTML){
        productCards[i].style.display = 'none';
    }
   }
 }
}

for (var j=0; j<typeChecks.length; j++){
 typeChecks[j].addEventListener('change', filterByType);
}

/*------------------------------------Show only special offers--------------------------------------*/

var specialCheck = document.querySelector('.catalog_filters__item:nth-child(2) .checkbox__input');

function showSpecialCards(e){
 e.preventDefault();
  if(e.target.checked){
     for(var i=0; i<productCards.length; i++){
        if(productCards[i].dataset.special == 'true'){
            productCards[i].style.display = 'inline-block';
        }else{
            productCards[i].style.display = 'none';
        }
     }
  } else{
    for(var i=0; i<productCards.length; i++){
     productCards[i].style.display = 'inline-block';
    }
  }
}

specialCheck.addEventListener('change' , showSpecialCards);


/*-------------------------------------Filter by input price------------------------------------------*/

var prices = document.querySelector('.filter__column:nth-child(2)');
var priceFrom = prices.querySelector('.filter__input');
var priceTo = prices.querySelector('.filter__input:nth-child(2)');

var priceFromVal = 0;
var priceToVal = 9999999;

function filterByPrice(e){
  e.preventDefault();

  priceFromVal = Number(priceFrom.value);
  priceToVal = Number(priceTo.value);

  if(e.target.length !=0){
    for(var i=0; i<productCards.length; i++){
        if(productCards[i].dataset.price >= priceFromVal && productCards[i].dataset.price <= priceToVal){
            productCards[i].style.display = 'inline-block';
        } else {
            productCards[i].style.display = 'none';
        }
    }
  }else{
    for(var i=0; i<productCards.length; i++){
     productCards[i].style.display = 'inline-block';
    }
  }
}

priceFrom.addEventListener('change' , filterByPrice);
priceTo.addEventListener('change' , filterByPrice);

/*---------------------------------Filter by experation date-----------------------------------*/


var filterDate = document.querySelector('.catalog_filters__item:nth-child(4) .input');

function filterByDate (e){
    e.preventDefault();
    var filterDateInput = new Date(filterDate.valueAsDate);
    filterDateInput = filterDateInput/1000;
    for(var i=0; i<productCards.length; i++){
        var cardDate = getInitialSeconds(productCards[i])
        if(cardDate < filterDateInput){
            productCards[i].style.display = 'none';
        } else {
            productCards[i].style.display = 'inline-block';
        }
    }
}

filterDate.addEventListener('change' , filterByDate);

/*-----------------------------------Filter by metro station------------------------------------*/


var filterByMetroList = document.querySelector('.catalog_filters__item:nth-child(5) .filter__content');
var metroChecks = filterByMetroList.querySelectorAll('.checkbox__input');

for(var i=0; i<metroChecks.length; i++){
    metroChecks[i] = metroChecks[i].checked = true;
}


function filterByMetro(e){
  e.preventDefault();
  if(e.target.checked){
   for(var i=0; i<productCards.length; i++){
    if (productCards[i].dataset.metro == e.target.nextElementSibling.nextElementSibling.innerHTML){
        productCards[i].style.display = 'inline-block';
    }
   }
 } else {
   for(var i=0; i<productCards.length; i++){
    if (productCards[i].dataset.metro == e.target.nextElementSibling.nextElementSibling.innerHTML){
        productCards[i].style.display = 'none';
    }
   }
 }
}

for (var j=0; j<metroChecks.length; j++){
 metroChecks[j].addEventListener('change', filterByMetro);
}



