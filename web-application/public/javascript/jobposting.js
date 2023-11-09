window.onload = () => {
    addSkills()
    jobPosting()
}

async function addSkills() {
    const addSkillButton = document.querySelector('#skill-button');
    addSkillButton.addEventListener('click', () => {

        const input = document.querySelector('#skills');
        const skillsContainer = document.querySelector('#skills-container');
        const color = 'black';
        const value = input.value;

        if (value.trim() === '') {
            console.log('Input value is empty!');
            return;
        }

        const existingTags = Array.from(skillsContainer.querySelectorAll('.tag-text'));
        const isDuplicate = existingTags.some(tag => tag.textContent === value);

        if (isDuplicate) {
            console.log('Duplicate skill tag!');
            return;
        }

        const spanElement = document.createElement('span');

        spanElement.innerHTML = `
                <span class="tag-text">${value}</span>
                <span class="tag-close"> x </span>
                `
        spanElement.classList.add('tag');
        spanElement.style.backgroundColor = color.background;
        spanElement.style.color = color.font;

        const closeButton = spanElement.querySelector('.tag-close');
        closeButton.addEventListener('click', () => {
            spanElement.remove();
        });

        skillsContainer.appendChild(spanElement);
        input.value = '';

    });
}

async function jobPosting() {
    document.querySelector("#jobposting")
        .addEventListener("submit", async (e) => {
            e.preventDefault();
            const jobTitle = document.querySelector("#jobTitle").value;
            const experienceLevel = document.querySelector("#experienceLevel").value;
            const workPlaceType = document.querySelector("#workPlace").value;
            const employmentType = document.querySelector("#employmentType").value;;
            const jobDescription = document.querySelector("#jobDescription").value;
            const responsibilities = document.querySelector("#responsibilities").value;
            const qualifications = document.querySelector("#qualifications").value;

            const tagElements = document.querySelectorAll('.tag-text');
            const tagValues = Array.from(tagElements).map(tag => tag.textContent);
            const skills = tagValues;

            const res = await fetch("/jobposting", {
                method: "POST",
                body: JSON.stringify({
                    jobTitle,
                    experienceLevel,
                    workPlaceType,
                    employmentType,
                    jobDescription,
                    responsibilities,
                    qualifications,
                    skills
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



