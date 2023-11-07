window.onload = () => {

    signup()
  };

async function signup() {
    document
      .querySelector("#signup-panel")
      .addEventListener("submit", async (e) => {
        e.preventDefault();
        const radioButtons = document.querySelectorAll('input[name="role"]');
        let selectRole
        for (const radioButton of radioButtons) {
            if (radioButton.checked) {
              selectRole = radioButton.value;
                break               
            }          
        }
        const form = e.target;
        const username = form.username.value;
        const email = form.email.value;
        const password = form.password.value;
        const password_repeated = form.password_repeated.value;
        const role = selectRole
        console.log()
  
        const res = await fetch("/signup", {
          method: "POST",
          body: JSON.stringify({
            username,
            email,
            password,
            password_repeated,
            role
          }),
          headers: {
            "Content-type": "application/json",
          },
        });
        console.log(res);
        form.reset();
  
        let json = await res.json();
        console.log(json);
  
        if (res.status == 400) {
          Swal.fire("OOPS!", "Missing name, email or password", "Failed");
        } else if (res.status == 406) {
          Swal.fire("OOPS!", "Wrong repeated password", "Failed");
        } else if (res.status == 409) {
          Swal.fire("OOPS!", "Email already exists", "Failed");
        } else if (res.status == 500) {
          Swal.fire("OOPS!", "An error occurred during signup", "Failed");
        } else {
          Swal.fire("Good Job!", "You Signup!", "Success");
        }
      });
  }