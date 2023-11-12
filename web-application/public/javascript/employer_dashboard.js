window.onload = () => {
  updateCompanyDetails();
  initJob();
  edit_company();
};

async function initJob() {
  const res = await fetch("/dashboard/employer/job");
  const jobs = await res.json(); // Assuming the response contains an array of jobs
  console.log(jobs);

  const productContainerEle = document.querySelector(".job-container");
  const templateEle = document.querySelector("#job-template");

  for (const job of jobs) { // Use the variable 'job' here
    const jobClone = templateEle.content.cloneNode(true);
    jobClone.querySelector(".job-title").textContent = `${job.job_title}, ${job.created_at}`
    productContainerEle.appendChild(jobClone);
  }
}

async function updateCompanyDetails() {
  try {
      const res = await fetch("/dashboard/employer/company/details", {
          method: "GET",
      });

      if (res.ok) {
          const data = await res.json();

          // Update HTML elements with company details
          document.getElementById("companyLogo").src = `/uploads/${data.logo}`
          document.getElementById("companyName").innerText = data.company_name;
          document.getElementById("about").innerText = data.about;
          document.getElementById("industry").innerText = data.industry;
          document.getElementById("website").innerText = data.website;
          document.getElementById("email").innerText = data.email;
          document.getElementById("companySize").innerText = data.company_size;
          document.getElementById("phone").innerText = data.phone;
          document.getElementById("location").innerText = data.location;
      } else {
          console.error('Error:', res.status);
      }
  } catch (error) {
      console.error('Fetch Error:', error);
  }
}

async function edit_company() {
  document.querySelector("#settingsForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form)

    const res = await fetch("/dashboard/employer/company", {
      method: "POST",
      body:
      formData 
    });   


    let json = await res.json();
    console.log(json)
    if (res.ok) {
             res.end
           } else {
             console.error("Server returned an error.");
           }
         });
       }


// async function edit_company() {
//   document.querySelector("#settingsForm").addEventListener("submit", async (e) => {
//     e.preventDefault();
//     const form = e.target;
//     const company = form.company.value;
//     const about = form.about.value;
//     const industry = form.industry.value;
//     const website = form.website.value;
//     const email = form.email.value;
//     const size = form.size.value;
//     const phone = form.phone.value;
//     const location = form.location.value;

//     const res = await fetch("/dashboard/employer/company", {
//       method: "POST",
//       body: JSON.stringify({
//         company,
//         about,
//         industry,
//         website,
//         email,
//         size,
//         phone,
//         location,
//       }),
//       headers: {
//         "Content-type": "application/json",
//       },
//     });

//     form.reset();

//     if (res.ok) {
//       const data = await res.json();
//       console.log(data);
//     } else {
//       console.error("Server returned an error.");
//     }
//   });
// }






