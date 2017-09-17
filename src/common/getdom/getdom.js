export function getdata(el, name, val) {
   let elname = 'data-'
   return el.getAttribute(elname + name)
}
let elementstyle = document.createElement('div').style
let vendor = (function () {
   let transfromname = {
      webkit: 'webkitTransform',
      Moz: 'MozTransform',
      O: 'OTransform',
      ms: 'msTransform',
      standard: 'transform'
   }
   for (let key in transfromname) {
      if (elementstyle[transfromname[key]] !== undefined) {
         return key
      }
   }
   return false
})()
export function prefixstyle(style) {
   return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}
