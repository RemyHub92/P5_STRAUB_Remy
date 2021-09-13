

let orderId = localStorage.getItem('responseOrder');
console.log(orderId);

let totalPrice = localStorage.getItem('totalPrice');
console.log(totalPrice);

const mainConfirm = document.getElementById('main_confirm');
const orderConfirm = document.createElement('div');
orderConfirm.className = 'order_confirm col-md-6 text-center'; //---------------//
mainConfirm.appendChild(orderConfirm);

const confirmTitle = document.createElement('h3');
confirmTitle.className = 'confirm_title';
confirmTitle.textContent = "Confirmation de votre commande : ";
orderConfirm.appendChild(confirmTitle);

const txtConfirm = document.createElement('p');
txtConfirm.textContent = "Nous avons le plaisir de vous informer que votre commande a bien été enregistrée !";
orderConfirm.appendChild(txtConfirm);

const divConfirm = document.createElement('div');
divConfirm.className = 'div_confirm bg-secondary text-light';
orderConfirm.appendChild(divConfirm);

const numOrder = document.createElement('p');
numOrder.className = 'num_order';
divConfirm.appendChild(numOrder);
numOrder.textContent = "Numéro de commande : " + orderId;

const priceOrder = document.createElement('p');
priceOrder.className = 'price_order';
divConfirm.appendChild(priceOrder);
priceOrder.textContent = "Montant de votre commande : " + totalPrice + " €";

const txtConfirm2 = document.createElement('p');
txtConfirm2.textContent = "Orinoco vous remercie de votre commande !";
orderConfirm.appendChild(txtConfirm2);

const txtConfirm3 = document.createElement('p');
txtConfirm3.textContent = "Nous esperons vous revoir bientot !";
orderConfirm.appendChild(txtConfirm3);