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
  console.log(JobBoards)

  const jobBoardContainerEle = document.querySelector(".job-container");
  const templateEle = document.querySelector("#JOB-template");
  jobBoardContainerEle.innerHTML = '';

  for (const jobBoard of JobBoards) {
    const jobBoardClone = templateEle.content.cloneNode(true);
    jobBoardClone.querySelector(".company").textContent = jobBoard.id
    jobBoardClone.querySelector(".title").textContent = `Job Position: ${jobBoard.job_title}`
    jobBoardClone.querySelector(".type").textContent = `Type: ${jobBoard.employment_type}`
    jobBoardClone.querySelector(".place").textContent = `Work place: ${jobBoard.work_place}`
    jobBoardContainerEle.appendChild(jobBoardClone);
  }
}

function loadNextPage() {
  currentPage++;
  console.log(currentPage)
  initJobBoard(currentPage);
}

function loadPreviousPage() {
  if (currentPage > 1) {
    currentPage--;
    console.log(currentPage)
    initJobBoard(currentPage);
  }
}

function changePage(pageNumber) {
  currentPage = pageNumber;
  initJobBoard(currentPage);
}