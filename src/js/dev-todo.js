// Extend Storage so that it can store arrays
Storage.prototype.setObj = function(key, obj) {
    return this.setItem(key, JSON.stringify(obj))
}
Storage.prototype.getObj = function(key) {
    return JSON.parse(this.getItem(key))
}

document.addEventListener('DOMContentLoaded', function () {
  //populateList();
  //img_index = Math.floor((Math.random() * 8) + 1);
  //img_url = 'http://munrocape.github.io/' + img_index + '.png'
  img_url = '../city.jpg'
  $.backstretch(img_url)
});