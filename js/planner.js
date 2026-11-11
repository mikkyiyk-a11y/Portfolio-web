/* =========================================================
   PLANNER.JS - the Academic Planner

   PDF REQUIREMENT: "Academic Planner Page"
     - Add tasks              -> see addTask()
     - Mark tasks as completed -> see toggleTask()
     - Delete tasks           -> see deleteTask()
   PDF REQUIREMENT: "Interactive task management system"
   PDF REQUIREMENT: "JavaScript must be used to implement this functionality"

   HOW IT WORKS (in plain words):
     - All tasks are kept in one ARRAY called "tasks".
     - Each task is an object like: { text: "Read notes", date: "2026-11-02", done: false }
     - Whenever something changes, we call showTasks(), which
       clears the list on the page and draws every task again.
     - Tasks are saved in the browser (localStorage) so they are
       still there when you refresh the page.
   ========================================================= */


/* ---------------------------------------------------------
   STEP 1: GRAB THE PARTS OF THE PAGE WE NEED

   PDF REQUIREMENT: "DOM manipulation"
   -> document.getElementById() finds an HTML element by its id
   --------------------------------------------------------- */
const taskForm = document.getElementById("taskForm");     // the whole form
const taskInput = document.getElementById("taskInput");   // the text box
const taskDate = document.getElementById("taskDate");     // the date box
const taskList = document.getElementById("taskList");     // the empty <ul>
const taskCount = document.getElementById("taskCount");   // "You have 0 tasks"
const taskError = document.getElementById("taskError");   // error message spot


/* ---------------------------------------------------------
   STEP 2: THE ARRAY THAT HOLDS ALL THE TASKS

   PDF REQUIREMENT: "Arrays"
   -> Load any saved tasks from the browser.
      If there are none yet, start with an empty array [].
   --------------------------------------------------------- */
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


/* ---------------------------------------------------------
   STEP 3: SAVE TASKS
   Stores the tasks array in the browser so it survives a refresh.
   (localStorage can only store text, so JSON.stringify turns
    the array into text first.)
   --------------------------------------------------------- */
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}


/* ---------------------------------------------------------
   STEP 4: SHOW ALL TASKS ON THE PAGE

   PDF REQUIREMENT: "Functions"
   PDF REQUIREMENT: "DOM manipulation"
   PDF REQUIREMENT: "Dynamic content updates"
   -> This function builds the task list on the page from the array.
   --------------------------------------------------------- */
function showTasks() {
  // DOM MANIPULATION: empty the list first, so we don't show tasks twice
  taskList.innerHTML = "";

  // If there are no tasks, show a friendly message and stop here
  if (tasks.length === 0) {
    taskList.innerHTML = '<li class="empty-msg">No tasks yet. Add one above!</li>';
  }

  // ARRAYS: go through the tasks one by one.
  // "task" is the current task, "index" is its position (0, 1, 2...)
  tasks.forEach(function (task, index) {

    // DOM MANIPULATION: create a new <li> for this task
    const li = document.createElement("li");
    li.className = "task";

    // If the task is completed, add the "done" class (CSS crosses it out)
    if (task.done) {
      li.classList.add("done");
    }

    // DOM MANIPULATION: create the checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;   // ticked if the task is done

    // EVENT HANDLING: when the checkbox is clicked, mark it done / not done
    checkbox.addEventListener("change", function () {
      toggleTask(index);
    });

    // DOM MANIPULATION: create the text part of the task
    const text = document.createElement("span");
    text.className = "task-text";
    text.textContent = task.text;

    // If the task has a due date, show it under the text
    if (task.date) {
      const date = document.createElement("div");
      date.className = "task-date";
      date.textContent = "Due: " + task.date;
      text.appendChild(date);
    }

    // DOM MANIPULATION: create the Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "Delete";

    // EVENT HANDLING: when Delete is clicked, remove this task
    deleteBtn.addEventListener("click", function () {
      deleteTask(index);
    });

    // DOM MANIPULATION: put the checkbox, text and button inside the <li>,
    // then put the <li> inside the list on the page
    li.appendChild(checkbox);
    li.appendChild(text);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });

  // Update the "You have ... tasks" line
  updateCount();
}


/* ---------------------------------------------------------
   STEP 5: UPDATE THE TASK COUNTER

   PDF REQUIREMENT: "Dynamic content updates"
   -> the text changes every time a task is added, ticked or deleted
   --------------------------------------------------------- */
function updateCount() {
  // ARRAYS: filter() keeps only the tasks that are done, then we count them
  const doneCount = tasks.filter(function (task) {
    return task.done;
  }).length;

  // DOM MANIPULATION: change the text on the page
  taskCount.textContent =
    "You have " + tasks.length + " task(s), " + doneCount + " completed";
}


/* ---------------------------------------------------------
   STEP 6: ADD A TASK

   PDF REQUIREMENT: "Add tasks"
   --------------------------------------------------------- */
function addTask() {
  // Get what the user typed. trim() removes extra spaces at the ends.
  const text = taskInput.value.trim();

  // Don't allow an empty task
  if (text === "") {
    taskError.textContent = "Please type a task first.";
    return;   // stop here, don't add anything
  }

  // Clear any old error message
  taskError.textContent = "";

  // ARRAYS: push() adds the new task to the END of the array
  tasks.push({
    text: text,
    date: taskDate.value,
    done: false            // new tasks start as not completed
  });

  // Empty the input boxes, ready for the next task
  taskInput.value = "";
  taskDate.value = "";

  saveTasks();   // save to the browser
  showTasks();   // redraw the list
}


/* ---------------------------------------------------------
   STEP 7: MARK A TASK AS COMPLETED (or not completed)

   PDF REQUIREMENT: "Mark tasks as completed"
   -> "!" flips true to false and false to true
   --------------------------------------------------------- */
function toggleTask(index) {
  tasks[index].done = !tasks[index].done;
  saveTasks();
  showTasks();
}


/* ---------------------------------------------------------
   STEP 8: DELETE A TASK

   PDF REQUIREMENT: "Delete tasks"
   -> splice(index, 1) removes 1 item from the array at that position
   --------------------------------------------------------- */
function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  showTasks();
}


/* ---------------------------------------------------------
   STEP 9: LISTEN FOR THE FORM BEING SUBMITTED

   PDF REQUIREMENT: "Event handling"
   -> Runs when the "Add Task" button is clicked
      OR when you press Enter in the text box.
   --------------------------------------------------------- */
taskForm.addEventListener("submit", function (event) {
  // Stop the page from refreshing (that is what forms do by default)
  event.preventDefault();
  addTask();
});


/* ---------------------------------------------------------
   STEP 10: SHOW THE TASKS WHEN THE PAGE FIRST LOADS
   --------------------------------------------------------- */
showTasks();
