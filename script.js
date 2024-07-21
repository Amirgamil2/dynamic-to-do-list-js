
        // Ensure the script runs after the HTML document has fully loaded
        // Ensure the script runs after the HTML document has fully loaded
        document.addEventListener('DOMContentLoaded', () => {
            // Select DOM elements and store them in constants
            const addButton = document.getElementById('add-task-btn');
            const taskInput = document.getElementById('task-input');
            const taskList = document.getElementById('task-list');

            // Function to add a new task to the list
            function addTask() {
                // Retrieve and trim the value from the task input field
                const taskText = taskInput.value.trim();

                // Check if taskText is not empty
                if (taskText === "") {
                    alert("Please enter a task.");
                    return;
                }

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
                };

                // Append the remove button to the li element
                li.appendChild(removeButton);

                // Append the li element to the task list
                taskList.appendChild(li);

                // Clear the task input field
                taskInput.value = '';
            }

            // Attach event listener to addButton to call addTask when clicked
            addButton.addEventListener('click', addTask);

            // Attach event listener to taskInput for the 'keypress' event
            taskInput.addEventListener('keypress', (event) => {
                if (event.key === 'Enter') {
                    addTask();
                }
            });

            // Optionally, you can invoke addTask on DOMContentLoaded to load initial data
            // If you have initial data to load, you can call addTask here
        });
            // Attach event listener to addButton to call addTask when clicked
            addButton.addEventListener('click', addTask);

            // Attach event listener to taskInput for the 'keypress' event
            taskInput.addEventListener('keypress', (event) => {
                if (event.key === 'Enter') {
                    addTask();
                }
            });
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
