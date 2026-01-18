
document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("task-input")
    const addTaskBtn = document.getElementById("add-task-btn")
    const taskList = document.getElementById("task-list")
    const emptyImage = document.querySelector(".empty-image")
    const todosContainer = document.querySelector(".todo-container")
    const progressBar = document.getElementById("progress")
    const progressNumbers = document.getElementById("number")

    const toggleEmptyState = () => {
        emptyImage.style.display = taskList.children.length === 0 ? "block" : "none"
        todosContainer.style.width = taskList.children.length > 0 ? "100%" : "50%"
    }

    const updateProgress = (checkCompleted = true) => {
        const totalTask = taskList.children.length
        const completedTasks = taskList.querySelectorAll(".checkbox:checked").length

        progressBar.style.width = totalTask ? `${(completedTasks / totalTask) * 100}%` : `0%`
        progressNumbers.textContent = `${completedTasks} / ${totalTask}`
    }

    const addTask = (text, completed=false, checkCompleted = true) => {
        const taskText = text || taskInput.value.trim()
        if (!taskText) {
            return
        }

        const li = document.createElement("li")
        li.innerHTML = `
        <input type="checkbox" class="checkbox" ${completed ? "checked" : ""}>
        <span>${taskText}</span>
        <div class="task-buttons">
            <button class="edit-btn"><i class="fa-solid fa-pen"></i></button>
            <button class="delete-btn"><i class="fa-solid fa-trash"></i></button>
        </div>
        `
        const checkbox = li.querySelector(".checkbox")
        const editBtn = li.querySelector(".edit-btn")

        if (completed) {
            li.classList.add("completed")
            editBtn.disabled = true
            editBtn.style.opacity = "0.5"
            editBtn.style.pointerEvents = "none"
        }

        checkbox.addEventListener("change", () => {
            const isChecked = checkbox.checked
            li.classList.toggle("completed", isChecked)
            editBtn.disabled = isChecked
            editBtn.style.opacity = isChecked ? "0.5" : "1"
            editBtn.style.pointerEvents = isChecked ? "none" : "auto"
            updateProgress()
        })

        editBtn.addEventListener("click", () => {
            if(!checkbox.checked) {
                taskInput.value = li.querySelector("span").textContent
                taskInput.focus()
                li.remove()
                toggleEmptyState()
                updateProgress(false)
            }
        })

        li.querySelector(".delete-btn").addEventListener("click", () => {
            li.remove()
            toggleEmptyState()
            updateProgress()
        })

        taskList.appendChild(li)
        taskInput.value = ""
        toggleEmptyState()
        updateProgress(checkCompleted)
    }

    addTaskBtn.addEventListener("click", (e) => {
        e.preventDefault()
        addTask()})
    taskInput.addEventListener("keypress", (e) => {
        if(e.key == "Enter") {
            e.preventDefault()
            addTask()
        }
    })

 })