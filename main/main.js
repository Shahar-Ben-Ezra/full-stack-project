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
  $("#success-alert").hide();
  $('table').hide();
  $('#emptyTable').show()
  $('#listsNav').show();
  $('#loginNav').hide();
  $("#logoutNav").css("visibility", "visible")
  $("#listsNav").css("visibility", "visible")
  $('#addNewProduct').attr("disabled", true);
  $("#logountBtn").on("click", function () {
    location.href = 'logout.php';
  });
  var userEmail = $('.user_email').val();

  let SelectedListId;
  let productsLength = 0;

  // when the user selected list
  $("#selectedOptions").change(function () {
    $('#addNewProduct').attr("disabled", false);
    SelectedListId = $('#selectedOptions').find(":selected").data('id');
    autocomplete();
    $('table tbody').empty();
    $.ajax({
      url: "../api/getProducts.php",
      type: "POST",
      data: ({ id: SelectedListId }),
      success: function (data) {
        if (data.length > 0) {
          $('#emptyTable').hide();
          $('table').show();
          productsLength = data.length;
          for (item of data) {
            product = { "productname": item['Productname'], "amount": item['amount'], "statusProduct": item['statusProduct'], "id": item['id'] }
            addProductToTable(product);
          }
        } else {
          $('table').hide();
          $('#emptyTable').show();
        }
      },
      error: function (err) {
        console.log(err);
      }
    });
  });

  function addProductToTable(product) {
    let newRow = product.statusProduct === "bought" ? `<tr data-id=${product.id} style='text-decoration: line-through ; color:red;'>` : `<tr data-id=${product.id}>`;
    newRow += `<td class="productname">${product.productname}</td>`;
    newRow += `<td class="amount">${product.amount}</td>`;
    newRow += `<td class=""statusProduct">${product.statusProduct}</td>`;
    newRow += "<td>";
    newRow += "<button type='button' class='btn btn-success my-button-edit'><i class='fa fa-edit'></i></button>";
    newRow += product.statusProduct === "bought" ? "<button type='button' class='my-1 my-md-0  mx-0 mx-md-2 btn btn-danger my-button-delete' disabled='true' ><i class='fa fa-trash'></i></button>" : "<button type='button' class='my-1 my-md-0  mx-0 mx-md-2 btn btn-danger my-button-delete'><i class='fa fa-trash'></i></button>";
    newRow += "</td>";
    newRow += "</tr>";
    product.statusProduct === "bought" ? $("table#products tbody").append(newRow) : $("table#products tbody").prepend(newRow);
    //prepend up
    // append down
  }

  $("#addProductBtn").click(function () {
    $("form#addProduct .btnSubmit").click();
  })

  //adding new product to the list and to the table
  $("form#addProduct").submit(function (e) {
    e.preventDefault();
    $('table').show();
    $('#emptyTable').hide()
    let productname = $("#name-of-product").val().trim().toLowerCase();
    let amount = $("#product-amount").val();
    const statusProduct = 'Need to buy';
    $.ajax({
      url: "../api/findSpecificProduct.php",
      type: "GET",
      data: ({ SelectedListId, productname }),
      success: function (data) {
        console.log(data);
        if (data) {
          $.ajax({
            url: "../api/addProduct.php",
            type: "post",
            data: ({ productname, amount, SelectedListId, email: userEmail }),
            success: function (data) {
              $("#name-of-product").val("");
              $("#product-amount").val("");
              productsLength++;
              console.log(data);
              let id = data;
              addProductToTable({ id, productname, amount, statusProduct });
            },
            error: function (err) {
              console.log(err);
            }
          })
        }
        else {
          alert("You allready have a product with this name");
        }
      },
      error: function (err) {
        console.log(err);
      }
    })
    $("#name-of-product").focus();
  })  //   const SelectedListName = $('#selectedOptions').find(":selected").text().trim();
  //   if (SelectedListName !== 'Choose list') {
  //     const table = $("#html_master");
  //     const productName = $('#name-of-product').val();
  //     const amount = $('#product-amount').val();
  //     const status = "need to buy";
  //     const result = ListProducts.find(obj => (obj.listName === SelectedListName));
  //     if (amount > 0) {
  //       if (result?.products.filter(obj => (obj.productName.toLowerCase() === productName.toLowerCase())).length) {
  //         alert('you already have this product in your current list')

  //       } else {
  //         // $('#product-amount').val("");
  //         // $('#name-of-product').val("");
  //         result?.products.unshift({ productName, amount, status, SelectedListName }); // adding to the first position in the array
  //         let newRow = "<tr>";
  //         newRow += `<td>${productName}</td>`;
  //         newRow += `<td >${amount}</td>`;
  //         newRow += `<td>${status}</td>`;
  //         newRow += "<td>";
  //         newRow += "<button type='button' class='btn btn-success my-button-edit'><i class='fa fa-edit'></i></button>";
  //         newRow += "<button type='button' class='my-1 my-md-0  mx-0 mx-md-2 btn btn-danger my-button-delete'><i class='fa fa-trash'></i></button>";
  //         newRow += "</td>";
  //         newRow += "</tr>";
  //         table.prepend(newRow);
  //         $("#name-of-product").focus();
  //         alert(`you added ${productName}`);
  //         $('table').show();
  //         $('#emptyTable').hide();
  //         $('#addingProductModal').modal('hide');

  //       }
  //     } else {
  //       alert('you cannot add a negative amount')
  //     }
  //   } else {
  //     alert("first choose a list");
  //   }

  // editing the product from bought to need to buy and from need to buy to bought
  // also changing the sort and disable able the delete button  
  $(document).on("click", '.my-button-edit', function () {
    const row = $(this).closest('tr'); // parents 
    let statusProduct = $(row.find('td')[2]).text();
    const productname = $(row.find('td')[0]).text();
    const amount = $(row.find('td')[1]).text();
    const id = row.data('id');
    statusProduct = statusProduct === 'Need to buy' ? 'bought' : 'Need to buy';
    $.ajax({
      url: "../api/updateProduct.php",
      type: "POST",
      data: ({ id, statusProduct }),
      success: function (data) {
        row.remove();
        addProductToTable({ id, productname, amount, statusProduct });
        console.log(data)
      },
      error: function (err) {
        console.log(err);
      }
    });
  });

  function alertModal() {
    const name = $(staticRow.find('td')[0]).text();
    $('#deletingProductModal').find('.modal-body').text(`do you want to delete ${name} ?`);
    $('#deletingProductModal').modal('show');
  }

  let staticRow;

  // delete product
  $(document).on("click", '#deleteProductBtn', function () {
    const id = staticRow.data('id');
    $("#deletingProductModal").modal("hide");
    productsLength--;
    staticRow.fadeOut(function () {
      $.ajax({
        url: "../api/deleteProduct.php",
        type: "POST",
        data: ({ id }),
        success: function (data) {
          staticRow.remove();
          console.log(data)
        },
        error: function (err) {
          console.log(err);
        }
      })
    });
    if (!productsLength) {
      $('table').hide();
      $('#emptyTable').show();
    }

    // const name = $(staticRow.find('td')[0]).text();
    // const SelectedListName = $('#selectedOptions').find(":selected").text().trim();
    // const result = ListProducts.find(obj => (obj.listName === SelectedListName));
    // const objIndex = result.products.findIndex(obj => (obj.productName === name))
    // result.products.splice(objIndex, 1) // this is how to remove an item

    // if (!result.products.length) {
    //   $('table').hide();
    //   $('#emptyTable').show();

    // }
    // if (result.products.length < 2) {
    //   $("table").css("margin-button : 500px!important");

    // }
    // $(staticRow).remove();
    // $('#deletingProductModal').modal('hide')

  });

  // deleting the product modal alert
  $(document).on("click", '.my-button-delete', function () {
    staticRow = $(this).closest('tr');
    alertModal();
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

  // keeping new list obj to add it to selects in the modal 
  var listobj = { id: "data", name: "newList" };

  // adding a new list 
  $("form#addNewListName").submit(function (e) {
    e.preventDefault();
    const newList = $('#nameOfNewList').val().trim().toLowerCase();
    $.ajax({
      url: "../api/findSpecificList.php",
      type: "GET",
      data: ({ newList, userEmail }),
      success: function (data) {
        console.log(data);
        if (data) {
          $.ajax({
            url: "../api/addList.php",
            type: "post",
            data: ({ newList, userEmail }),
            success: function (data) {
              listobj = { id: data, name: newList };
              $('#addingProductFromCurrentList').find('.modal-title').text(`You succeeded to add ${newList} list`);
              $("#addingProductFromCurrentList").modal('show');
              console.log(data);
              $('#addNewProduct').attr("disabled", false);
              $('#selectedOptions').append(`<option data-id="${data}" selected>${newList}</option>`);
              SelectedListId = data;
              $('table tbody').empty();
              $('table').hide();
              $('#emptyTable').show();
              $("#nameOfNewList").focus();
              $('#nameOfNewList').val("");
            },
            error: function (err) {
              console.log(err);
            }
          })
        }
        else {
          //.fadeTo( duration, opacity [, complete A CB ] )
          $("#danger-alert").fadeTo(2000, 500, function () {
            $(this).slideUp(1000);
          });
        }

      },
    error: function (err) {
      console.log(err);
    }
    })
$("#firstName").focus();
  });

$(".exitFromModalWitoutDuplicate").click(function () {
  $('#selectedOptionsModal').append(`<option data-id="${listobj}" selected>${listobj}</option>`);
  $("#addingProductFromCurrentList").modal("hide");
});

$("#addingProductsFrom1list2Another").click(function () {
  const id = $('#selectedOptionsModal').find(":selected").data('id');
  $('#selectedOptionsModal').append(`<option data-id="${listobj}" selected>${listobj}</option>`);
  $("#addingProductFromCurrentList").modal("hide");
  $.ajax({
    url: "../api/getProducts.php",
    type: "POST",
    data: ({ id }),
    success: function (data) {
      if (data.length > 0) {
        $('#emptyTable').hide();
        $('table').show();
        productsLength = data.length;
        let products = [];
        index = 0;
        for (item of data) {
          product = { "productname": item['Productname'], "amount": item['amount'], "statusProduct": item['statusProduct'], "id": item['id'] }
          products.push(product);
          $.ajax({
            url: "../api/addProduct.php",
            type: "post",
            data: ({ productname: product.productname, amount: product.amount, SelectedListId, email: userEmail }),
            success: function (data) {
              const product = products[index];
              index++;
              productsLength++;
              console.log(data);
              let id = data;
              addProductToTable({ id, productname: product.productname, amount: product.amount, id: SelectedListId, statusProduct: 'need to buy' });
            },
            error: function (err) {
              console.log(err);
            }
          })
        }
      }
    },
    error: function (err) {
      console.log(err);
    }
  });
});

//auto complete
function autocomplete() {
  var productsAutoComplete = [];
  $.ajax({
    url: "../api/gatAllProducts.php",
    type: "GET",
    data: ({ id: SelectedListId, email: userEmail }),
    success: function (data) {
      if (data.length > 0) {
        for (item of data) {
          if (!productsAutoComplete.includes(item)) {
            productsAutoComplete.push(item);
          }
        }
        console.log(data);
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
      }
    },
    error: function (err) {
      console.log(err);
    }
  })
};
});