window.onload = async () => {
  getSalary();
  getRecommendation();
};

async function getSalary() {
  const resp = await fetch("/recommendation/salary");
  const salaryInfo = await resp.json();
  const salary = salaryInfo.result[0].predicted_salary;
  console.log(salary);
  document.querySelector("#salary").innerHTML = `${salary} HKD`;
}

async function getRecommendation() {
  try {
    const resp = await fetch("/recommendation", {
      method: "POST",
    });
    if (resp.status == 200) {
      console.log("Data sent successfully");
    }
  } catch (err) {
    console.log(err);
  }
}
