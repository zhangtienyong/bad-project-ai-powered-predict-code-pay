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
        if (res.ok) {
          if (json.session.role === "developer") {
            window.location.href = "https://predictcodepay.me/developer_dashboard.html";
            // window.location.href = "http://localhost:8080/developer_dashboard.html";

          } else if (json.session.role === "employer") {
            window.location.href = "https://predictcodepay.me/employer_dashboard.html";
            // window.location.href = "http://localhost:8080/employer_dashboard.html";

          //   window.location.href = "/dashboard/developer";
          // } else if (json.session.role === "employer") {
          //   window.location.href = "/dashboard/employer";
          }
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

 