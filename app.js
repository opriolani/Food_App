import { menuArray } from "./data.js";

const orderModal = document.getElementById("order");
const paymentForm = document.getElementById("payment-form");
const messageEl = document.getElementById("message");
let foodOrderedArray = [];

document.addEventListener("click", function (e) {
  if (e.target.dataset.add) {
    addMenuItems(e.target.dataset.add);
  } else if (e.target.dataset.clear) {
    removeOrder(e.target.dataset.clear);
  } else if (e.target.id === "order-btn") {
    openPaymentForm();
  } else if (e.target.id === "modal-close-btn") {
    closePaymentModal();
  }
});

function addMenuItems(menuId) {
  orderModal.style.display = "block";

  const menuObj = menuArray.filter(function (menu) {
    return Number(menuId) === menu.id;
  })[0];

  if (
    !foodOrderedArray.find(function (menu) {
      return menu.id === Number(menuId);
    })
  ) {
    const newMenuObj = {
      name: menuObj.name,
      price: menuObj.price,
      id: menuObj.id,
      quantity: 1,
    };
    foodOrderedArray.push(newMenuObj);
  } else {
    const duplicateMenu = foodOrderedArray.filter(function (menu) {
      return menu.id === menuObj.id;
    })[0];
    duplicateMenu.price =
      duplicateMenu.price + duplicateMenu.price / duplicateMenu.quantity;
    duplicateMenu.quantity++;
  }
  totalOrder();
  renderTotalOrder();
}

function totalOrder() {
  let htmlString = foodOrderedArray.map(function (food, index) {
    return `
           <div class="orders">
             <h3>${food.name}<span data-clear='${index}'>remove</span></h3>
             <h3>${food.quantity}</h3>
             <h3>$${food.price}</h3>
           </div>`;
  });
  document.getElementById("order-wrapper").innerHTML = htmlString.join("");
}

function renderTotalOrder() {
  let totalPrice = 0;

  foodOrderedArray.forEach(function (food, index) {
    totalPrice += foodOrderedArray[index].price;
  });
  document.getElementById("total-orders").textContent = `$${totalPrice}`;
}

function removeOrder(index) {
  foodOrderedArray.splice(index, 1);

  if (foodOrderedArray.length === 0) {
    orderModal.style.display = "none";
  }

  totalOrder();
  renderTotalOrder();
}

function openPaymentForm() {
  document.getElementById("modal").style.display = "block";
}

function closePaymentModal() {
  document.getElementById("modal").style.display = "none";
}

paymentForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const paymentFormData = new FormData(paymentForm);
  const name = paymentFormData.get("name");

  document.getElementById("modal").style.display = "none";
  orderModal.style.display = "none";
  paymentForm.reset();
  messageEl.style.display = "block";
  messageEl.innerHTML = ` <p class="message-text">Thanks ${name}! Your order is on its way!</p>
  `;
  foodOrderedArray = [];
});

function getMenuHtml() {
  let htmlString = ``;

  menuArray.forEach(function (menu) {
    htmlString += `
        <div class="menu">
            <div class="flex">
                <img src="./Images/${menu.image}" alt="" />
                <div class="menu-info">
                    <h2>${menu.name}</h2>
                    <h4>${menu.ingredients.join(", ")}</h4>
                    <h2>$${menu.price}</h2>
                </div>
            </div>
            <div>
                <button data-add="${menu.id}" 
                class="btn-add">+</button>
            </div>
            
        </div>
        `;
  });
  return htmlString;
}
function render() {
  document.getElementById("menu").innerHTML = getMenuHtml();
}
render();
