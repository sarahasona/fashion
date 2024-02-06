// get number of pages
let currentPage = 1;
// let productsPerPage = 5;
let productsPerPage = page == "products" ? 8 : 5;
let pages;
let pagList = document.querySelector(".pagination");
let search = false;
let prodLst = products;
function paginationFun(searched = false, prodList = []) {
  pagList.innerHTML = "";
  if (page == "products") {
    if (searched) {
      pages = Math.ceil(prodList.length / productsPerPage);
      search = true;
      prodLst = prodList ? prodList : products;
    } else {
      pages = Math.ceil(products.length / productsPerPage); //  number of products per page
    }
  } else {
    pages = Math.ceil(chosenProducts.length / productsPerPage); // 5 number of products per page
  }
  if (pages > 1) {
    pagList.innerHTML += `<li class="page-item">
    <a class="page-link" role='button' aria-label="Previous" onclick="changeActive(this)">
      previous
    </a>
  </li>
  <li class="page-item next">
  <a class="page-link" role='button' aria-label="Next" onclick="changeActive(this)">
    next
  </a>
  </li>`;
  }
  let nextEle = document.querySelector(".next");
  for (var i = 1; i <= pages; i++) {
    let li = document.createElement("li");
    li.setAttribute("class", "page-item");
    i == 1
      ? (li.innerHTML = `<a class="page-link active" role='button' onclick="changeActive(this)">
    ${i}
  </a>`)
      : (li.innerHTML = `<a class="page-link" role='button' onclick="changeActive(this)">
        ${i}
      </a>`);
    if (nextEle) {
      nextEle.before(li);
    }
  }
  let childLi = pagList.children;
  [...childLi].forEach((ele) => {
    ele.addEventListener("click", function () {
      let clickedEle = ele.firstElementChild.innerHTML.trim();
      if (clickedEle == "previous") {
        currentPage = currentPage > 1 ? currentPage - 1 : currentPage;
      } else if (clickedEle == "next") {
        currentPage =
          currentPage < pages && currentPage != ""
            ? currentPage + 1
            : currentPage;
      } else {
        if (currentPage != clickedEle) {
          currentPage = clickedEle;
        }
      }
      if (currentPage != "") {
        let start = currentPage * productsPerPage - productsPerPage;
        let end = currentPage * productsPerPage;
        if (page == "products") {
          if (search) {
            fillHearts(start, end, prodLst, search);
          } else {
            fillHearts(start, end);
          }
        } else {
          fillTable(start, end);
        }
      }
    });
  });
}
paginationFun();
function changeActive(ele) {
  let a = document.querySelectorAll(".pagination a");
  let x = [...a].find((e) => {
    return e.innerHTML.trim() == currentPage;
  });
  a.forEach((an) => {
    if (an.innerHTML.trim() == "previous" && currentPage > 1 && an == ele) {
      x.classList.remove("active");
      x.parentNode.previousSibling.firstChild.classList.add("active");
    } else if (
      an.innerHTML.trim() == "next" &&
      currentPage < pages &&
      an == ele
    ) {
      x.parentNode.nextSibling.firstChild.classList.add("active");
      x.classList.remove("active");
    } else if (
      an.innerHTML.trim() != "next" &&
      an.innerHTML.trim() != "previous"
    ) {
      an == ele ? an.classList.add("active") : an.classList.remove("active");
    }
  });
}
