number_of_items = 0;

window.addEventListener("keypress", function(){
  checkIfEnter(event)
});
document.addEventListener('DOMContentLoaded', function () {
  populateList();
  $.backstretch('img.png')
});
window.addEventListener("click", function(){
  crossOutItem(event)
})

var background_index = Math.floor(Math.random() * 8) + 1;
background_url = "url('http://munrocape.github.io/" + background_index.toString() + ".png')";
document.body.style.backgroundImage=background_url;

var defaultList = {};

function populateList()
{
  var todoList = localStorage.getObj("todoList");
  if(todoList == undefined){
    localStorage.setObj("todoList", defaultList);
  }
  var todoList = localStorage.getObj("todoList");

  for(var todo in todoList){
    if (todoList.hasOwnProperty(todo)) {
      reAddToList(todo, todoList[todo]);
    }
  }
}

function addToListInStorage(todoItem)
{
  curTodo = localStorage.getObj("todoList");
  curTodo[todoItem] = false;
  localStorage.setObj("todoList", curTodo);
}

function strikeOutInStorage(todoItem)
{
  curTodo = localStorage.getObj("todoList");
  curTodo[todoItem.firstChild.innerHTML] = true;
  localStorage.setObj("todoList", curTodo);
}

function deleteFromStorage(todoItem)
{
  curTodo = localStorage.getObj("todoList");
  delete curTodo[todoItem.firstChild.innerHTML];
  localStorage.setObj("todoList", curTodo);
}

function checkIfEnter(e)
{
  if (!e){
    e = window.event;
  }
  if (e.keyCode == '13'){
    if(document.getElementById('text-input').value != ''){
      addToList();
    }
  }
}

function reAddToList(todo, strikeThrough)
{ 
  var ul = document.getElementById("todo-list");
  
  var li = document.createElement("li");

  var button = document.createElement("button");
    button.setAttribute("class", "complete-button");
    button.setAttribute("id", number_of_items);

  if(strikeThrough){
    li.setAttribute("class", "todo-item completed-item");
    button.innerHTML = "Remove";
  }else{
    li.setAttribute("class", "todo-item");
    button.innerHTML = "Done";
  }
  
  li.setAttribute("id", number_of_items);

  var textSpan = document.createElement('span')
  textSpan.innerHTML = todo;

  li.appendChild(textSpan);
  li.appendChild(button);
  
  var box = document.createElement("div");
  box.setAttribute("class", "item-background");
  box.setAttribute("id", number_of_items);
  box.appendChild(li);
  ul.appendChild(box);
  number_of_items = number_of_items + 1;
}

function addToList()
{
  todo = document.getElementById('text-input').value
  document.getElementById('text-input').value = '';
  
  var ul = document.getElementById("todo-list");
  
  var li = document.createElement("li");
  li.setAttribute("class", "todo-item");
  li.setAttribute("id", number_of_items);

  var textSpan = document.createElement('span')
  textSpan.innerHTML = todo;
  textSpan.setAttribute("class", "item-text");

  li.appendChild(textSpan);

  var button = document.createElement("button");
  button.setAttribute("class", "complete-button");
  button.setAttribute("id", number_of_items);
  
  button.innerHTML = "Done";

  li.appendChild(button);
  
  var box = document.createElement("div");
  box.setAttribute("class", "item-background");
  box.setAttribute("id", number_of_items);
  box.appendChild(li);
  ul.appendChild(box);
  number_of_items = number_of_items + 1;

  addToListInStorage(textSpan.innerHTML)
  return false;
}

function crossOutItem(e)
{
  if (!e) e = window.event;
  btn = e.target || e.srcElement;
  if(btn.className == 'complete-button'){
      if(btn.innerHTML == "Remove"){
        var item = document.getElementById(btn.id).getElementsByClassName("todo-item")[0];
        deleteFromStorage(item);
        item.parentNode.removeChild(item);
      }else{
        var item = document.getElementById(btn.id).getElementsByClassName("todo-item")[0];
        item.setAttribute("class", "todo-item completed-item");
        strikeOutInStorage(item);
        btn.innerHTML = "Remove"
      } 
    }
}


// Extend storage to save arrays as well
Storage.prototype.setObj = function(key, obj) {
    return this.setItem(key, JSON.stringify(obj))
}
Storage.prototype.getObj = function(key) {
    return JSON.parse(this.getItem(key))
}
