const totalPrice = document.querySelector('#price');
const prices = document.querySelectorAll('span.prices');
const quantities = document.querySelectorAll('input.quantity');
let total = 0;
console.log(prices[0].innerText);
console.log(quantities[0].value);

function updateTotal() {
	total = 0;
	for (let i = 0; i < prices.length; i++) {
		total += prices[i].innerText * quantities[i].value;
	}
	totalPrice.innerText = `$${total}`;
}
updateTotal();
quantities.forEach((el) => {
	el.addEventListener('input', updateTotal);
});
