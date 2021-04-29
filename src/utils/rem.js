export default function rem () {
  var width = document.documentElement.clientWidth
  var size = 37.5 / 375 * width
  document.documentElement.style.fontSize = size + 'px'
  window.onresize = function () {
    var width = document.documentElement.clientWidth
    var size = 37.5 / 375 * width
    document.documentElement.style.fontSize = size + 'px'
  }
}
