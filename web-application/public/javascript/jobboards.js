window.onload = () => {
  initJobBoard()
};

let currentPage = 1;

async function initJobBoard(page) {
  const currentUrl = new URL(window.location.href);
  currentUrl.searchParams.set('page', page);
  window.history.replaceState({}, '', currentUrl.href);

  const res = await fetch(`/jobboards/initJobBoard?page=${page}`);
  const JobBoards = await res.json();

  const jobBoardContainerEle = document.querySelector(".job-container");
  const templateEle = document.querySelector("#JOB-template");
  jobBoardContainerEle.innerHTML = '';

  for (const jobBoard of JobBoards) {
    const jobBoardClone = templateEle.content.cloneNode(true);
    jobBoardClone.querySelector(".image").src = jobBoard.logo
    jobBoardClone.querySelector(".id").textContent = jobBoard.id
    jobBoardClone.querySelector(".company").textContent = jobBoard.company_name
    jobBoardClone.querySelector(".title").textContent = `Job Position: ${jobBoard.job_title}`
    jobBoardClone.querySelector(".type").textContent = `Type: ${jobBoard.employment_type}`
    jobBoardClone.querySelector(".place").textContent = `Work place: ${jobBoard.work_place}`
    jobBoardContainerEle.appendChild(jobBoardClone);
  }
}

async function jobDetails(button) {
  const listItem = button.closest('.custom-card');
  const IDElement = listItem.querySelector('.id');
  const ID = parseFloat(IDElement.textContent.trim());
  console.log(ID)

// try {
//   const response = await fetch("/dashboard/employer/accepted_job", {
//     method: "POST",
//     body: JSON.stringify({ ID }), 
//     headers: {
//       "Content-type": "application/json",
//     },
//   });
//       if (response.ok) {
//         await response.json();
//       } 
//       else {
//       console.error('Error:', res.status);
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     }  
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