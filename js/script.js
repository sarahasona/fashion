var newProducts = document.querySelector(".new-prod");
let badgeCounter = document.querySelector(".badge");
function getCartCount() {
  let cartCount = localStorage.getItem("counter")
    ? localStorage.getItem("counter")
    : 0;
  badgeCounter ? (badgeCounter.innerHTML = cartCount) : "";
  return cartCount;
}
let cartCount = getCartCount();
let newProductsArr = products.filter((item) => {
  return item.lastArrived;
});
async function drawNewProducts(start = 0, end = 8, subProductArr, search) {
  if (page == "products") {
    if (search) {
      subProductArr = subProductArr.slice(start, end);
    } else {
      subProductArr = products.slice(start, end);
    }
  }
  // if in main page
  else {
    subProductArr = newProductsArr.slice(start, end);
  }
  newProducts.innerHTML = "";
  subProductArr.forEach((item) => {
    // let colors = item.colors.map((color) => {
    //   return `<div class='color' style='background-color:${color}'></div>`;
    // });

    newProducts.innerHTML += `
    <div class="col">
        <div class="card">
        <div class='position-relative card-img overflow-hidden'>
            <img src="${item.image}" class="card-img-top" alt="..." />
            <div class='sale position-absolute'>${item.sale}%</div>
            <div class='position-absolute bg-body-secondary bg-opacity-50 card-img-overlay d-flex justify-content-between' style='width:70%;height:50px'>
                <a role='button' class='d-inline-block text-secondary-emphasis me-2' data-bs-toggle="tooltip" data-bs-title="select options" onclick="toggleOptions(${
                  item.id
                })">
                    <i class="fas fa-cart-plus"></i>
                </a>
                <a role="button" class='d-inline-block text-secondary-emphasis me-2' data-bs-toggle="tooltip" data-bs-title="Quick view">
                    <i class="fas fa-search"></i>
                </a>
                <a role="button" class='d-inline-block text-secondary-emphasis me-2' data-bs-toggle="tooltip" data-bs-title="add to whishlist" onclick='addToWishList(${
                  item.id
                },this)'>
                    <i class="far fa-heart" id="wish-${item.id}"></i>
                </a>
            </div>
            <div class='position-absolute w-100 h-100 bg-body-secondary overflow-auto top-0 p-3 d-none bg-opacity-75' id='overlayCard_${
              item.id
            }'>
                <a role='button' class='text-decoration-none text-secondary-emphasis d-block mb-3' onclick='toggleOptions(${
                  item.id
                })'><i class="fas fa-times"></i> Close</a>
                <p class='text-warning-c'>Get free shipping all over Egypt on any order above 1200 L.E</p>
                
                <div class="row ms-3" id='color_${item.id}'>
                </div>
                <h5 class='mt-3'>Size</h5>
                <div class='row ms-3' id='sizes_${item.id}'>
                </div>
                <button class='btn cartBtn mt-3' onclick='addToCart(this,${
                  item.id
                })'>Add to Cart</button>
            </div>
        </div>
          
          <div class="card-body">
            <h5 class="card-title fs-6 text-dark-emphasis">${item.name}</h5>
            
            <p class="card-text">
            <div class='d-flex justify-content-center' id='item_${item.id}'>
            </div>
            <p class='pro-price mt-3 text-dark-emphasis'>${Math.ceil(
              item.price - (item.price * item.sale) / 100
            )} L.E  <del class='text-secondary'>${item.price} L.E</del></p>
            </p>
          </div>
        </div>
      </div>
    `;
    let colorsDiv = document.querySelector(`#item_${item.id}`);
    let cartColors = document.querySelector(`#color_${item.id}`);
    let sizeDiv = document.querySelector(`#sizes_${item.id}`);
    item.colors.forEach((color) => {
      colorsDiv.innerHTML += `<div class='color' style='background-color:${color}'></div>`;
      // cartColors.innerHTML += `<div class='color' role='button' style='background-color:${color}'></div>`;
      appendColorOrSize(item, cartColors, color);
    });
    item.availableSize.forEach((size) => {
      appendColorOrSize(item, sizeDiv, (color = ""), size);
      // sizeDiv.innerHTML += `<div class='sizeDiv' role='button'>${size}</div>`;
    });
    setChecked(cartColors);
    setChecked(sizeDiv);
  });
  // fillHearts();
}
// fillHearts();
// let chosenProducts = []
function getChosenProducts() {
  let chosenProducts = localStorage.getItem("cartProducts")
    ? JSON.parse(localStorage.getItem("cartProducts"))
    : [];
  return chosenProducts;
}
let chosenProducts = getChosenProducts();

