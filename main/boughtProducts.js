$(document).ready(function () {
    $('table').hide();
    $('#emptyTable').show()
    $('#listsNav').show();
    $('#loginNav').hide();
    $("#logoutNav").show();
    $("#shareListNav").show();
    $("#boughtProductsNav").show();
    $('#addNewProduct').attr("disabled", true);
    $('#familylistClick').attr("disabled", true);
    $("#logountBtn").on("click", function () {
        location.href = 'logout.php';
    });
    var userEmail = $('.user_email').val();
    let shareLength;

    $.ajax({
        url: "../api/getBoughtProduct.php",
        type: "GET",
        data: ({ email: userEmail }),
        success: function (data) {
            console.log(userEmail);
            if (data.length > 0) {
                $('#emptyTable').hide();
                $('table').show();
                for (item of data) {
                    addBoughtProductsToTable(item['id'], item['Productname'],);
                }
                shareLength = data.length;
            } else {
                $('table').hide();
                $('#emptyTable').show();
            }
        },
        error: function (err) {
            console.log(err);
        }
    });

    function addBoughtProductsToTable(id, Productname) {
        let newRow = `<tr data-id=${id}>`;
        newRow += `<td class="productname">${Productname}</td>`;
        newRow += "<td>";
        newRow += "<button type='button' class='btn btn-success my-button-edit'><i class='fa fa-edit'></i></button>";
        newRow += "<button type='button' class='my-1 my-md-0  mx-0 mx-md-2 btn btn-danger my-button-delete'><i class='fa fa-trash'></i></button>";
        newRow += "</td>";
        newRow += "</tr>";
        $("table#BoughtProducts tbody").append(newRow);
    }

    let staticRow;
    // delete product
    $(document).on("click", '#deleteProductBtn', function () {
        const id = staticRow.data('id');
        $("#deletingshareUserModal").modal("hide");
        shareLength--;
        staticRow.fadeOut(function () {
            $.ajax({
                url: "../api/deleteBoughtProduct.php",
                type: "POST",
                data: ({ id }),
                success: function (data) {
                    staticRow.remove();
                    $('#deletingProductModal').modal('hide');
                },
                error: function (err) {
                    console.log(err);
                }
            })
        });
        if (!shareLength) {
            $('table').hide();
            $('#emptyTable').show();
        }
    });
    // deleting the product and modal alert
    $(document).on("click", '.my-button-delete', function () {
        staticRow = $(this).closest('tr');
        alertModal();
    });

    // open delete alert
    function alertModal() {
        const name = $(staticRow.find('td')[0]).text();
        $('#deletingProductModal').find('.modal-body').text(`Do you want to delete ${name} item?`);
        $('#deletingProductModal').modal('show');
    }

    // update product
    $(document).on("click", '.my-button-edit', function () {
        staticRow = $(this).closest('tr');
        const name = $(staticRow.find('td')[0]).text();
        $('#editingProductModal').find('.modal-title').text(`Editing ${name} item?`);
        $('#editingProductModal').modal('show');
    });
    $("#UpdateProductBtn").click(function () {
        $("form#updateProduct .btnSubmit").click();
    });

    // editing the product
    $("form#updateProduct").submit(function (e) {
        e.preventDefault();
        const productId = staticRow.data('id');
        const productname = $("#name-of-product").val().trim().toLowerCase();
        $.ajax({
            url: "../api/updaeBoughtProduct.php",
            type: "POST",
            data: ({ id: productId, productname, email: userEmail }),
            success: function (data) {
                if (!data) {
                    $("#sameProductName").fadeTo(3000, 500, function () {
                        $(this).slideUp(1000);
                    });
                }
                else {
                    staticRow.remove();
                    addBoughtProductsToTable(productId, productname);
                    console.log(data)
                }
            },
            error: function (err) {
                console.log(err);
            }
        });
    });


});
