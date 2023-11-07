window.onload = () => {
    signin();

  };
  
  async function signin() {
    document
      .querySelector("#signin-panel")
      .addEventListener("submit", async (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
  
        const res = await fetch("/signin", {
          method: "POST",
          body: JSON.stringify({
            email,
            password,
          }),
          headers: {
            "Content-type": "application/json",
          },
        });
        console.log(res);
        form.reset();
  
        let json = await res.json();
        console.log(json.is_admin);
        if (res.ok) {
          // if (!json.session.is_admin) {
          //   window.location.href = "http://localhost:8080";
          // } else {
          //   window.location.href = "http://localhost:8080/adminDelete.html";
          // }
          Swal.fire("Signin successfully!!!");
        } else {
          if (res.status === 401) {
            Swal.fire("Wrong Username/Password!!!");
          } else if (res.status === 403) {
            Swal.fire("Already logged ind!!!");
          } else {
            Swal.fire("Emm...", "Something Wrong!", "Fail");
          }
        }
      });
  }

 