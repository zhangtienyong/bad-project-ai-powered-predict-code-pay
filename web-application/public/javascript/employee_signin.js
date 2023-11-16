const employeeLoginButton = document.getElementById('employee-login-button');

employeeLoginButton.addEventListener('click', async () => {
    try {
        const response = await fetch("/userInform", {
            method: "get",
        });

        if (response.status === 200) {
            window.location.href = '/signin/employee';
        } else {
            Swal.fire("Already logged in!!!");
        }
    } catch (error) {
        console.error("Error:", error);
        Swal.fire("Emm...", "Something went wrong!", "error");
    }
});




