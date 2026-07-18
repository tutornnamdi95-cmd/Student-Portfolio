// Academic Planner Application Architecture Engine
document.addEventListener('DOMContentLoaded', () => {
    
    // Target Dynamic Elements via DOM Tree Hooks
    const taskForm = document.getElementById('task-form');
    const taskList = document.getElementById('task-list');
    const emptyState = document.getElementById('empty-state');
    const clearAllBtn = document.getElementById('clear-all-btn');

    // Retrieve active records array out of local browser persistent database
    let tasksArray = JSON.parse(localStorage.getItem('academicTasks')) || [];

    // Initialize display output view states
    renderTasks();

    // Intake Event Monitor Interception
    taskForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevents default browser reload behavior

        // Capture fields explicitly
        const titleInput = document.getElementById('task-title').value;
        const courseInput = document.getElementById('task-course').value;
        const dateInput = document.getElementById('task-date').value;

        // Structural storage data object mapping
        const taskNodeData = {
            id: Date.now().toString(), // Generates a unique timestamp signature identifier
            title: titleInput,
            course: courseInput,
            deadline: dateInput,
            isCompleted: false
        };

        // Append to storage array tracker stack
        tasksArray.push(taskNodeData);
        saveAndRefresh();
        
        // Reset entry textboxes to clear field memory
        taskForm.reset();
    });

    // Toggle Task Completeness or Trigger Object Deletion via Event Delegation
    taskList.addEventListener('click', (event) => {
        const elementClicked = event.target;
        const targetTaskId = elementClicked.getAttribute('data-id');

        if (elementClicked.classList.contains('btn-check')) {
            // Find task and toggle boolean state
            tasksArray = tasksArray.map(task => {
                if (task.id === targetTaskId) {
                    task.isCompleted = !task.isCompleted;
                }
                return task;
            });
            saveAndRefresh();
        } 
        
        else if (elementClicked.classList.contains('btn-delete')) {
            // Filter target task out of array data structure
            tasksArray = tasksArray.filter(task => task.id !== targetTaskId);
            saveAndRefresh();
        }
    });

    // Clear completed action element configuration
    clearAllBtn.addEventListener('click', () => {
        tasksArray = tasksArray.filter(task => !task.isCompleted);
        saveAndRefresh();
    });

    // Dynamic Engine Output Generation Engine
    function renderTasks() {
        // Clear old DOM nodes to prevent data collision duplications
        taskList.innerHTML = '';

        // Conditional rendering layout switch logic
        if (tasksArray.length === 0) {
            emptyState.style.display = 'block';
            clearAllBtn.style.display = 'none';
            return;
        }

        emptyState.style.display = 'none';
        clearAllBtn.style.display = 'block';

        // Loop array stream data objects to generate actual operational HTML templates
        tasksArray.forEach(task => {
            const listNode = document.createElement('li');
            listNode.className = `task-item ${task.isCompleted ? 'completed' : ''}`;
            
            listNode.innerHTML = `
                <div class="task-details">
                    <h4 class="task-title-text">${escapeHTML(task.title)}</h4>
                    <div class="task-meta">
                        <span>${escapeHTML(task.course)}</span>
                        Due: ${task.deadline}
                    </div>
                </div>
                <div class="task-actions">
                    <button class="btn-check" data-id="${task.id}">
                        ${task.isCompleted ? 'Undo' : 'Done'}
                    </button>
                    <button class="btn-delete" data-id="${task.id}">Remove</button>
                </div>
            `;
            taskList.appendChild(listNode);
        });
    }

    // Persist modifications down to Client storage layer layout maps
    function saveAndRefresh() {
        localStorage.setItem('academicTasks', JSON.stringify(tasksArray));
        renderTasks();
    }

    // Helper sanitization utility to prevent Cross-Site Scripting input breaches
    function escapeHTML(str) {
        return str.replace(/&/g, "&amp;")
                  .replace(/</g, "&lt;")
                  .replace(/>/g, "&gt;")
                  .replace(/"/g, "&quot;")
                  .replace(/'/g, "&#039;");
    }
});