function addToCart(ele, id) {
  let checkExist = localStorage.getItem("userName");
  if (checkExist) {
    let chosenColor = document.querySelector(
      `input[name="c_${id}"]:checked`
    ).value;
    let chosenSize = document.querySelector(
      `input[name="s_${id}"]:checked`
    ).value;
    let chosenProduct = {
      id: id,
      chosenColor: chosenColor,
      chosenSize: chosenSize,
      count: 1,
    };
    if (chosenProducts.length > 0) {
      let exist = chosenProducts.find(
        (ele) =>
          ele.id == id &&
          ele.chosenColor == chosenColor &&
          ele.chosenSize == chosenSize
      );
      if (!exist) {

        chosenProducts.push(chosenProduct);
      } else {
        exist.count++;
      }
    } else {
      chosenProducts.push(chosenProduct);
    }
    setTimeout(() => {
      ele.parentNode.setAttribute("style", "display:none!important");
    }, 500);
    localStorage.setItem("cartProducts", JSON.stringify(chosenProducts));
    countCartProducts();
  } else {
    setTimeout(() => {
      window.location = "login.html";
    }, 200);
  }
}
let wishList = localStorage.getItem("wishList")
  ? JSON.parse(localStorage.getItem("wishList"))
  : [];

function addToWishList(id, ele) {
  let checkExist = localStorage.getItem("userName");
  if (checkExist) {
    if (wishList.length > 0) {
      let exist = wishList.find((ele) => {
        return ele == id;
      });
      if (!exist) {
        wishList.push(id);
        ele.firstElementChild.classList.remove("far");
        ele.firstElementChild.classList.add("fas");
        ele.firstElementChild.setAttribute("style", "color:red");
      } else {
        wishList = wishList.filter((item) => {
          return item != id;
        });
        ele.firstElementChild.removeAttribute("style");
        ele.firstElementChild.classList.remove("fas");
        ele.firstElementChild.classList.add("far");

        if (ele.classList.contains("wish-fav")) {
          $(".multiple-items").slick(
            "slickRemove",
            $(".slick-slide").index(ele) - 1
          );
          drawWishList();
        }
      }
    } else {
      wishList.push(id);
      ele.firstElementChild.classList.toggle("fas", "far");
      ele.firstElementChild.setAttribute("style", "color:red");
    }
    localStorage.setItem("wishList", JSON.stringify(wishList));
  } else {
    setTimeout(() => {
      window.location = "login.html";
    }, 200);
  }
}
function setChecked(parentDiv) {
  parentDiv.firstElementChild.firstElementChild.setAttribute("checked", true);
}
// drawNewProducts();
function fillHearts(start = 0, end = 8, prodList = [], search = false) {
  this.drawNewProducts(start, end, prodList, search).then((res) => {
    if (wishList.length > 0) {
      wishList.forEach((ele) => {
        let heartEle = document.querySelector(`#wish-${ele}`);
        if (heartEle) {
          heartEle.classList.remove("far");
          heartEle.classList.add("fas");
          heartEle.setAttribute("style", "color:red");
        }
      });
    }
  });
}

function appendColorOrSize(item, parentDiv, color = "", size = "") {
  parentDiv.innerHTML += `
  <div class="form-check col-lg-6 col-md-4 col-sm-3 col-2">
    <input class="form-check-input" type="radio" name="${
      color ? `c_${item.id}` : `s_${item.id}`
    }" style='border:1px solid #555' id="${
    color ? `clr_${item.id}` : `size_${item.id}`
  }" value="${color ? color : size}">
    <label class="${color ? "cartClr" : "sizeClr"} form-check-label" for="${
    color ? `c_${item.id}` : `s_${item.id}`
  }" style='background-color:${color}'>
      ${size}
    </label>
  </div>`;
}
function toggleOptions(id) {
  let overlayCard = document.querySelector(`#overlayCard_${id}`);
  overlayCard.style.display == "none" || overlayCard.style.display == ""
    ? overlayCard.setAttribute("style", "display:block!important")
    : overlayCard.setAttribute("style", "display:none!important");
}

