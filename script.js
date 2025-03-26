document.addEventListener("DOMContentLoaded", () => {
  const dateInput = document.getElementById("date");
  const today = new Date().toISOString().split("T")[0];
  dateInput.value = today;

  const form = document.getElementById("logForm");
  const savedMsg = document.getElementById("savedMsg");
  const logList = document.getElementById("logList");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const task = document.getElementById("task").value.trim();
    const insight = document.getElementById("insight").value.trim();
    const parenting = document.getElementById("parenting").value.trim();

    const entry = {
      date: today,
      task,
      insight,
      parenting
    };

    const logs = JSON.parse(localStorage.getItem("ganesha_logs") || "[]");
    logs.push(entry);
    localStorage.setItem("ganesha_logs", JSON.stringify(logs));

    savedMsg.textContent = "保存しました！";
    form.reset();
    dateInput.value = today;
    renderLogs();
  });

  function renderLogs() {
    const logs = JSON.parse(localStorage.getItem("ganesha_logs") || "[]");
    logList.innerHTML = "";

    logs.reverse().forEach(log => {
      const div = document.createElement("div");
      div.className = "log-entry";
      div.innerHTML = `
        <strong>${log.date}</strong><br/>
        <b>課題:</b> ${log.task}<br/>
        <b>気づき:</b> ${log.insight}<br/>
        <b>子育て:</b> ${log.parenting || "（記入なし）"}
      `;
      logList.appendChild(div);
    });
  }

  renderLogs();
});
