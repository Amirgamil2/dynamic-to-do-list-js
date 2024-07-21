
document.addEventListener("DOMContentLoaded", function() {
    // Select DOM elements
    const addButton = document.getElementById("add-task-btn");
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");
  
    // Create the addTask function
    function addTask() {
      const taskText = taskInput.value.trim();
      if (taskText === "") {
        alert("Please enter a task");
        return;
      }
  
      // Create a new li element
      const taskListItem = document.createElement("li");
      taskListItem.textContent = taskText;
  
      // Create a new button element for removing the task
      const removeButton = document.createElement("button");
      removeButton.textContent = "Remove";
      removeButton.className = "remove-btn";
      removeButton.onclick = function() {
        taskList.removeChild(taskListItem);
      };
  
      // Append the remove button to the li element
      taskListItem.appendChild(removeButton);
  
      // Append the li element to the task list
      taskList.appendChild(taskListItem);
  
      // Clear the task input field
      taskInput.value = "";
    }
  
    // Attach event listeners
    addButton.addEventListener("click", addTask);
    taskInput.addEventListener("keypress", function(event) {
      if (event.key === "Enter") {
        addTask();
      }
    });
  });
              // Attach event listener to addButton to call addTask when clicked
            addButton.addEventListener('click', addTask);

            // Attach event listener to taskInput for the 'keypress' event
            taskInput.addEventListener('keypress', (event) => {
                if (event.key === 'Enter') {
                    addTask();
                }
            });
            // Function to load tasks from Local Storage
            function loadTasks() {
                const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
                storedTasks.forEach(taskText => addTask(taskText, false));
            }

            // Function to add a new task to the list
            function addTask(taskText, save = true) {
                // Create a new li element and set its text content to taskText
                const li = document.createElement('li');
                li.textContent = taskText;

                // Create a new button element for removing the task
                const removeButton = document.createElement('button');
                removeButton.textContent = "Remove";
                removeButton.className = 'remove-btn';

                // Assign an onclick event to the remove button to remove the task
                removeButton.onclick = () => {
                    taskList.removeChild(li);
                    removeTaskFromStorage(taskText);
                };

                // Append the remove button to the li element
                li.appendChild(removeButton);

                // Append the li element to the task list
                taskList.appendChild(li);

                // If save is true, update Local Storage
                if (save) {
                    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
                    storedTasks.push(taskText);
                    localStorage.setItem('tasks', JSON.stringify(storedTasks));
                }
            }

            // Function to remove a task from Local Storage
            function removeTaskFromStorage(taskText) {
                let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
                storedTasks = storedTasks.filter(task => task !== taskText);
                localStorage.setItem('tasks', JSON.stringify(storedTasks));
            }

            // Attach event listener to addButton to call addTask when clicked
            addButton.addEventListener('click', () => {
                const taskText = taskInput.value.trim();
                if (taskText === "") {
                    alert("Please enter a task.");
                    return;
                }
                addTask(taskText);
                taskInput.value = '';
            });

            // Attach event listener to taskInput for the 'keypress' event
            taskInput.addEventListener('keypress', (event) => {
                if (event.key === 'Enter') {
                    const taskText = taskInput.value.trim();
                    if (taskText === "") {
                        alert("Please enter a task.");
                        return;
                    }
                    addTask(taskText);
                    taskInput.value = '';
                }
            });
