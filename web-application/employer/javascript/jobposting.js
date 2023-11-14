window.onload = () => {
    listSkills()
    jobPosting()
}

async function listSkills() {
    const resp= await fetch("/jobposting");
    const skills = await resp.json();
    console.log(skills);
    const programming_language_skills = skills.result.programming_language_skills
    const database_skills = skills.result.database_skills
    const cloud_platform_skills = skills.result.cloud_platform_skills
    const web_framework_skills = skills.result.web_framework_skills


    const selectEle1 = document.querySelector("#programmingLanguage");
    const listEle1 = document.querySelector("#list-programmingLanguage");

    for (const programming_language_skill of programming_language_skills) {
        const listClone1 = listEle1.content.cloneNode(true);
        listClone1.querySelector(".programmingLanguage").textContent = programming_language_skill;
        selectEle1.appendChild(listClone1);

    };

    const selectEle2 = document.querySelector("#database");
    const listEle2 = document.querySelector("#list-database");
    for (const database_skill of database_skills) {
        const listClone2 = listEle2.content.cloneNode(true);
        listClone2.querySelector(".database").textContent = database_skill;
        selectEle2.appendChild(listClone2);
    };

    const selectEle3 = document.querySelector("#cloudPlatform");
    const listEle3 = document.querySelector("#list-cloudPlatform");
    for (const cloud_platform_skill of cloud_platform_skills) {
        const listClone3 = listEle3.content.cloneNode(true);
        listClone3.querySelector(".cloudPlatform").textContent = cloud_platform_skill;
        selectEle3.appendChild(listClone3);
    };

    const selectEle4 = document.querySelector("#webFramework");
    const listEle4 = document.querySelector("#list-webFramework");
    for (const web_framework_skill of web_framework_skills) {
        const listClone4 = listEle4.content.cloneNode(true);
        listClone4.querySelector(".webFramework").textContent = web_framework_skill;
        selectEle4.appendChild(listClone4);
    }
}

async function jobPosting() {
    document.querySelector("#jobposting")
        .addEventListener("submit", async (e) => {
            e.preventDefault();
            const job_title = document.querySelector("#jobTitle").value;
            const experience_level = document.querySelector("#experienceLevel").value;
            const work_place = document.querySelector("#workPlace").value;
            const employment_type = document.querySelector("#employmentType").value;;
            const job_description = document.querySelector("#jobDescription").value;
            const responsibilities = document.querySelector("#responsibilities").value;
            const qualifications = document.querySelector("#qualifications").value;
            const programming_language_skills = document.querySelector('#programmingLanguage').value
            const database_skills = document.querySelector('#database').value
            const cloud_platform_skills = document.querySelector('#cloudPlatform').value
            const web_framework_skills = document.querySelector('#webFramework').value
   
            
            const res = await fetch("/jobposting", {
                method: "POST",
                body: JSON.stringify({
                    job_title,
                    experience_level,
                    work_place,
                    employment_type,
                    job_description,
                    responsibilities,
                    qualifications,
    
                }),
                headers: {
                    "Content-type": "application/json",
                },
            });

            let json = await res.json();
            console.log(json);

            if(res.status == 400) {
                Swal.fire("Failed to post a job!");
            } else {
                Swal.fire("You Posted a Job!", "Success");
            }
        });
}



