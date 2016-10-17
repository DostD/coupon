
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


