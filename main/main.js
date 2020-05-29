// array-ProductsListName
let ProductsListName = ['neta list', 'shahar and alon list']
// array-products
let ListProducts = [{
  listName: "neta list",
  products: [{
    productName: "avocado",
    amount: "11",
    status: "need to buy",
  }, {
    productName: "banana",
    amount: "12",
    status: "need to buy",

  }]
},
{
  listName: "shahar and alon list",
  products: [{
    productName: "apple",
    amount: "11",
    status: "need to buy",
  }, {
    productName: "banana",
    amount: "12",
    status: "need to buy",

  }]
}
];

$(document).ready(function () {
  $('table').hide();
  $('#emptyTable').show();

  $("#logountBtn").on("click", function () {
    location.href = '../index.html';
    localStorage.setItem("emailPass", 'a');
  });
  // when the user selected list
  $("#selectedOptions").change(function () {
    const SelectedListName = $('#selectedOptions').find(":selected").text().trim();
    const obj = ListProducts.find(obj => (obj.listName === SelectedListName));
    if (obj?.products) {
      setTableInfo(obj.products)
    } else {
      $('table tbody').empty();
      $('table').hide();
      $('#emptyTable').show();

    }
  });


  // set table to selected list
  function setTableInfo(products) {
    if (products.length) {
      $('#emptyTable').hide();
      const table = $("#html_master");
      $('table tbody').empty();
      $('table').show();
      products.forEach(function (product) {
        let newRow = product.status === "bought" ? "<tr style='text-decoration: line-through ; color:red;'>" : "<tr>";
        newRow += `<td>${product.productName}</td>`;
        newRow += `<td >${product.amount}</td>`;
        newRow += `<td>${product.status}</td>`;
        newRow += "<td>";
        newRow += "<button type='button' class='btn btn-success my-button-edit'><i class='fa fa-edit'></i></button>";
        newRow += product.status === "bought" ? "<button type='button' class='my-1 my-md-0  mx-0 mx-md-2 btn btn-danger my-button-delete' disabled='true' ><i class='fa fa-trash'></i></button>" : "<button type='button' class='my-1 my-md-0  mx-0 mx-md-2 btn btn-danger my-button-delete'><i class='fa fa-trash'></i></button>";
        newRow += "</td>";
        newRow += "</tr>";
        table.append(newRow);
      });
    } else {
      $('table tbody').empty();
      $('table').hide();
      $('#emptyTable').show();

    }


  };
  // adding new product to the list and to the table
  //ListProducts
  $("form#addProduct").submit(function (e) {
    e.preventDefault();
    const SelectedListName = $('#selectedOptions').find(":selected").text().trim();
    if (SelectedListName !== 'Choose list') {
      const table = $("#html_master");
      const productName = $('#name-of-product').val();
      const amount = $('#product-amount').val();
      const status = "need to buy";
      const result = ListProducts.find(obj => (obj.listName === SelectedListName));
      if (amount > 0) {
        if (result?.products.filter(obj => (obj.productName.toLowerCase() === productName.toLowerCase())).length) {
          alert('you already have this product in your current list')

        } else {
          $('#product-amount').val("");
          $('#name-of-product').val("");
          result?.products.unshift({ productName, amount, status, SelectedListName }); // adding to the first position in the array
          let newRow = "<tr>";
          newRow += `<td>${productName}</td>`;
          newRow += `<td >${amount}</td>`;
          newRow += `<td>${status}</td>`;
          newRow += "<td>";
          newRow += "<button type='button' class='btn btn-success my-button-edit'><i class='fa fa-edit'></i></button>";
          newRow += "<button type='button' class='my-1 my-md-0  mx-0 mx-md-2 btn btn-danger my-button-delete'><i class='fa fa-trash'></i></button>";
          newRow += "</td>";
          newRow += "</tr>";
          table.prepend(newRow);
          $("#name-of-product").focus();
          alert(`you added ${productName}`);
          $('table').show();
          $('#emptyTable').hide();
        }
      } else {
        alert('you cannot add a negative amount')
      }
    } else {
      alert("first choose a list");
    }
  });
  // editing the product from bought to need to buy and from need to buy to bought \
  // also changing the sort and disable able the delete button  
  $(document).on("click", '.my-button-edit', function () {
    const SelectedListName = $('#selectedOptions').find(":selected").text().trim();
    const row = $(this).closest('tr'); // parents 
    const name = $(row.find('td')[0]).text();
    const status = $(row.find('td')[2]).text();
    const specificList = ListProducts.find((obj => obj.listName === SelectedListName));
    if (status === "bought") {
      $(row.find('td')[2]).html('need to buy');
      specificList.products.find((obj => obj.productName === name)).status = "need to buy";
      sortTable(specificList.products);
      // attr equal to prop
      // / prop() method sets or returns properties and values of the selected elements.
      //The attr() method sets or returns attributes and values of the selected elements.
    } else {
      $(row.find('td')[2]).html('bought');
      specificList.products.find((obj => obj.productName === name)).status = "bought";
      sortTable(specificList.products);
    }
  });

  function alartModal() {
    const name = $(staticRow.find('td')[0]).text();
    $('#deletingProductModal').find('.modal-body').text(`do you want to delete ${name} ?`)

    $('#deletingProductModal').modal('toggle')
  }

  let staticRow;

  $(document).on("click", '#deleteProductBtn', function () {
    const name = $(staticRow.find('td')[0]).text();
    const SelectedListName = $('#selectedOptions').find(":selected").text().trim();
    const result = ListProducts.find(obj => (obj.listName === SelectedListName));
    const objIndex = result.products.findIndex(obj => (obj.productName === name))
    result.products.splice(objIndex, 1) // this is how to remove an item

    if (!result.products.length) {
      $('table').hide();
      $('#emptyTable').show();

    }
    if (result.products.length < 2) {
      $("table").css("margin-button : 500px!important");

    }
    $(staticRow).remove();
    $('#deletingProductModal').modal('hide')

  });
  // deleting the product from the list and from the array
  $(document).on("click", '.my-button-delete', function () {
    const row = $(this).closest('tr');
    staticRow = row;
    alartModal();

  });
  // hover on the table 
  $(document).on(' mouseenter mouseleave', 'tbody tr', function () {
    $(this).toggleClass('highlight')
      .css('cursor', 'pointer');
  });
  // hover on the list
  $("#listClick").on("click", function () {
    $("#addingNewListSection").toggle();
  });
  // hideing the  adding list options
  $("#cancelAddList").on("click", function () {
    $("#addingNewListSection").hide();
  });

  // adding a new list name to the Products list name 
  $("form#addNewListName").submit(function (e) {
    e.preventDefault();
    const optionValue = $('#nameOfNewList').val();
    const flag = ProductsListName.includes(optionValue.toLowerCase());
    if (flag) {
      alert(`you allready have a list that called  ${optionValue}`);

    } else {
      $('#nameOfNewList ').val("");
      $('#selectedOptions').append(`<option value="${optionValue}"> 
                                      ${optionValue} </option>`);
      $("#nameOfNewList").focus();
      alert(`you added ${optionValue}`);
      ProductsListName.push(optionValue);
      ListProducts.push({
        listName: optionValue,
        products: []
      })
    }

  });
  // sorting the table when editing  a product
  function sortTable(products) {
    products.sort(function (a, b) {
      if (a.status > b.status)
        return -1;
      return 1;
    });
    $('table tbody').empty();
    setTableInfo(products)
  }
  //auto complete
  (function () {
    var productsAutoComplete = ['wheat', 'rye', 'oats', 'corn', 'barley', 'buckwheat', 'rice', 'rolls', 'buns', 'cakes', 'cookies', 'pies', 'cereal',
      'corn flakes', 'oat flakes', 'wheat flakes', 'rice flakes', 'muesli', 'popcorn', 'pasta', 'macaroni', 'noodles', 'spaghetti', 'vermicelli',
      'ravioli', 'dumplings', 'flour', 'dough', 'bread', 'white bread', 'whole-wheatbread', 'rye bread', 'raisin bread', 'garlic bread', 'corn bread',
      'pita bread', 'tortilla', 'buns', 'croissant', 'bagel', 'hamburger bun', 'hot dog bun', 'cracker', 'biscuit', 'cookie', 'toast', 'pretzel', 'waffle',
      'crouton', 'cake', 'chocolate cake', 'honey cake', 'coffee cake', 'oatmeal cookie', 'chocolate cookie', 'pie', 'apple pie', 'blueberry pie',
      'cherry pie', 'homemade pie', 'tart', 'apple tart', 'pizza', 'muffin', 'pancake', 'meat', 'beef', 'pork', 'veal', 'lamb', 'mutton', 'beefsteak', 'roast beef',
      'ground beef', 'hamburger', 'spare rib', 'lamb chop', 'veal cutlet', 'pastrami', 'cornedbeef', 'sausage', 'salami', 'smoked sausage', 'Bologna', 'hotdogs',
      'chicken', 'turkey', 'eggs', 'chicken leg', 'drumstick', 'chicken wing', 'chicken breast', 'turkey breast', 'fish', 'salmon', 'trout', 'sturgeon',
      'cod', 'tuna', 'mackerel', 'anchovy', 'mullet', 'carp', 'sardine', 'salmon steak', 'smoked fish', 'salted fish', 'milk', 'whole milk',
      'low-fat milk', 'nonfat milk', 'pasteurized milk', 'yogurt', 'kefir', 'sourmilk', 'butter milk', 'cream', 'sour cream', 'butter',
      'cottage cheese', 'Cheddar cheese', 'Mozzarella chesse', 'Roquefort cheese', 'blue cheese', 'ice cream', 'vanilla ice cream', 'chocolate ice cream',
      'fruit ice', 'strawberry ice cream', 'ice-cream cone', 'popsicle', 'berries', 'dried fruit', 'nuts', 'fresh fruit', 'apple', 'pear', 'apricot', 'peach',
      'nectarine', 'plum', 'grapes', 'cherry', 'sweetcherry', 'lemon', 'lime', 'orange', 'tangerine', 'grapefruit', 'banana', 'kiwi', 'pineapple', 'olive',
      'fig', 'papaya', 'mango', 'avocado', 'coconut', 'persimmon', 'pomegranate', 'melon', 'watermelon', 'berry', 'berries', 'strawberry', 'raspberry',
      'cranberry', 'blueberry', 'dried fruit', 'dried apricots', 'raisins', 'figs', 'prunes', 'dates', 'candied fruit', 'nuts', 'hazelnuts', 'walnuts',
      'almonds', 'chestnuts', 'peanuts', 'pistachio nuts', 'cashew nuts', 'pecans', 'macadamia nuts', 'apricot pits', 'pumpkin seeds', 'sunflower seeds',
      'raspberry jam', 'cranberry jam', 'grape jelly', 'marmalade', 'honey', 'maple syrup', 'peanut butter', 'herbs', 'vegetables', 'fresh vegetables', 'salad',
      'vegetables', 'canned vegetables', 'leaf vegetables', 'leafy greens', 'greens', 'tomato', 'cucumber', 'carrot', 'beet', 'potato', 'onion', 'green onions',
      'leek', 'sweet pepper', 'red pepper', 'green pepper', 'yellow pepper', 'paprika', 'hotpepper', 'chili pepper', 'cabbage', 'cauliflower', 'broccoli',
      'Brussels sprouts', 'collard', 'kale', 'kohlrabi', 'mushrooms', 'lettuce', 'spinach', 'celery', 'asparagus', 'artichoke', 'cress', 'watercress', 'garlic',
      'eggplant', 'aubergine', 'squash', 'gourd', 'zucchini', 'pumpkin', 'turnip', 'radish', 'pickled cucumbers', 'pickles', 'marinated cucumbers', 'sauerkraut',
      'canned olives', 'peas', 'corn', 'green peas', 'sweet peas', 'green beans', 'lima beans', 'kidney beans', 'black beans', 'soybeans', 'lentil',
      'corn', 'sweet corn', 'maize', 'coffee beans', 'parsley', 'basil', 'coriander', 'mint', 'fruit juice', 'beverages', 'drinks', 'applejuice',
      'orange juice', 'grapefruit juice', 'lemon juice', 'tomato juice', 'fresh fruit juice', 'tea', 'green tea', 'black tea', 'tea with milk',
      'iced tea', 'herbaltea', 'mint tea', 'Indian tea', 'coffee', 'instant coffee', 'espresso', 'cappuccino', 'decaffeinated coffee', 'black coffee',
      'cocoa', 'hot chocolate', 'milk shake', 'water', 'mineral water', 'spring water', 'soft drink', 'soda water', 'lemonade', 'cider', 'ginger ale',
      'alcoholic drinks', 'liquor', 'beer', 'ale', 'wine', 'red wine', 'white wine', 'champagne', 'vodka', 'cognac', 'brandy', 'whiskey', 'whisky',
      'gin', 'rum', 'liqueur', 'cocktail', 'punch', 'sauces', 'salad dressings', 'vegetable oils', 'fats', 'tomato sauce', 'ketchup', 'mushroom sauce',
      'meat sauce', 'steak sauce', 'gravy', 'spaghetti sauce', 'hot sauce', 'chili sauce', 'barbecue sauce', 'sweet-and-sour sauce', 'spicy sauce',
      'garlic sauce', 'white sauce', 'dip sauce', 'soy sauce', 'apple sauce', 'cranberry sauce', 'mayonnaise', 'salad dressing', 'vegetable oil',
      'olive oil', 'corn oil', 'sunflower seed oil', 'sesame oil', 'margarine', 'grease', 'fat', 'animal fat', 'vegetable fat', 'seasoning',
      'spices', 'flavoring', 'herbs', 'seeds', 'vinegar', 'pepper', 'ground pepper', 'whole pepper', 'red pepper', 'hot pepper', 'chili pepper',
      'salt', 'parsley', 'mint', 'coriander', 'basil', 'bay leaf', 'cloves', 'cinnamon', 'caraway', 'thyme', 'cardamom', 'tarragon', 'oregano', 'marjoram',
      'rosemary', 'garlic', 'mustard', 'lemon peel', 'candy', 'candies', 'sweets', 'caramels', 'mint drops', 'jelly beans', 'lollipop', 'bonbons',
      'chocolate candies', 'chocolate', 'chocolate bar', 'candy bar', 'marshmallow'];

    $("#name-of-product").autocomplete({
      source: productsAutoComplete
    });

    // Overrides the default autocomplete filter function to search only from the beginning of the string
    //Finds the elements of an array which satisfy a filter function. The original array is not affected
    $.ui.autocomplete.filter = function (array, term) {
      var matcher = new RegExp("^" + $.ui.autocomplete.escapeRegex(term), "i");
      return $.grep(array, function (value) {
        return matcher.test(value.label || value.value || value);
      });//The test() method tests for a match in a string.

      /* The $.grep() method removes items from an array as necessary so that all
          remaining items pass a provided test. The test is a function that is passed an array
           item and the index of the item within the array. Only if the test returns true will
           the item be in the result array.*/
    };
  })();

});