// =========================== cart ==============================
let shoppingCart = document.querySelector(".shopping-cart");
let cartTable = document.querySelector(".shopping-cart tbody");
let emptyCart = document.querySelector(".empty-cart");
let priceDiv = document.querySelector(".priceDiv");
function fillShoppingCart() {
  cartTable.innerHTML = "";
  if (chosenProducts.length > 0) {
    emptyCart.style.display = "none";
    shoppingCart.style.display = "block";

    if (page == "cart") {
      priceDiv.setAttribute("style", "display:flex!important");
    }
    fillTable();
  } else {
    emptyCart.style.display = "block";
    shoppingCart.style.display = "none";
    if (page == "cart") {
      priceDiv.setAttribute("style", "display:none!important");
    }
    // priceDiv.style.display = "none";
  }
}
let priceEle = document.querySelector(".price");
function fillTable(start = 0, end = 5) {
  cartTable.innerHTML = "";
  let subChosenProducts = chosenProducts.slice(start, end);
  subChosenProducts.forEach((ele) => {
    let product = products.find((pro) => {
      return pro.id == ele.id;
    });
    cartTable.innerHTML += `
      <tr style='vertical-align:middle'>
      ${
        page == "cart"
          ? `<td><img src='${product.image}' class='rounded' style='width:100px'></td>`
          : ``
      }
      <td>${product.name}
      <p class='text-secondary'>${product.price} L.E</p></td>
      <td><div class="rounded-circle" style="background-color:${
        ele.chosenColor
      };width:30px;height:30px"></div></td>
      <td>${ele.chosenSize}</td>
      <td class='product-counter'>
      <input type='button' class='btn' value="+" onclick='changeProdCounter(this,${
        ele.id
      },"${ele.chosenColor}","${ele.chosenSize}")'>
      <p>${ele.count}</p>
      <input type='button' class='btn' value='-' onclick='changeProdCounter(this,${
        ele.id
      },"${ele.chosenColor}","${ele.chosenSize}")'>
      </td>
      <td><i class="fas fa-trash-alt text-danger" onclick='removeCartProduct(this,${
        ele.id
      },"${ele.chosenColor}","${ele.chosenSize}")'></i></td>
    </tr>
      `;
  });
  if (page == "main" || page == "products") {
    cartTable.innerHTML += `<tr><td colspan='5' class='text-center'><a class='btn btn-warning' href='cart.html'>Show Cart</a></td></tr>`;
  } else if (page == "cart") {
    calculateTotalPrice();
  }
}
function calculateTotalPrice() {
  let totalPrice = 0;
  chosenProducts.forEach((ele) => {
    let prod = products.find((pro) => {
      return pro.id == ele.id;
    });
    totalPrice += prod.price * ele.count;
  });
  priceEle.innerHTML = `<h5>Total Price </h5><span class='fs-5 text-body-secondary'>${totalPrice} <span class='fs-6'>L.E</span></span>
    `;
}
function countCartProducts() {
  getChosenProducts();
  let counter = chosenProducts.reduce((total, ele) => {
    return total + ele.count;
  }, 0);
  badgeCounter ? (badgeCounter.innerHTML = counter) : "";
  localStorage.setItem("counter", counter);
}
countCartProducts();

function changeProdCounter(ele, id, color, size) {
  let countTxt = ele.parentNode.children[1];
  let product = chosenProducts.find((prod) => {
    return (
      prod.id == id && prod.chosenColor == color && prod.chosenSize == size
    );
  });

  if (ele.value == "+") {
    countTxt.innerHTML++;
  }
  // decrease counter
  else {
    if (+countTxt.innerHTML != 1) {
      +countTxt.innerHTML--;
    }
  }
  product.count = +countTxt.innerHTML;

  if (page == "cart") {
    calculateTotalPrice();
  }
  localStorage.setItem("cartProducts", JSON.stringify(chosenProducts));
  countCartProducts();
}
function removeCartProduct(ele, id, color, size) {
  let product = chosenProducts.findIndex((prod) => {
    return (
      prod.id == id && prod.chosenColor == color && prod.chosenSize == size
    );
  });
  chosenProducts.splice(product, 1);
  localStorage.setItem("cartProducts", JSON.stringify(chosenProducts));
  fillShoppingCart();
  countCartProducts();
  calculateTotalPrice();
}
// check cart or main
if (page == "main" || page == "products") {
  fillHearts();
} else if (page == "cart") {
  fillShoppingCart();
}

// search
let searchInp = document.querySelector("#searchInp");
let searchSelect = document.querySelector(".searchSelect");
if (searchInp) {
  searchInp.addEventListener("keyup", function () {
    if (searchSelect.value == "name") {
      getProductsByName();
    } else {
      getProductsByCat();
    }
  });
}

function getProductsByName() {
  let prods = products.filter((ele) => {
    let prodName = ele.name.toLowerCase();
    return prodName.includes(searchInp.value.toLowerCase());
  });
  let search = true;
  fillHearts(0, 8, prods, search);
  paginationFun(true, prods);
}
function getProductsByCat() {
  let prods = products.filter((ele) => {
    let prodCat = ele.category.toLowerCase();
    return prodCat.includes(searchInp.value.toLowerCase());
  });
  let search = true;
  fillHearts(0, 8, prods, search);
  paginationFun(true, prods);
}
function changeSearch(ele) {
  if (ele.value == "category") {
    getProductsByCat();
  } else {
    getProductsByName();
  }
}

