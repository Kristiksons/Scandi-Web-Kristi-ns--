<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Product List</title>
  <link rel="stylesheet" href="style.css">
</head>
<footer>
  <p>Scandiweb Test Assignment &copy; 2025</p>
</footer>
<body>
  <h1>Product List</h1>

  <button id="add-btn" onclick="goToAddPage()">ADD</button>
  <button id="delete-product-btn" onclick="massDelete()">MASS DELETE</button>

  <div id="product-container">
    <!-- Products will be shown here -->
  </div>

<p><?php echo "The current PHP version in use is" . phpversion(); ?></p>

  <script src="script.js"></script>
</body>
</html>