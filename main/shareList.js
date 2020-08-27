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

    var userEmail = $('.user_email').val();
    let shareLength;

    $("#selectedOptions").change(function () {
        const listId = $('#selectedOptions').find(":selected").data('id');
        $('table tbody').empty();
        $.ajax({
            url: "../api/findSharedListCreator.php",
            type: "GET",
            data: ({ listId, email: userEmail }),
            success: function (data) {
                if (data.length > 0) {
                    $('#emptyTable').hide();
                    $('table').show();
                    for (item of data) {
                        addUserShareListToTable(item['id'], item['idUsers'],);
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
    });

    function addUserShareListToTable(id, UserEmail) {
        let newRow = `<tr data-id=${id}>`;
        newRow += `<td class="UserEmail">${UserEmail}</td>`;
        newRow += "<td>";
        newRow += "<button type='button' class='my-1 my-md-0  mx-0 mx-md-2 btn btn-danger my-button-delete'><i class='fa fa-trash'></i></button>";
        newRow += "</td>";
        newRow += "</tr>";
        $("table#usersShare tbody").append(newRow);
    }

    let staticRow;
    // remove share
    $(document).on("click", '#deleteProductBtn', function () {
        const id = staticRow.data('id');
        $("#deletingshareUserModal").modal("hide");
        shareLength--;
        staticRow.fadeOut(function () {
            $.ajax({
                url: "../api/deleteShare.php",
                type: "POST",
                data: ({ id }),
                success: function (data) {
                    staticRow.remove();
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

    // deleting the shareUser modal alert
    $(document).on("click", '.my-button-delete', function () {
        staticRow = $(this).closest('tr');
        alertModal();
    });

    // open delete alert
    function alertModal() {
        const name = $(staticRow.find('td')[0]).text();
        $('#deletingshareUserModal').find('.modal-body').text(`Do you want to stop share the list with user ${name} ?`);
        $('#deletingshareUserModal').modal('show');
    }

});
