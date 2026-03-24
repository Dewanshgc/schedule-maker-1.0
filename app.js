// let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// const addBtn = document.getElementById("addBtn");
// addBtn.addEventListener("click", addTask);

// function save() {
//   localStorage.setItem("tasks", JSON.stringify(tasks));
// }

// function addTask() {
//   const title = document.getElementById("title").value;
//   const date = document.getElementById("date").value;
//   const category = document.getElementById("category").value;

//   if(!title || !date) return alert("Fill all fields");

//   tasks.push({
//     id: Date.now(),
//     title,
//     date,
//     category,
//     status: "pending"
//   });

//   save();
//   render();
// }

// function deleteTask(id) {
//   tasks = tasks.filter(t => t.id !== id);
//   save();
//   render();
// }

// function render() {
//   document.getElementById("pending").innerHTML="";
//   document.getElementById("completed").innerHTML="";

//   tasks.forEach(task => {
//     const div = document.createElement("div");
//     div.className="task";
//     div.draggable=true;
//     div.dataset.id=task.id;

//     div.innerHTML=`
//       <strong>${task.title}</strong>
//       <small>${task.date} | ${task.category}</small>
//       <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
//     `;

//     div.addEventListener("dragstart", dragStart);

//     document.getElementById(task.status).appendChild(div);
//   });

//   updateStats();
// }

// function dragStart(e){
//   e.dataTransfer.setData("id", e.target.dataset.id);
// }

// document.querySelectorAll(".task-container").forEach(container=>{
//   container.addEventListener("dragover",e=>e.preventDefault());

//   container.addEventListener("drop",e=>{
//     const id = e.dataTransfer.getData("id");
//     const task = tasks.find(t=>t.id==id);
//     task.status = container.id;
//     save();
//     render();
//   });
// });

// function calc(period){
//   const now = new Date();
//   const filtered = tasks.filter(t=>{
//     const d = new Date(t.date);
//     if(period==="week"){
//       const weekAgo = new Date();
//       weekAgo.setDate(now.getDate()-7);
//       return d>=weekAgo;
//     }
//     if(period==="month")
//       return d.getMonth()===now.getMonth() && d.getFullYear()===now.getFullYear();
//     if(period==="year")
//       return d.getFullYear()===now.getFullYear();
//   });

//   if(!filtered.length) return 0;
//   const done = filtered.filter(t=>t.status==="completed").length;
//   return Math.round(done/filtered.length*100);
// }

// let lineChart,pieChart;

// function updateStats(){
//   const w=calc("week"), m=calc("month"), y=calc("year");

//   document.getElementById("weekScore").textContent=w+"%";
//   document.getElementById("monthScore").textContent=m+"%";
//   document.getElementById("yearScore").textContent=y+"%";

//   document.getElementById("weekBar").style.width=w+"%";
//   document.getElementById("monthBar").style.width=m+"%";
//   document.getElementById("yearBar").style.width=y+"%";

//   const completed = tasks.filter(t=>t.status==="completed").length;
//   const pending = tasks.length-completed;

//   if(pieChart) pieChart.destroy();
//   pieChart = new Chart(document.getElementById("pieChart"),{
//     type:"doughnut",
//     data:{
//       labels:["Completed","Pending"],
//       datasets:[{data:[completed,pending],
//       backgroundColor:["#00f5a0","#ff4d4d"]}]
//     }
//   });

//   const last7=[],data=[];
//   for(let i=6;i>=0;i--){
//     const d=new Date();
//     d.setDate(d.getDate()-i);

//     const dayTasks=tasks.filter(t=>new Date(t.date).toDateString()===d.toDateString());
//     const done=dayTasks.filter(t=>t.status==="completed").length;
//     const percent=dayTasks.length?done/dayTasks.length*100:0;

//     last7.push(d.toLocaleDateString());
//     data.push(percent);
//   }

//   if(lineChart) lineChart.destroy();
//   lineChart=new Chart(document.getElementById("lineChart"),{
//     type:"line",
//     data:{
//       labels:last7,
//       datasets:[{
//         label:"Daily Completion %",
//         data,
//         borderColor:"#00f5a0",
//         fill:false
//       }]
//     }
//   });
// }

// render();