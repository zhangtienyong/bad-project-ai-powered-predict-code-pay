window.onload = async () => {
  const resp = await fetch("/userInform");
  if (resp.ok) {
    const data = await resp.json();
    const target = data.user.role === "employer" ? "employer_dashboard" : "developer_dashboard";
    window.location = `/${target}.html`;
  }
};
