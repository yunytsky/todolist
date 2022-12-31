const newTask = document.querySelector(".new-task__form")
const textarea = document.querySelector("#newTaskName");


newTask.addEventListener("submit", (event) => {
    event.preventDefault();
    fetch("/my-tasks/:id/add", {
        method: "PATCH",
        body: textarea.value
    })
      .then(() => {
          window.location = "/"
      })
      .catch((err) => {console.log("cant add a task")})
})