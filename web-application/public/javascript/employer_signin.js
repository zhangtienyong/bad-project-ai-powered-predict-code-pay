const employeeLoginButton = document.getElementById('employer-login-button');

employeeLoginButton.addEventListener('click', async () => {
    try {
        const response = await fetch("/userInform", {
            method: "get",
        });

        if (response.status === 200) {
            
            window.location.href = '/'; 
        } else {
            
            window.location.href = '/signin/employer';
        }
    } catch (error) {
        console.error("Error:", error);
        Swal.fire("Emm...", "Something went wrong!", "error");
    }
});