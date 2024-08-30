const display = document.getElementById("result")

function show(input){
    display.value += input
}    
function clearScreen(){
display.value = ''
}
function calculate(){
    display.value = eval(display.value)
}
