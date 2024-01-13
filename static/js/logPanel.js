function logPanel (el, max) {
  if (el) {
    el.innerHTML = '<ul class="log-panel"></ul>'
    setTimeout(() => {
      this.$el = el.querySelector('.log-panel')
    }, 0);
  }
  this.max = max || 100
  this.list = []
  this.add = function (text) {
    if (!text) text = ''
    var time = new Date();
    let hours = time.getHours()
    if (hours <= 9) hours = '0' + hours
    let minutes = time.getMinutes()
    if (minutes <= 9) minutes = '0' + minutes
    let seconds = time.getSeconds()
    if (seconds <= 9) seconds = '0' + seconds
    this.list.push([`${hours}:${minutes}:${seconds}`, text])
    if (this.list.length > this.max) {
      this.list = this.list.slice(1)
    }
    this.make()
  }
  this.make = function () {
    let newHtml = ''
    for (let index = this.list.length - 1; index >= 0; index--) {
      const element = this.list[index];
      newHtml += `<li><span>${element[0]}</span>${element[1]}</li>`
    }
    setTimeout(() => {
      this.$el.innerHTML = newHtml
    }, 0);
  }
}