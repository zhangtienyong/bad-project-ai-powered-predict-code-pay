window.onload = async () => {

    getSalary();

}


async function getSalary() {
    const resp = await fetch ("/recommendation/salary");
    const salaryInfo = await resp.json();
    const salary = salaryInfo.result[0].predicted_salary;
    console.log(salary);
    document.querySelector("#salary").innerHTML = `${salary} HKD`;

}