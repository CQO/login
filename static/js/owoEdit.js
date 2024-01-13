function owoEdit(dom, data, config) {
    window.owoEditData = data
    let newHTML = ''
    for (item in config.show) {
        if (window.owoEditData[item]) {
            newHTML += `<h4>${config.show[item]}:</h4><input type="text" id="input_${item}" onInput="owoEditOnChange('${item}', this)" value="${window.owoEditData[item]}">`
        }
    }
    dom.classList.add('owo')
    dom.innerHTML = newHTML
}
function owoEditOnChange(key, el) {
    console.log(el)
    window.owoEditData[key] = el.value
}