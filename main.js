const errorMsg = document.querySelector("#error");

const todoTitle = document.getElementById("todoTitle");
const count = document.getElementById("counter");
const todobtn = document.getElementById("addTodoButton");
const todoInput = document.getElementById("todoInput");


// Fade in's
setTimeout(function () {
  todoTitle.style.opacity = 1;
}, 1200);

setTimeout(function () {
  count.style.opacity = 1;
}, 1400);

setTimeout(function () {
  todoInput.style.opacity = 1;
  todobtn.style.opacity = 1;
}, 1600);

const todoList = [];
let todoButton = document.getElementById("addTodoButton");
todoButton.addEventListener("click", addToList);

function addToList() {
  const inputName = document.getElementById("input").value;
  if (inputName.length != 0) {
    let todoObject = {
      todoId: todoList.length,
      todoName: inputName,
      todoComp: false,
      todoAni: false,
    };
    // console.log(todoObject);
    document.getElementById("input").value = ""; //Clears the <input> field
    todoList.push(todoObject);
    todoOutput();
  } else
    errorMsg.innerText = "Input must not be empty";
  errorMsg.classList.add("error");
}

function todoOutput() {
  //Clears the list
  document.getElementById("myTodoList").innerHTML = "";
  errorMsg.classList.remove("error");


  todoList.forEach((index) => {

    //Creates a lable in the list item abowe
    let myDiv = document.createElement("div");
    //Creates a list item
    let dynamicLi = document.createElement("li");
    //Creates a <p> to the label
    let myPara = document.createElement("p");

    //Checks what CSS class to use.
    myPara.classList.add("todoListItem");
    if (!index.todoAni) {
      dynamicLi.classList.add("todoInsertAni");
      index.todoAni = true;
    }

    if (index.todoComp) {
      myPara.classList.add("taskDone");
    }
    myPara.setAttribute("id", index.todoId);

    //Block for: "Click to compleate task"
    myPara.addEventListener("click", function () {
      if (index.todoComp != true) {
        index.todoComp = true;
        this.classList.add("taskDone");
      } else if (index.todoComp) {
        index.todoComp = false;
        this.classList.remove("taskDone");
      }
      countCompleation(todoList);

    });

    // Block for: to add delete icon's with eventListeners
    let myTrashcan = document.createElement("div");
    myTrashcan.classList.add("trashcan");
    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fa");
    deleteIcon.classList.add("fa-trash");

    // REMOVE OBJECT
    myTrashcan.addEventListener("click", function () {
      clearErrorMsg;
      if (todoList.length == 1) {
        todoList.pop();
        todoOutput();
      } else if (1 < todoList.length) {
        todoList.splice(todoList.indexOf(index), 1);
        todoOutput();
      }
    });
    
    myTrashcan.appendChild(deleteIcon);

    myPara.textContent = index.todoName; //Sets the todoTask to the P-tag
    myDiv.appendChild(myPara); //appends the <p> to the Lable
    // myPara.appendChild(mySpan);
    dynamicLi.appendChild(myDiv); //appends the lable with <p> to the Line
    dynamicLi.appendChild(myTrashcan);
    document.getElementById("myTodoList").appendChild(dynamicLi);
  });
  clearErrorMsg;
  countCompleation(todoList);
}

function countCompleation(list) {
  let count = 0;
  list.forEach((comp) => {
    if (comp.todoComp) count++;
  });
  counter.textContent = count + " Completed";
}

function clearErrorMsg(){
  errorMsg.classList.remove("error");

  if (errorMsg.innerText.length != 0) {
    errorMsg.innerText = "";
  }
}