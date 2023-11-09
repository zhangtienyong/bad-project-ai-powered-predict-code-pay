window.onload = () => {
  edit_company();
};

async function edit_company() {
  document.querySelector("#settingsForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = e.target;
    const company = form.company.value;
    const about = form.about.value;
    const industry = form.industry.value;
    const website = form.website.value;
    const email = form.email.value;
    const size = form.size.value;
    const phone = form.phone.value;
    const location = form.location.value;

    const res = await fetch("/dashboard/employer/company", {
      method: "POST",
      body: JSON.stringify({
        company,
        about,
        industry,
        website,
        email,
        size,
        phone,
        location,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });

    form.reset();

    if (res.ok) {
      const data = await res.json();
      console.log(data);
    } else {
      console.error("Server returned an error.");
    }
  });
}

  
