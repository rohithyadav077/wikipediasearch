let todoUserInput = document.getElementById("todoUserInput");
let addBtn = document.getElementById("addBtn");
let todoItemsContainer = document.getElementById("todoItemsContainer");
let saveBtn = document.getElementById("saveBtn");

function gettodoListfrmlocalStorage() {
    let stringitems = localStorage.getItem("todoList");
    let parseItem = JSON.parse(stringitems);
    if (parseItem === null) {
        return [];
    } else {
        return parseItem;
    }

}
let todoList = gettodoListfrmlocalStorage();
saveBtn.onclick = function() {
    localStorage.setItem("todoList", JSON.stringify(todoList));
}

function onTodoStatusChange(checkboxId, labelId, todoId) {
    let labelEl = document.getElementById(labelId);
    let checkboxEl = document.getElementById(checkboxId);
    if (checkboxEl.checked) {
        labelEl.classList.add("text-style");
    } else {
        labelEl.classList.remove("text-style");
    }

    let index = todoList.findIndex(function(each) {
        return "todo" + each.uniqueNo === todoId;
    });

    todoList[index].isChecked = checkboxEl.checked;

    // persist changes
    localStorage.setItem("todoList", JSON.stringify(todoList));

}

function deleteItem(todoId) {
    let item = document.getElementById(todoId);
    todoItemsContainer.removeChild(item);
    let index = todoList.findIndex(function(eachitem) {
        let eachitemid = "todo" + eachitem.uniqueNo;
        if (eachitemid === todoId) {
            return true;
        } else {
            return false;
        }
    });
    todoList.splice(index, 1);
}


function createAndAppendTodoList(eachItem) {
    let todoId = "todo" + eachItem.uniqueNo;
    let labelId = "label" + eachItem.uniqueNo;
    let checkboxId = "checkbox" + eachItem.uniqueNo;
    let listItem = document.createElement("li");
    listItem.id = todoId;
    listItem.classList.add("d-flex", "flex-row", "todo-item-container");
    todoItemsContainer.appendChild(listItem);

    let inputEl = document.createElement("input");
    inputEl.type = "checkbox";
    inputEl.id = checkboxId;
    inputEl.checked = eachItem.isChecked;
    inputEl.classList.add("checkbox-input");
    inputEl.onclick = function() {
        onTodoStatusChange(checkboxId, labelId, todoId);
    };
    listItem.appendChild(inputEl);

    let containerLabel = document.createElement("div");
    containerLabel.classList.add("d-flex", "flex-row", "label-container", "todo-items-container");
    listItem.appendChild(containerLabel);

    let labelElement = document.createElement("label");
    labelElement.id = labelId;
    labelElement.classList.add("checkbox-label");
    labelElement.setAttribute("for", checkboxId);
    labelElement.textContent = eachItem.text;
    if (eachItem.isChecked === true) {
        labelElement.classList.add("text-style");
    }
    containerLabel.appendChild(labelElement);

    let deleteIconContainer = document.createElement("div");
    deleteIconContainer.classList.add("delete-icon-container");
    containerLabel.appendChild(deleteIconContainer);

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");
    deleteIcon.onclick = function() {
        deleteItem(todoId);
    };
    deleteIconContainer.appendChild(deleteIcon);
}
let todoListLenght = todoList.length;
addBtn.onclick = function() {
    let userInput = todoUserInput.value;
    todoListLenght = todoListLenght + 1;
    if (userInput === "") {
        alert("Enter valid input");
    } else {
        let newTodo = {
            text: userInput,
            uniqueNo: todoListLenght,
            isChecked: false
        };
        createAndAppendTodoList(newTodo);
        todoList.push(newTodo);
    }
    todoUserInput.value = "";
};

for (let eachItem of todoList) {
    createAndAppendTodoList(eachItem);
}