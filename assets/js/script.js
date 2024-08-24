$(document).ready(function () {
    function readUsers() {
        $.ajax({
            "url": "http://localhost:5000/users",
            "method": "GET",
            "success": (users) => {
                let table = `
                    <table class="table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Control</th>
                            </tr>
                        </thead>
                        <tbody>
                `;

                users.forEach(user => {
                    table += `
                        <tr>
                            <th>${user.id}</th>
                            <th>${user.first_name}</th>
                            <th>${user.last_name}</th>
                            <th>
                                <button class="btn btn-warning edit-user" data-id="${user.id}" data-first-name="${user.first_name}" data-last-name="${user.last_name}">
                                    <i class="bi bi-pencil-square"></i>
                                </button>
                                <button class="btn btn-danger delete-user" data-id="${user.id}">
                                    <i class="bi bi-x-square"></i>
                                </button>
                            </th>
                        </tr>
                    `;
                });
                table += `
                        </tbody>
                    </table>
                `;
                $("#table_results").html(table);
            }
        });
    }

    function resetForm() {
        $("#user_id_group").hide();
        $("#user_id").val("");
        $("#user_first_name").val("");
        $("#user_last_name").val("");
        $("#add_user_button").show();
        $("#edit_user_button").hide();
    }

    function createUser() {
        const firstName = $("#user_first_name").val();
        const lastName = $("#user_last_name").val();

        if (firstName.trim() !== "" && lastName.trim() !== "") {
            $.ajax({
                "url": "http://localhost:5000/users",
                "method": "POST",
                "contentType": "application/json",
                "data": JSON.stringify({
                    "first_name": firstName.trim(),
                    "last_name": lastName.trim()
                }),
                "success": () => {
                    readUsers();
                    resetForm();
                }
            });
        }
    }

    function updateUser(id) {
        const firstName = $("#user_first_name").val();
        const lastName = $("#user_last_name").val();

        if (firstName.trim() !== "" && lastName.trim() !== "") {
            $.ajax({
                "url": `http://localhost:5000/users/${id}`,
                "method": "PUT",
                "contentType": "application/json",
                "data": JSON.stringify({
                    "first_name": firstName.trim(),
                    "last_name": lastName.trim()
                }),
                "success": () => {
                    readUsers();
                    resetForm();
                },
            });
        }
    }

    function deleteUser(id) {
        $.ajax({
            "url": `http://localhost:5000/users/${id}`,
            "method": "DELETE",
            "success": () => {
                readUsers();
            }
        });
    }

    readUsers();

    $("#add_user_button").click(function () {
        createUser();
    });

    $(document).on("click", "button.edit-user", function () {
        const id = $(this).data("id");
        const firstName = $(this).data("first-name");
        const lastName = $(this).data("last-name");

        $("#user_id_group").show();
        $("#add_user_button").hide();
        $("#edit_user_button").show();

        $("#user_id").val(id);
        $("#user_first_name").val(firstName);
        $("#user_last_name").val(lastName);

        $("#edit_user_button").off("click").on("click", function () {
            updateUser(id);
        });
    });

    $(document).on("click", "button.delete-user", function () {
        const id = $(this).data("id");
        deleteUser(id);
    });
});