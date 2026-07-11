// ===========================
// To-Do List Application
// Local Storage Management
// ===========================

// Constants
const STORAGE_KEY = 'todoListApp';
const STORAGE_VERSION = '1.0.0';

// DOM Elements
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const tasksList = document.getElementById('tasksList');
const emptyState = document.getElementById('emptyState');
const totalTasksDisplay = document.getElementById('totalTasks');
const activeTasksDisplay = document.getElementById('activeTasks');
const completedTasksDisplay = document.getElementById('completedTasks');
const filterBtns = document.querySelectorAll('.filter-btn');
const clearCompletedBtn = document.getElementById('clearCompletedBtn');
const clearAllBtn = document.getElementById('clearAllBtn');

// State
let tasks = [];
let currentFilter = 'all';

// ===========================
// Initialization
// ===========================

/**
 * Initialize the application
 */
function init() {
    loadTasks();
    renderTasks();
    attachEventListeners();
    updateStats();
    
    // Set focus on input
    taskInput.focus();
}

/**
 * Attach event listeners
 */
function attachEventListeners() {
    // Add task
    addBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    // Filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            setFilter(btn.dataset.filter);
        });
    });

    // Clear buttons
    clearCompletedBtn.addEventListener('click', clearCompleted);
    clearAllBtn.addEventListener('click', clearAll);
}

// ===========================
// Task Management Functions
// ===========================

/**
 * Add a new task
 */
function addTask() {
    const text = taskInput.value.trim();

    // Validation
    if (text === '') {
        taskInput.focus();
        return;
    }

    if (text.length > 200) {
        alert('Task must be less than 200 characters');
        return;
    }

    // Create task object
    const task = {
        id: generateId(),
        text: text,
        completed: false,
        createdAt: new Date().toISOString()
    };

    // Add to tasks array
    tasks.push(task);

    // Save and render
    saveTasks();
    renderTasks();
    updateStats();

    // Clear input
    taskInput.value = '';
    taskInput.focus();
}

/**
 * Delete a task by ID
 */
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
    updateStats();
}

/**
 * Toggle task completion status
 */
function toggleTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        saveTasks();
        renderTasks();
        updateStats();
    }
}

/**
 * Clear all completed tasks
 */
function clearCompleted() {
    const completedCount = tasks.filter(t => t.completed).length;
    
    if (completedCount === 0) {
        alert('No completed tasks to clear');
        return;
    }

    if (confirm(`Clear ${completedCount} completed task(s)?`)) {
        tasks = tasks.filter(t => !t.completed);
        saveTasks();
        renderTasks();
        updateStats();
    }
}

/**
 * Clear all tasks
 */
function clearAll() {
    if (tasks.length === 0) {
        alert('No tasks to clear');
        return;
    }

    if (confirm(`Clear all ${tasks.length} task(s)? This cannot be undone.`)) {
        tasks = [];
        saveTasks();
        renderTasks();
        updateStats();
    }
}

// ===========================
// Rendering Functions
// ===========================

/**
 * Render tasks based on current filter
 */
