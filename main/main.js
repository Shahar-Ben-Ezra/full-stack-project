// array-ProductsListName
let ProductsListName = ['neta list', 'shahar and alon list']
// array-products
let ListProducts = [
  {
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

  // when the user selected list
  $("#selectedOptions").change(function () {
    const SelectedListName = $('#selectedOptions').find(":selected").text().trim();
    const obj = ListProducts.find(obj => (obj.listName === SelectedListName));
    if (obj?.products) {
      setTableInfo(obj.products)
    }
    else {
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
    }
    else {
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
      if (amount>0) {
        if (result?.products.filter(obj => (obj.productName.toLowerCase() === productName.toLowerCase())).length) {
          alert('you already have this product in your current list')

        } else {
          $('#product-amount').val("");
          $('#name-of-product').val("");
          result?.products.unshift({ productName, amount, status, SelectedListName });// adding to the first position in the array
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
    }
    else {
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
    }
    else {
      $(row.find('td')[2]).html('bought');
      specificList.products.find((obj => obj.productName === name)).status = "bought";
      sortTable(specificList.products);
    }
  });
  // deleting the product from the list and from the array
  $(document).on("click", '.my-button-delete', function () {
    const row = $(this).closest('tr');
    const name = $(row.find('td')[0]).text();
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
    $(this).closest('tr').remove();
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

    }
    else {
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

  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  function autocomplete(inp, arr) {
    let currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function (e) {
      let a, b, i, val = this.value;
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      if (!val) { return false; }
      currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      /*append the DIV element as a child of the autocomplete container:*/
      this.parentNode.appendChild(a);
      /*for each item in the array...*/
      for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          /*create a DIV element for each matching element:*/
          b = document.createElement("DIV");
          /*make the matching letters bold:*/
          b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].substr(val.length);
          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          /*execute a function when someone clicks on the item value (DIV element):*/
          b.addEventListener("click", function (e) {
            /*insert the value for the autocomplete text field:*/
            inp.value = this.getElementsByTagName("input")[0].value;
            /*close the list of autocompleted values,
            (or any other open lists of autocompleted values:*/
            closeAllLists();
          });
          a.appendChild(b);
        }
      }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function (e) {
      let x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
    });
    function addActive(x) {
      /*a function to classify an item as "active":*/
      if (!x) return false;
      /*start by removing the "active" class on all items:*/
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      /*add class "autocomplete-active":*/
      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      /*a function to remove the "active" class from all autocomplete items:*/
      for (let i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      /*close all autocomplete lists in the document,
      except the one passed as an argument:*/
      let x = document.getElementsByClassName("autocomplete-items");
      for (let i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
          x[i].parentNode.removeChild(x[i]);
        }
      }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
      closeAllLists(e.target);
    });
  };

  let productsAutoComplete = ['wheat', 'rye', 'oats', 'corn', 'barley', 'buckwheat', 'rice', 'rolls', 'buns', 'cakes', 'cookies', 'pies', 'cereal',
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


  autocomplete(document.getElementById("name-of-product"), productsAutoComplete);

});
