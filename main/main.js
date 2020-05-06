// array-ProductsListName
let ProductsListName = ['neta list', 'shahar and alon list']
// array-products
let products = [{
  productName: "mango",
  amount: "2",
  status: "need to buy",
  listName: "shahar and alon list"
},
{
  productName: "avocado",
  amount: "22",
  status: "need to buy",
  listName: "neta list"
},
{
  productName: "banana",
  amount: "12",
  status: "need to buy",
  listName: "shahar and alon list"
}
];
$(document).ready(function () {

  // when the user selected list
  $("#selectedOptions").change(function () {
    const SelectedListName = $('#selectedOptions').find(":selected").text();
    setTableInfo(SelectedListName)
  });


  // set table to selected list
  function setTableInfo(SelectedListName) {
    const table = $("#html_master");
    $('table tbody').empty();
    products.forEach(function (product) {
      const SelectedListName = $('#selectedOptions').find(":selected").text();
      if (product.listName === SelectedListName) {
        let newRow = product.status === "bought" ? "<tr style='text-decoration: line-through ; color:red;'>" : "<tr>";
        newRow += `<td>${product.productName}</td>`;
        newRow += `<td >${product.amount}</td>`;
        newRow += `<td>${product.status}</td>`;
        newRow += "<td>";
        newRow += "<button type='button' class='btn btn-success my-button-edit'><i class='fa fa-edit'></i></button>";
        newRow += product.status === "bought" ? "<button type='button' class='my-1 my-md-0  mx-0 mx-md-2 btn btn-danger my-button-delete disabled'><i class='fa fa-trash'></i></button>" : "<button type='button' class='my-1 my-md-0  mx-0 mx-md-2 btn btn-danger my-button-delete'><i class='fa fa-trash'></i></button>";
        newRow += "</td>";
        newRow += "</tr>";
        table.append(newRow);
      }
    });
  };
  // adding new product to the list and to the table

  $("form#addProduct").submit(function (e) {
    e.preventDefault();
    const SelectedListName = $('#selectedOptions').find(":selected").text();
    if (SelectedListName !== 'Choose list') {
      const table = $("#html_master");
      const productName = $('#name-of-product').val();
      $('#name-of-product').val("");
      const amount = $('#product-amount').val();
      $('#product-amount').val("");
      const status = "need to buy";
      const listName = $('#selectedOptions').find(":selected").text();
      products.unshift({ productName, amount, status, listName });// adding to the first position in the array
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
    }
    else {
      alert("first choose a list");
    }
  });
  // editing the product from bought to need to buy and from need to buy to bought \
  // also changing the sort and disable able the delete button  
  $(document).on("click", '.my-button-edit', function () {
    const row = $(this).closest('tr'); // parents 
    const name = $(row.find('td')[0]).text();
    const status = $(row.find('td')[2]).text();
    const objIndex = products.findIndex((obj => obj.productName === name));
    if (status === "bought") {
      $(row.find('td')[2]).html('need to buy');
      products[objIndex].status = "need to buy";
      sortTable();
      setTableInfo();
      // attr equal to prop
      // / prop() method sets or returns properties and values of the selected elements.
      //The attr() method sets or returns attributes and values of the selected elements.
    }
    else {
      $(row.find('td')[2]).html('bought');
      products[objIndex].status = "bought";
      sortTable();
      setTableInfo();
    }
  });
  // deleting the product from the list and from the array
  $(document).on("click", '.my-button-delete', function () {
    const row = $(this).closest('tr');
    const name = $(row.find('td')[0]).text();
    const SelectedListName = $('#selectedOptions').find(":selected").text();
    const result = products.filter(obj => (obj.productName === name && obj.status === SelectedListName));
    const objIndex = products.findIndex((obj => (obj.productName === name && obj.status === SelectedListName)));
    products.splice(objIndex, 1) // this is how to remove an item
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
    const flag = ProductsListName.includes(optionValue);
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
    }

  });
  // sorting the table when editing  a product
  function sortTable() {
    products.sort(function (a, b) {
      if (a.status > b.status)
        return -1;
      return 1;
    });
    $('table tbody').empty();
    const SelectedListName = $('#selectedOptions').find(":selected").text();
    setTableInfo(SelectedListName)
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

  let productsAutoComplete = ["banana", "apple", "Açaí", "mango", "Avocado", "Coconut Meat", "Grapes", "Lemon", "Lychee", "Papaya", "Peaches", "Pineapple", "Pomegranate", "Watermelon"];
  autocomplete(document.getElementById("name-of-product"), productsAutoComplete);

});
