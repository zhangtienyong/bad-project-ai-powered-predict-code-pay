window.onload = () => {
  updateCompanyDetails();
  initJob();
  edit_company();
  edit_image();
  initApplication()
};

let currentPage = 1;
let applicationPage = 1;

async function initJob(page) {
  const currentUrl = new URL(window.location.href);
      currentUrl.searchParams.set('page', currentPage);
      currentUrl.searchParams.set('app', applicationPage);
      window.history.replaceState({}, '', currentUrl.href);
      // window.location.href = currentUrl.href;
  const res = await fetch(`/dashboard/employer/job?page=${page}`);
  const jobs = await res.json(); 
  console.log(jobs);

  const productContainerEle = document.querySelector(".job-container");
  const templateEle = document.querySelector("#job-template");
  productContainerEle.innerHTML = '';

  for (const job of jobs) {
    const jobClone = templateEle.content.cloneNode(true);
    jobClone.querySelector(".job-title").textContent = `${job.job_title}, ${job.created_at}`
    productContainerEle.appendChild(jobClone);
  }
}

async function initApplication(app) {
  const currentUrl = new URL(window.location.href);
      currentUrl.searchParams.set('page', currentPage);
      currentUrl.searchParams.set('app', applicationPage);
      window.history.replaceState({}, '', currentUrl.href);
      // window.location.href = currentUrl.href;
  const res = await fetch(`/dashboard/employer/application?app=${app}`);
  const apps = await res.json();
  console.log(apps);

  const productContainerEle = document.querySelector(".application-container");
  const templateEle = document.querySelector("#application-template");
  productContainerEle.innerHTML = '';

  for (const app of apps) {
    const jobClone = templateEle.content.cloneNode(true);
    jobClone.querySelector(".application-title").textContent = `${app.status}, ${app.created_at}`
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
          console.log(data)

          // Update HTML elements with company details
          document.getElementById("modalLogo").src = data.logo
          document.getElementById("companyLogo").src = data.logo
          document.getElementById("companyName").innerText = "Company Name:" + data.company_name;
          document.getElementById("about").innerText = "About:" + data.about;
          document.getElementById("industry").innerText = "Industry:" + data.industry;
          document.getElementById("website").innerText = "Company Website:" + data.website;
          document.getElementById("email").innerText = "Email:" + data.email;
          document.getElementById("companySize").innerText = "Company Size:" + data.company_size;
          document.getElementById("phone").innerText = "Phone:" + data.phone;
          document.getElementById("location").innerText = "Location:" + data.location;
      } else {
          console.error('Error:', res.status);
      }
  } catch (error) {
      console.error('Fetch Error:', error);
  }
}

async function edit_image() {
  document.querySelector("#settingsImage").addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form)

    const res = await fetch("/dashboard/employer/logo", {
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

async function getUserInfo(user) {
  try {
    const response = await fetch("/userInform", {
        method: "get",
    });

    if (response.ok) {
               
    } else {
        
       
    }
} catch (error) {
    console.error("Error:", error);
    Swal.fire("Emm...", "Something went wrong!", "error");
}
}

function loadNextPage() {
  currentPage++;
  initJob(currentPage);
}

function loadPreviousPage() {
  if (currentPage > 1) {
    currentPage--;
    initJob(currentPage);
  }
}

function loadNextApp() {
  applicationPage++;
  console.log(applicationPage)
  initApplication(applicationPage);
}

function loadPreviousApp() {
  if (applicationPage > 1) {
    applicationPage--;
    initApplication(applicationPage);
  }
}




