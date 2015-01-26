DEFAULT_LIST = {};
number_of_items = 0;

// Extend Storage so that it can store arrays
Storage.prototype.setObj = function(key, obj) {
  return this.setItem(key, JSON.stringify(obj))
}

Storage.prototype.getObj = function(key) {
  return JSON.parse(this.getItem(key))
}

// Add function to trim leading and trailing whitespace
if(typeof(String.prototype.trim) === "undefined")
{
  String.prototype.trim = function() 
  {
    return String(this).replace(/^\s+|\s+$/g, '');
  };
}

document.addEventListener('DOMContentLoaded', function () {
  populateList();
  //img_index = Math.floor((Math.random() * 8) + 1);
  //img_url = 'http://munrocape.github.io/' + img_index + '.png'
  img_url = '../city.jpg';
  $.backstretch(img_url);
});

window.addEventListener("keypress", function(){
  addTodoItem(event);
});

window.addEventListener("click", function(){
  //updateItem(event)
})

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

function resetList()
{
  localStorage.setObj("todoList", DEFAULT_LIST)
}

function reAddToList(todo, strikeThrough)
{ 
  console.log(todo + " has been struck out: " + strikeThrough);
  addItemToList(todo);
}

function addTodoItem(e)
{
  if (!e){
    e = window.event;
  }
  if (e.keyCode == '13'){
    new_todo = document.getElementById('text-input').value.trim();
    if(new_todo != ''){
      addItemToList(new_todo);
      document.getElementById('text-input').value = '';
  	}
  }
}

function addItemToList(todo_str)
{
  var ul = document.getElementById("todo-list");
  var new_li = createTodoLi(todo_str);

  ul.appendChild(new_li);
  addToLocalStorage(todo_str);
  number_of_items += 1;
}

function createTodoLi(todo_str)
{
  var completeButton = document.createElement("a");
  completeButton.setAttribute("id", number_of_items);
  completeButton.setAttribute("class", "uncompleted-item fa fa-check");
  
  var badge = document.createElement("span");
  badge.setAttribute("class", "badge");
  badge.appendChild(completeButton);

  var textNode = document.createTextNode(todo_str);

  var li = document.createElement("li");
  li.setAttribute("class", "list-group-item");
  li.setAttribute("id", number_of_items);
  li.appendChild(badge);
  li.appendChild(textNode);
  
  return li;
}

function addToLocalStorage(todo_str)
{
  curTodo = localStorage.getObj("todoList");
  curTodo[todo_str] = false;
  localStorage.setObj("todoList", curTodo);
}

