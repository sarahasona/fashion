let slides;
let wishListCards = document.querySelector(".wishList .multiple-items");
let wishlist = document.querySelector(".wishList");
function drawWishList() {
  if (wishList.length > 0) {
    wishListCards.innerHTML = "";
    let num = 3; // 3 element per carosal
    slides = Math.ceil(wishList.length / num);
    wishList.forEach((element) => {
      let prod = products.find((ele) => {
        return ele.id == element;
      });
      wishListCards.innerHTML += `
      <div class="card slide-${element}">
        <img src="${prod.image}" class="card-img-top" alt="...">  
        <div class="card-body position-relative" style='min-height:150px'>
          <p class="card-title text-light-emphasis" style='min-height:50px'>${prod.name}</p>
          <p class="card-text text-primary-emphasis">Category: <span class='text-body-secondary'>${prod.category}</span></p>
          <a role="button" class='position-absolute wish-fav' data-bs-toggle="tooltip" data-bs-title="add to whishlist" onclick='addToWishList(${element},this)'>
            <i class="fas fa-heart" id="wish-${element}"></i>
        </a>
        </div>
      `;
    });
  } else {
    wishlist.setAttribute("style", "display:none");
  }
}
drawWishList();
