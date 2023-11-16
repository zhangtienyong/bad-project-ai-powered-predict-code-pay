window.onload = () => {
  initApplication()
  getDeveloperInfo()
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


async function getDeveloperInfo() {
  const resp= await fetch("/dashboard/developer/info");
  const developerInfo = await resp.json();
  const year_of_coding_experience = developerInfo.result.developer[0].years_of_coding;
  const years_of_profession = developerInfo.result.developer[0].years_of_employment;
  const education_level = developerInfo.result.developer[0].education_level;
  const learning_source = developerInfo.result.developer[0].learning_source;
  const developer_type = developerInfo.result.developer[0].developer_type;
  const programming_language_recommendation = developerInfo.result.recommendations[0].programming_language_recommendation;
  const database_recommendation = developerInfo.result.recommendations[0].database_recommendation;
  const web_framework_recommendation = developerInfo.result.recommendations[0].web_framework_recommendation;
  const cloud_platform_recommendation = developerInfo.result.recommendations[0].cloud_platform_recommendation;
  const programming_language= developerInfo.result.developer_skills[0].skill_name;
  const database= developerInfo.result.developer_skills[1].skill_name;
  const web_framework= developerInfo.result.developer_skills[2].skill_name;
  const cloud_platform= developerInfo.result.developer_skills[3].skill_name;

  document.querySelector("#year_of_coding_experience").innerHTML=year_of_coding_experience
  document.querySelector("#years_of_profession").innerHTML=years_of_profession
  document.querySelector("#education_level").innerHTML=education_level
  document.querySelector("#learning_source").innerHTML=learning_source
  document.querySelector("#developer_type").innerHTML=developer_type
  document.querySelector("#programming_language_recommendation").innerHTML=programming_language_recommendation
  document.querySelector("#database_recommendation").innerHTML=database_recommendation
  document.querySelector("#web_framework_recommendation").innerHTML=web_framework_recommendation
  document.querySelector("#cloud_platform_recommendation").innerHTML=cloud_platform_recommendation
  document.querySelector("#programming_language").innerHTML=programming_language
  document.querySelector("#database").innerHTML=database
  document.querySelector("#web_framework").innerHTML = web_framework
  document.querySelector("#cloud_platform").innerHTML = cloud_platform







}