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
  img_url = '../city.jpg'
  $.backstretch(img_url)
});

window.addEventListener("keypress", function(){
  addTodoItem(event)
});

window.addEventListener("click", function(){
  //updateItem(event)
})

function populateList()
{
  var todoList = localStorage.getObj("todoList");
  if(todoList == undefined){
  localStorage.setObj("todoList", DEFAULT_LIST);
  }
  
  var todoList = localStorage.getObj("todoList");

  for(var todo in todoList){
  if (todoList.hasOwnProperty(todo)) {
    reAddToList(todo, todoList[todo]);
  }
  }
}

function reAddToList(todo, strikeThrough)
{ 
  return;
}

function addTodoItem(e)
{
  if (!e){
    e = window.event;
  }
  if (e.keyCode == '13'){
    new_todo = document.getElementById('text-input').value.trim();
    if(new_todo != ''){
      addNewItemToList(new_todo);
      document.getElementById('text-input').value = '';
  	}
  }
}

function addNewItemToList(todo_str)
{
  console.log(new_todo);
  var ul = document.getElementById("todo-list");
  var new_li = createTodoLi(todo_str);

  ul.appendChild(new_li);
  number_of_items += 1;
}

function createTodoLi(todo_str)
{
  var completeButton = document.createElement("a");
  completeButton.setAttribute("id", number_of_items);
  var completeText = document.createTextNode("Complete");
  completeButton.appendChild(completeText);  
  
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

