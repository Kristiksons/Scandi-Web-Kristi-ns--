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

  fetch("save-product.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(product)
  })
  .then(function(response) {
    if (response.ok) {
      window.location.href = "index.html";
    } else {
      alert("Failed to save product.");
    }
  })
  .catch(function(error) {
    console.error("Error:", error);
    alert("An error occurred.");
  });
}
