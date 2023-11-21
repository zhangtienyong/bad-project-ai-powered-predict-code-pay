window.onload = () => {
  initJobBoard();
  changeNavBar();
};

let currentPage = 1;

async function initJobBoard(page) {
  const currentUrl = new URL(window.location.href);
  currentUrl.searchParams.set("page", page);
  window.history.replaceState({}, "", currentUrl.href);

  const res = await fetch(`/jobboards/initJobBoard?page=${page}`);
  const JobBoards = await res.json();

  const jobBoardContainerEle = document.querySelector(".job-container");
  const templateEle = document.querySelector("#JOB-template");
  jobBoardContainerEle.innerHTML = "";

  for (const jobBoard of JobBoards) {
    const jobBoardClone = templateEle.content.cloneNode(true);
    jobBoardClone.querySelector(".image").src = jobBoard.logo;
    jobBoardClone.querySelector(".id").textContent = jobBoard.id;
    jobBoardClone.querySelector(".company").textContent = jobBoard.company_name;
    jobBoardClone.querySelector(
      ".title",
    ).textContent = `Job Position: ${jobBoard.job_title}`;
    jobBoardClone.querySelector(
      ".type",
    ).textContent = `Type: ${jobBoard.employment_type}`;
    jobBoardClone.querySelector(
      ".place",
    ).textContent = `Work place: ${jobBoard.work_place}`;
    jobBoardContainerEle.appendChild(jobBoardClone);
  }
}

async function jobDetails(button) {
  const listItem = button.closest(".custom-card");
  const IDElement = listItem.querySelector(".id");
  const ID = parseFloat(IDElement.textContent.trim());
  console.log(ID);
  window.location.href = `http://localhost:8080/jobdetail.html?job_id=${ID}#`;
}

function loadNextPage() {
  currentPage++;
  initJobBoard(currentPage);
}

function loadPreviousPage() {
  if (currentPage > 1) {
    currentPage--;
    initJobBoard(currentPage);
  }
}

function changePage(pageNumber) {
  currentPage = pageNumber;
  initJobBoard(currentPage);
}

async function changeNavBar() {
  const res = await fetch("/jobboards/role");
  const role = await res.json();

  function updateNavLink(userRole) {
    const navLink = document.querySelector("#nav");
    const navLink2 = document.querySelector("#nav2");
    const navLink3 = document.querySelector("#nav3");

    if (userRole === "developer") {
      navLink.href = "/dashboard/developer";
      navLink.textContent = "Dashboard For Developer";
      navLink2.href = "/prediction";
      navLink2.textContent = "Predicting Dev Salaries";
      navLink3.href = "/recommendation";
      navLink3.textContent = "Skill Enhancement";
    } else if (userRole === "employer") {
      navLink.href = "/dashboard/employer";
      navLink.textContent = "Dashboard For Employer";
      navLink2.href = "/jobposting";
      navLink2.textContent = "Job Posting";
    }
  }

  updateNavLink(role);
}
