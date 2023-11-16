window.onload = () => {
    initApplication()
  };

let currentPage = 1;
let applicationPage = 1;

async function initApplication(app) {
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set('page', currentPage);
    currentUrl.searchParams.set('app', applicationPage);
    window.history.replaceState({}, '', currentUrl.href);
    const res = await fetch(`/dashboard/developer/application?app=${app}`);
    const apps = await res.json();

    const applicationContainerEle = document.querySelector(".application-container");
    const templateEle = document.querySelector("#Application-template");
    applicationContainerEle.innerHTML = '';

    for (const app of apps) {
        const AppClone = templateEle.content.cloneNode(true);
        AppClone.querySelector(".application-id").textContent = app.id
        AppClone.querySelector(".badge").textContent = app.status
        const date = new Date(app.updated_at);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); 
        const day = String(date.getDate()).padStart(2, '0');  
        const formattedDate = `${day}/${month}/${year}`;    
        AppClone.querySelector(".title").textContent = `Application Id: ${app.id} updated at: ${formattedDate} `;
        AppClone.querySelector(".badge-danger").textContent = app.status;
        applicationContainerEle.appendChild(AppClone);
    }
}

// async function matchingSkills(page) {
//   const currentUrl = new URL(window.location.href);
//   currentUrl.searchParams.set('page', currentPage);
//   currentUrl.searchParams.set('app', applicationPage);
//   window.history.replaceState({}, '', currentUrl.href);
//   // window.location.href = currentUrl.href;
//   const res = await fetch(`/dashboard/developer/skill?page=${page}`);
//   const skills = await res.json();

//   const skillContainerEle = document.querySelector(".matchingSkills-container");
//   const templateEle = document.querySelector("#matchingSkills-template");
//   skillContainerEle.innerHTML = '';

//   for (const skill of skills) {
//     const skillClone = templateEle.content.cloneNode(true);
//     skillClone.querySelector(".skill-id").textContent = skill.id
//     skillClone.querySelector(".list-group-item").textContent = ``
//     skillContainerEle.appendChild(skillClone);
//     }
// }

try {
    const res = await fetch("/dashboard/developer//details", {
      method: "GET",
    });

    if (res.ok) {
      const data = await res.json();
      console.log(data)

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

function loadNextPage() {
    currentPage++;
    matchingSkills(currentPage);
  }
  
function loadPreviousPage() {
    if (currentPage > 1) {
      currentPage--;
      matchingSkills(currentPage);
    }
  }

function changeAppPage(pageNumber) {
    applicationPage = pageNumber;
    initApplication(applicationPage);
}

function changePage(pageNumber) {
    currentPage = pageNumber;
    matchingSkills(currentPage);
  }