function goToAddPage() {
  window.location.href = "add-product.html";
}

function goBack() {
  window.location.href = "index.html";
}

function showFields() {
  var type = document.getElementById("productType").value;
  var sections = document.getElementsByClassName("product-type");
  var i = 0;

  while (i < sections.length) {
    sections[i].style.display = "none";
    i++;
  }

  if (type !== "") {
    document.getElementById(type).style.display = "block";
  }
}

function saveProduct(event) {
  event.preventDefault();

  var sku = document.getElementById("sku").value;
  var name = document.getElementById("name").value;
  var price = document.getElementById("price").value;
  var type = document.getElementById("productType").value;

  var product = {
    sku: sku,
    name: name,
    price: price,
    type: type
  };

  if (type === "DVD") {
    product.size = document.getElementById("size").value;
  } else if (type === "Book") {
    product.weight = document.getElementById("weight").value;
  } else if (type === "Furniture") {
    product.height = document.getElementById("height").value;
    product.width = document.getElementById("width").value;
    product.length = document.getElementById("length").value;
  }

  var products = JSON.parse(localStorage.getItem("products") || "[]");
  products.push(product);
  localStorage.setItem("products", JSON.stringify(products));

  window.location.href = "index.html";
}

function loadProducts() {
  var products = JSON.parse(localStorage.getItem("products") || "[]");

  // Sort by SKU (primary key)
  products.sort(function(a, b) {
    return a.sku.localeCompare(b.sku);
  });

  var container = document.getElementById("product-container");
  if (!container) return;

  var i = 0;
  while (i < products.length) {
    var p = products[i];
    var box = document.createElement("div");
    box.className = "product-box";

    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "delete-checkbox";
    checkbox.value = p.sku;

    var info = p.sku + "<br>" + p.name + "<br>" + p.price + " $<br>";

    if (p.type === "DVD") {
      info += "Size: " + p.size + " MB";
    } else if (p.type === "Book") {
      info += "Weight: " + p.weight + " KG";
    } else if (p.type === "Furniture") {
      info += "Dimension: " + p.height + "x" + p.width + "x" + p.length;
    }

    box.appendChild(checkbox);

    var details = document.createElement("p");
    details.innerHTML = info;
    box.appendChild(details);

    container.appendChild(box);
    i++;
  }
}

function massDelete() {
  var checkboxes = document.getElementsByClassName("delete-checkbox");
  var products = JSON.parse(localStorage.getItem("products") || "[]");
  var toDelete = [];

  var i = 0;
  while (i < checkboxes.length) {
    if (checkboxes[i].checked) {
      toDelete.push(checkboxes[i].value);
    }
    i++;
  }

  var newProducts = [];
  var j = 0;
  while (j < products.length) {
    if (!toDelete.includes(products[j].sku)) {
      newProducts.push(products[j]);
    }
    j++;
  }

  localStorage.setItem("products", JSON.stringify(newProducts));
  location.reload(); // Reload to update the list
}

// Auto-load products on list page
window.onload = function() {
  loadProducts();
};
