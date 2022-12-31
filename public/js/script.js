//DELETE
const taskList = document.querySelector(".tasks__list");
const tasksBtns = document.querySelector(".tasks__buttons");
const deleteBtns = document.querySelectorAll(".task__delete");
const deleteAllBtn = document.querySelector(".tasks__delete");

const empty = document.createElement("div");
const textNode = document.createTextNode("Add your first task by clicking a button below");
empty.appendChild(textNode);
empty.classList.add("tasks__empty");

deleteBtns.forEach((deleteBtn) => {
    deleteBtn.addEventListener("click", (event) => {
        const id = event.currentTarget.parentElement.id;
        const task = event.currentTarget.parentElement.parentElement;
        fetch("/my-tasks/:id/delete", {
            method: "PATCH",
            body: id
        }).then(() => {
            task.remove();
            if(taskList.childElementCount == 0){
                taskList.appendChild(empty);
            }
    
        }).catch((err) => {
            console.log(err);
        })
    })
});

deleteAllBtn.addEventListener("click", (event) => {
    const taskList = event.currentTarget.parentElement.previousElementSibling;
    fetch("/my-tasks/:id/delete-all", {
        method: "PATCH"
    }).then(() => {
        let tasks = [];
        for (const task of taskList.children) {
            tasks.push(task);
        }
        tasks.forEach(task => {
            task.remove();
        })

        taskList.appendChild(empty);

    }).catch((err) => {
        console.log(err);
    })
});

//EDIT
const body = document.querySelector("body")
const editBtns = document.querySelectorAll(".task__edit");

editBtns.forEach((editBtn) => {
    editBtn.addEventListener("click", (event) => {
        //creating a form
        const oldName = event.currentTarget.parentElement.previousElementSibling.lastElementChild;
        oldName.remove()
        
        const taskNameContainer = event.currentTarget.parentElement.previousElementSibling;
        const checkbox = event.currentTarget.parentElement.previousElementSibling.firstElementChild.lastElementChild;
        
        const editForm = document.createElement("form");
        editForm.className = "task__edit-form";
        editForm.innerHTML = "<input type='submit' hidden> <input type='text' name='name' id='newName' placeholder='Write a name and press enter' autofocus>";

        taskNameContainer.appendChild(editForm);
        checkbox.style.pointerEvents = "none";

        //submitting new name
        const id = event.currentTarget.parentElement.id;
        const newName = document.createElement("p")
        newName.className = "task__name";
        const line = document.createElement("span");
        line.className = "line";

        if (checkbox.classList.contains("checked")){
            line.classList.add("checked");
        }
        console.log(line)
        console.log(newName)

        editForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const newNameValue = document.querySelector("#newName").value; 
            const body = {
                id: id,
                name: newNameValue
            };

            fetch("/my-tasks/:id/edit", {
                method: "PATCH",
                body: JSON.stringify(body),
                headers: {"content-type": "application/json"}
            }).then(() => {
                editForm.remove();
                checkbox.style.pointerEvents = "auto";
                newName.innerText = newNameValue;
                newName.appendChild(line);
                taskNameContainer.appendChild(newName);
                console.log("task name has been changed")
            }).catch((err) => {
                console.log(err);
            })
        })
        
    })
});

//CHECKBOX
const checkboxes = document.querySelectorAll(".task__checkbox");

checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("click", (event) => {
        const id = event.currentTarget.parentElement.parentElement.id;
        const line = event.currentTarget.parentElement.nextElementSibling.firstElementChild;
        fetch("/my-tasks/:id", {
            method: "PATCH",
            body: id
        }).then(() => {
            checkbox.classList.toggle("checked");
            line.classList.toggle("checked");
        }).catch((err) => {
            console.log(err);
        })

    })
});









//set up error handlers
// add icon