window.onload = async () => {
  const searchParams = new URLSearchParams(location.search);
  const job_id = searchParams.get("job_id");

  getJobDetail(job_id)
  applyJob(job_id)
};

async function getJobDetail(job_id) {

  const resp = await fetch(`/jobdetail?job_id=${job_id}`);
  const job_detail = await resp.json();
  // const job_id = job_detail.result.job[0].id;
  // const company_id = job_detail.result.job[0].company_id;
  const logo = job_detail.result.company[0].logo;
  const company_name = job_detail.result.company[0].company_name;
  const about = job_detail.result.company[0].about;
  const industry = job_detail.result.company[0].industry;
  const website = job_detail.result.company[0].website;
  const email = job_detail.result.company[0].email;
  const phone = job_detail.result.company[0].phone;
  const location = job_detail.result.company[0].location;
  const job_title = job_detail.result.job[0].job_title;
  const work_place = job_detail.result.job[0].work_place;
  const employment_type = job_detail.result.job[0].employment_type;
  const job_description = job_detail.result.job[0].job_description;
  const experience_level = job_detail.result.job[0].experience_level;
  const responsibilities = job_detail.result.job[0].responsibilities;
  const qualifications = job_detail.result.job[0].qualifications;
  document.querySelector("#logo").src = logo;
  document.querySelector("#companyName").innerHTML = company_name;
  document.querySelector("#about").innerHTML = `About: ${about}`;
  document.querySelector("#industry").innerHTML = `Industry: ${industry}`;
  document.querySelector("#website").innerHTML = `Website: ${website}`;
  document.querySelector("#email").innerHTML = `Email: ${email}`;
  document.querySelector("#phone").innerHTML = `Phone: ${phone}`;
  document.querySelector("#location").innerHTML = `Location: ${location}`;
  document.querySelector("#jobTitle").innerHTML = `Job Title: ${job_title}`;
  document.querySelector("#experienceLevel").innerHTML = `Experience Level: ${experience_level}`;
  document.querySelector("#workPlaceType").innerHTML = `Work Place Type: ${work_place}`;
  document.querySelector("#employmentType").innerHTML = `Employment Type: ${employment_type}`;
  document.querySelector("#jobDescription").innerHTML = `Job Description: ${job_description}`;
  document.querySelector("#responsibilities").innerHTML = `Responsibilities: ${responsibilities}`;
  document.querySelector("#qualifications").innerHTML = `Qualifications: ${qualifications}`;

  function getSkillsByType(type) {
    const skills = job_detail.result.skills;
    const matchingSkills = [];

    for (let i = 0; i < skills.length; i++) {
      const skill = skills[i][0];

      if (skill.types === type) {
        matchingSkills.push(skill.name);
      }
    }

    return matchingSkills;
  }

  const programmingLanguages = getSkillsByType("programming_language");
  const databases = getSkillsByType("database");
  const cloudPlatforms = getSkillsByType("cloud_platform");
  const webFrameworks = getSkillsByType("web_framework");

  document.querySelector("#programmingLanguage").innerHTML = programmingLanguages.join(", ");
  document.querySelector("#database").innerHTML = databases.join(", ");
  document.querySelector("#cloudPlatform").innerHTML = cloudPlatforms.join(", ");
  document.querySelector("#webFramework").innerHTML = webFrameworks.join(", ");



}

async function applyJob(job_id) {
  document.querySelector("#apply-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);


    const res = await fetch(`/apply?job_id=${job_id}`, {
      method: "POST",
      body:
        formData,


    });

    const result = await res.json()
    console.log(result);
    if (res.ok) {
      Swal.fire(
        'Apply successfully!',
      )

    } else {
      if (res.status === 400) {
        Swal.fire(
          'Emm...',
          'Cannot upload file!',
          'Fail'
        )
      } else if (res.status === 401) {
        Swal.fire(
          'Emm...',
          'You have already applied for this job!',
          'Fail'
        )
      } else {
        Swal.fire(
          'Emm...',
          'Something Wrong!',
          'Fail'
        )
      }
    }


  });

}