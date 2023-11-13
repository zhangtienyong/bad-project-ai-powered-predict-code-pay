window.onload = async () => {
    await listSkills()
    jobPosting()
    multiSelect()

}

async function listSkills() {
    const resp = await fetch("/jobposting");
    const skills = await resp.json();
    console.log(skills);
    const programming_language_skills = skills.result.programming_language_skills
    const database_skills = skills.result.database_skills
    const cloud_platform_skills = skills.result.cloud_platform_skills
    const web_framework_skills = skills.result.web_framework_skills

    const selectEle1 = document.querySelector("#programmingLanguage > ul");
    const listEle1 = document.querySelector("#list-programmingLanguage");
    for (const programming_language_skill of programming_language_skills) {
        const listClone1 = listEle1.content.cloneNode(true);
        listClone1.querySelector(".programmingLanguage-item-text").textContent = programming_language_skill;
        selectEle1.appendChild(listClone1);

    };

    const selectEle2 = document.querySelector("#database > ul");
    const listEle2 = document.querySelector("#list-database");
    for (const database_skill of database_skills) {
        const listClone2 = listEle2.content.cloneNode(true);
        listClone2.querySelector(".database-item-text").textContent = database_skill;
        selectEle2.appendChild(listClone2);
    };

    const selectEle3 = document.querySelector("#cloudPlatform > ul");
    const listEle3 = document.querySelector("#list-cloudPlatform");
    for (const cloud_platform_skill of cloud_platform_skills) {
        const listClone3 = listEle3.content.cloneNode(true);
        listClone3.querySelector(".cloudPlatform-item-text").textContent = cloud_platform_skill;
        selectEle3.appendChild(listClone3);
    };

    const selectEle4 = document.querySelector("#webFramework > ul");
    const listEle4 = document.querySelector("#list-webFramework");
    for (const web_framework_skill of web_framework_skills) {
        const listClone4 = listEle4.content.cloneNode(true);
        listClone4.querySelector(".webFramework-item-text").textContent = web_framework_skill;
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
            const employment_type = document.querySelector("#employmentType").value;
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
                    programming_language_skills,
                    database_skills,
                    cloud_platform_skills,
                    web_framework_skills,
                }),
                headers: {
                    "Content-type": "application/json",
                },
            });

            let json = await res.json();
            console.log(json);

            if (res.status == 400) {
                Swal.fire("Failed to post a job!");
            } else {
                Swal.fire("You Posted a Job!", "Success");
            }
        });
}

async function multiSelect() {
    const selectBtn1 = document.querySelector("#programmingLanguage-select-btn"),
        items1 = document.querySelectorAll("#programmingLanguage-item");

    selectBtn1.addEventListener("click", () => {
        selectBtn1.classList.toggle("open");
    });

    items1.forEach(item1 => {
        item1.addEventListener("click", () => {
            item1.classList.toggle("checked-1");

            let checked1 = document.querySelectorAll(".checked-1"),
                btnText1 = selectBtn1.querySelector(".btn-text");

            if (checked1 && checked1.length > 0) {
                btnText1.innerText = `${checked1.length} Selected`;
            } else {
                btnText1.innerText = "Select Programming Language";
            }
        });
    })

    const selectBtn2 = document.querySelector("#database-select-btn"),
        items2 = document.querySelectorAll("#database-item");

    selectBtn2.addEventListener("click", () => {
        selectBtn2.classList.toggle("open");
    });

    items2.forEach(item2 => {
        item2.addEventListener("click", () => {
            item2.classList.toggle("checked-2");

            let checked2 = document.querySelectorAll(".checked-2"),
                btnText2 = selectBtn2.querySelector(".btn-text");

            if (checked2 && checked2.length > 0) {
                btnText2.innerText = `${checked2.length} Selected`;
            } else {
                btnText2.innerText = "Select Database";
            }
        });
    })

    const selectBtn3 = document.querySelector("#cloudPlatform-select-btn"),
        items3 = document.querySelectorAll("#cloudPlatform-item");

    selectBtn3.addEventListener("click", () => {
        selectBtn3.classList.toggle("open");
    });

    items3.forEach(item3 => {
        item3.addEventListener("click", () => {
            item3.classList.toggle("checked-3");

            let checked3 = document.querySelectorAll(".checked-3"),
                btnText3 = selectBtn3.querySelector(".btn-text");

            if (checked3 && checked3.length > 0) {
                btnText3.innerText = `${checked3.length} Selected`;
            } else {
                btnText3.innerText = "Select Cloud Platform";
            }
        });
    })

    const selectBtn4 = document.querySelector("#webFramework-select-btn"),
        items4 = document.querySelectorAll("#webFramework-item");

    selectBtn4.addEventListener("click", () => {
        selectBtn4.classList.toggle("open");
    });

    items4.forEach(item4 => {
        item4.addEventListener("click", () => {
            item4.classList.toggle("checked-4");

            let checked4 = document.querySelectorAll(".checked-4"),
                btnText4 = selectBtn4.querySelector(".btn-text");

            if (checked4 && checked4.length > 0) {
                btnText4.innerText = `${checked4.length} Selected`;
            } else {
                btnText4.innerText = "Select Web Framework";
            }
        });
    })
}

