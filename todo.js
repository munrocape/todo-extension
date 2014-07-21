// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * Global variable containing the query we'd like to pass to Flickr. In this
 * case, kittens!
 *
 * @type {string}
 */
var QUERY = 'kittens';

var kittenGenerator = {
  /**
   * Flickr URL that will give us lots and lots of whatever we're looking for.
   *
   * See http://www.flickr.com/services/api/flickr.photos.search.html for
   * details about the construction of this URL.
   *
   * @type {string}
   * @private
   */
  searchOnFlickr_: 'https://secure.flickr.com/services/rest/?' +
      'method=flickr.photos.search&' +
      'api_key=90485e931f687a9b9c2a66bf58a3861a&' +
      'text=' + encodeURIComponent(QUERY) + '&' +
      'safe_search=1&' +
      'content_type=1&' +
      'sort=interestingness-desc&' +
      'per_page=20',

  /**
   * Sends an XHR GET request to grab photos of lots and lots of kittens. The
   * XHR's 'onload' event is hooks up to the 'showPhotos_' method.
   *
   * @public
   */
  requestKittens: function() {
    var req = new XMLHttpRequest();
    req.open("GET", this.searchOnFlickr_, true);
    req.onload = this.showPhotos_.bind(this);
    req.send(null);
  },

  /**
   * Handle the 'onload' event of our kitten XHR request, generated in
   * 'requestKittens', by generating 'img' elements, and stuffing them into
   * the document for display.
   *
   * @param {ProgressEvent} e The XHR ProgressEvent.
   * @private
   */
  showPhotos_: function (e) {
    var kittens = e.target.responseXML.querySelectorAll('photo');
    for (var i = 0; i < kittens.length; i++) {
      var img = document.createElement('img');
      img.src = this.constructKittenURL_(kittens[i]);
      img.setAttribute('alt', kittens[i].getAttribute('title'));
      document.body.appendChild(img);
    }
  },

  /**
   * Given a photo, construct a URL using the method outlined at
   * http://www.flickr.com/services/api/misc.urlKittenl
   *
   * @param {DOMElement} A kitten.
   * @return {string} The kitten's URL.
   * @private
   */
  constructKittenURL_: function (photo) {
    return "http://farm" + photo.getAttribute("farm") +
        ".static.flickr.com/" + photo.getAttribute("server") +
        "/" + photo.getAttribute("id") +
        "_" + photo.getAttribute("secret") +
        "_s.jpg";
  }
};

number_of_items = 0;

// Run our kitten generation script as soon as the document's DOM is ready.
document.addEventListener('DOMContentLoaded', function () {

  kittenGenerator.requestKittens();
});
window.addEventListener("keypress", function(){
  checkIfEnter(event)
});
window.addEventListener("click", function(){
  crossOutItem(event)
})

function checkIfEnter(e)
{
  if (!e) e = window.event;
  if (e.keyCode == '13'){
    if(document.getElementById('text-input').value != ''){
      todo = document.getElementById('text-input').value
      document.getElementById('text-input').value = '';
      
      var ul = document.getElementById("todo-list");
      
      var li = document.createElement("li");
      li.setAttribute("class", "todo-item");
      li.setAttribute("id", number_of_items);
      li.appendChild(document.createTextNode(todo));

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
      return false;
    }
  }
}

function crossOutItem(e)
{
  if (!e) e = window.event;
  btn = e.target || e.srcElement;
  if(btn.id != 'text-input'){
      if(btn.innerHTML == "Remove"){
      }else{
        console.log(btn.id);
        document.getElementById(btn.id).getElementsByClassName("todo-item")[0].setAttribute("class", "todo-item completed-item");
        console.log(document.getElementById(btn.id).getElementsByClassName("todo-item")[0]);
        btn.innerHTML = "Remove"
      }
      
    }

    
  
}