function renderTasks() {
    // Get filtered tasks
    const filteredTasks = getFilteredTasks();

    // Clear list
    tasksList.innerHTML = '';

    // Show/hide empty state
    if (filteredTasks.length === 0) {
        emptyState.classList.add('show');
        return;
    }

    emptyState.classList.remove('show');

    // Render each task
    filteredTasks.forEach(task => {
        const li = createTaskElement(task);
        tasksList.appendChild(li);
    });

    // Add animation
    const items = tasksList.querySelectorAll('.task-item');
    items.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.05}s`;
    });
}

/**
 * Create a task element
 */
function createTaskElement(task) {
    const li = document.createElement('li');
    li.className = `task-item ${task.completed ? 'completed' : ''}`;
    li.dataset.taskId = task.id;
    li.role = 'listitem';

    // Format date
    const date = new Date(task.createdAt);
    const formattedDate = formatDate(date);

    li.innerHTML = `
        <input 
            type="checkbox" 
            class="task-checkbox" 
            ${task.completed ? 'checked' : ''}
            aria-label="Mark task as complete"
            data-task-id="${task.id}"
        >
        <span class="task-text">${escapeHtml(task.text)}</span>
        <span class="task-date">${formattedDate}</span>
        <button 
            class="delete-btn" 
            aria-label="Delete task"
            data-task-id="${task.id}"
        >
            Delete
        </button>
    `;

    // Add event listeners
    const checkbox = li.querySelector('.task-checkbox');
    const deleteBtn = li.querySelector('.delete-btn');

    checkbox.addEventListener('change', () => {
        toggleTask(task.id);
    });

    deleteBtn.addEventListener('click', () => {
        deleteTask(task.id);
    });

    return li;
}

// ===========================
// Filter Functions
// ===========================

/**
 * Set current filter
 */
function setFilter(filter) {
    currentFilter = filter;

    // Update button states
    filterBtns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.filter === filter);
        btn.setAttribute('aria-pressed', btn.dataset.filter === filter);
    });

    // Re-render tasks
    renderTasks();
}

/**
 * Get filtered tasks based on current filter
 */
function getFilteredTasks() {
    switch (currentFilter) {
        case 'active':
            return tasks.filter(t => !t.completed);
        case 'completed':
            return tasks.filter(t => t.completed);
        default:
            return tasks;
    }
}

// ===========================
// Local Storage Functions
// ===========================

/**
 * Save tasks to local storage
 */
function saveTasks() {
    try {
        const data = {
            version: STORAGE_VERSION,
            tasks: tasks,
            lastSaved: new Date().toISOString()
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
        if (e.name === 'QuotaExceededError') {
            alert('Storage quota exceeded. Please delete some tasks.');
        } else {
            console.error('Error saving tasks:', e);
        }
    }
}

/**
 * Load tasks from local storage
 */
function loadTasks() {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        if (data) {
            const parsed = JSON.parse(data);
            tasks = parsed.tasks || [];
        } else {
            tasks = [];
        }
    } catch (e) {
        console.error('Error loading tasks:', e);
        tasks = [];
    }
}

/**
 * Export tasks as JSON
 */
function exportTasks() {
    const dataStr = JSON.stringify(tasks, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `tasks_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

/**
 * Import tasks from JSON
 */
function importTasks(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const imported = JSON.parse(e.target.result);
            tasks = imported;
            saveTasks();
            renderTasks();
            updateStats();
            alert('Tasks imported successfully!');
        } catch (err) {
            alert('Error importing tasks. Please check the file format.');
            console.error(err);
        }
    };
    reader.readAsText(file);
}

// ===========================
// Utility Functions
// ===========================

/**
 * Generate unique ID
 */
function generateId() {
    return Date.now() + Math.random().toString(36).substr(2, 9);
}

/**
 * Format date to readable string
 */
function formatDate(date) {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (isSameDay(date, today)) {
        return `Today at ${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
    } else if (isSameDay(date, yesterday)) {
        return 'Yesterday';
    } else if (date.getFullYear() === today.getFullYear()) {
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    } else {
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    }
}

/**
 * Check if two dates are the same day
 */
function isSameDay(date1, date2) {
    return date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate();
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Update statistics display
 */
function updateStats() {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const active = total - completed;

    totalTasksDisplay.textContent = total;
    activeTasks Display.textContent = active;
    completedTasksDisplay.textContent = completed;

    // Update button states
    clearCompletedBtn.disabled = completed === 0;
    clearAllBtn.disabled = total === 0;
}

/**
 * Get storage usage info
 */
function getStorageInfo() {
    if (navigator.storage && navigator.storage.estimate) {
        navigator.storage.estimate().then(estimate => {
            const used = estimate.usage;
            const quota = estimate.quota;
            const percentage = (used / quota) * 100;
            console.log(`Storage: ${(used / 1024 / 1024).toFixed(2)}MB / ${(quota / 1024 / 1024).toFixed(2)}MB (${percentage.toFixed(1)}%)`);
        });
    }
}

// ===========================
// Developer Tools (Console)
// ===========================

// Make functions available in console for testing
window.todoApp = {
    getTasks: () => tasks,
    getStorage: () => localStorage.getItem(STORAGE_KEY),
    clearStorage: () => localStorage.removeItem(STORAGE_KEY),
    exportTasks: exportTasks,
    getStorageInfo: getStorageInfo
};

// ===========================
// Start Application
// ===========================

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
