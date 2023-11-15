window.onload = () => {
  updateCompanyDetails();
  initJob();
  editCompany();
  editImage();
  editJob();
  initApplication();
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

  const productContainerEle = document.querySelector(".job-container");
  const templateEle = document.querySelector("#job-template");
  productContainerEle.innerHTML = '';

  for (const job of jobs) {
    const jobClone = templateEle.content.cloneNode(true);
    jobClone.querySelector(".job-id").textContent = job.id
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

  const productContainerEle = document.querySelector(".application-container");
  const templateEle = document.querySelector("#application-template");
  productContainerEle.innerHTML = '';

  for (const app of apps) {
    const AppClone = templateEle.content.cloneNode(true);
    AppClone.querySelector(".application-id").textContent = app.id
    AppClone.querySelector(".application-title").textContent = `Application ID:  ${app.id}   Job ID:  ${app.job_id}    Developer ID:  ${app.user_id} updated_at: ${app.updated_at}   Status:  ${app.status}`
    productContainerEle.appendChild(AppClone);
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
      document.getElementById("modalImage").src = data.logo
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

async function editImage() {
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

async function editCompany() {
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
      Swal.fire("Success!");
      await res.json();
    } else {
      Swal.fire("Fail!");
      console.error("Server returned an error.");
    }
  });
}

async function editJob() {
  document.querySelector("#jobForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const id = document.querySelector("#jobId")
    const form = e.target;
    const title = form.title.value;
    const place = form.place.value;
    const type = form.type.value;
    const description = form.description.value;
    const level = form.level.value;
    const responsibilities = form.responsibilities.value;
    const qualifications = form.qualifications.value;
    const jobId = id.textContent

    const res = await fetch("/dashboard/employer/editJob", {
      method: "POST",
      body: JSON.stringify({
        title,
        place,
        type,
        description,
        level,
        responsibilities,
        qualifications,
        jobId
      }),
      headers: {
        "Content-type": "application/json",
      },
    });

    form.reset();

    if (res.ok) {
      Swal.fire("Success!");
      await res.json();
    } else {
      Swal.fire("Fail!");
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
      await res.json();
    } else {
      console.error('Error:', res.status);

    }
  } catch (error) {
    console.error("Error:", error);
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

function changePage(pageNumber) {
  currentPage = pageNumber;
  initJob(currentPage);
}

function changeAppPage(pageNumber) {
  applicationPage = pageNumber;
  initApplication(applicationPage);
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

async function handleAcceptClick(button) {
  const listItem = button.closest('.list-group-item');
  const TitleElement = listItem.querySelector('.application-id');
  const Title = parseFloat(TitleElement.textContent.trim());

try {
  const response = await fetch("/dashboard/employer/accepted_job", {
    method: "POST",
    body: JSON.stringify({ Title }), 
    headers: {
      "Content-type": "application/json",
    },
  });
      if (response.ok) {
        await response.json();
        initApplication()
      } 
      else {
      console.error('Error:', res.status);
  
      }
    } catch (error) {
      console.error("Error:", error);
    }  
}

async function handleRejectedClick(button) {
  const listItem = button.closest('.list-group-item');
  const TitleElement = listItem.querySelector('.application-id');
  const Title = parseFloat(TitleElement.textContent.trim());

try {
  const response = await fetch("/dashboard/employer/rejected_job", {
    method: "POST",
    body: JSON.stringify({ Title }), 
    headers: {
      "Content-type": "application/json",
    },
  });
      if (response.ok) {
        await response.json();
        initApplication()
      } 
      else {
      console.error('Error:', res.status);
  
      }
    } catch (error) {
      console.error("Error:", error);
    }  
}

async function getId(button) {
  const listItem = button.closest('.list-group-item');
  const TitleElement = listItem.querySelector('.job-id');
  const Title = parseFloat(TitleElement.textContent.trim());
  const id = document.querySelector("#jobId")
  id.textContent = Title;
}

async function deleteJob(button){
  const listItem = button.closest('.list-group-item');
  const TitleElement = listItem.querySelector('.job-id');
  const Title = parseFloat(TitleElement.textContent.trim());

try {
  const response = await fetch("/dashboard/employer/delete_job", {
    method: "DELETE",
    body: JSON.stringify({ Title }), 
    headers: {
      "Content-type": "application/json",
    },
  });
      if (response.ok) {
        await response.json();
        initJob()
        initApplication();
      } 
      else {
      console.error('Error:', res.status);
  
      }
    } catch (error) {
      console.error("Error:", error);
    }  
}

async function downloadCV(button) {
  const listItem = button.closest('.list-group-item');
  const TitleElement = listItem.querySelector('.application-id');
  const Title = parseFloat(TitleElement.textContent.trim());

  try {
    const response = await fetch("/dashboard/employer/downloadCV", {
      method: "POST",
      body: JSON.stringify({ Title }), 
      headers: {
        "Content-type": "application/json",
      },
    });
    
    if (response.ok) {
      // Convert the response to blob data
      const blob = await response.blob();
      
      // Create a temporary anchor element
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      
      // Set the filename for the downloaded file
      const contentDisposition = response.headers.get('Content-Disposition');
      const filenameMatch = contentDisposition && contentDisposition.match(/filename="(.+)"/);
      const filename = filenameMatch ? filenameMatch[1] : 'download';
      a.download = filename;

      // Append the anchor to the body and trigger the click event
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } else {
      console.error('Error:', response.status);
    }
  } catch (error) {
    console.error("Error:", error);
  }  
}
