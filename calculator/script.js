
function add(){
    var n1 = parseInt(document.getElementById('n1').value);
    var n2 = parseInt(document.getElementById('n2').value);
    var n3=n1+n2;
    document.getElementById('ans').textContent = n3;
}
function sub(){
    var n1 = parseInt(document.getElementById('n1').value);
    var n2 = parseInt(document.getElementById('n2').value);
    var n3=n1-n2;
    document.getElementById('ans').textContent = n3;
}
function multi(){
    var n1 = parseInt(document.getElementById('n1').value);
    var n2 = parseInt(document.getElementById('n2').value);
    var n3=n1*n2;
    document.getElementById('ans').textContent = n3;
}
function divide(){
    var n1 = parseInt(document.getElementById('n1').value);
    var n2 = parseInt(document.getElementById('n2').value);
    var n3=n1/n2;
    document.getElementById('ans').textContent = n3;
}
function sqrt(){
    var n1 = parseInt(document.getElementById('n1').value);
    var n3=Math.sqrt(n1);
    document.getElementById('ans').textContent = n3;
}
function cubert(){
    var n = parseInt(document.getElementById('n1').value);
    var n3=Math.pow(n,1/3);
    document.getElementById('ans').textContent = n3;
}
function square(){
    var n1 = parseInt(document.getElementById('n1').value);
    var n3=Math.pow(n1,2);
    document.getElementById('ans').textContent = n3;
}
function cube(){
    var n1 = parseInt(document.getElementById('n1').value);
    var n3=Math.pow(n1,3);
    document.getElementById('ans').textContent = n3;
}
function sin(){
    var n = parseFloat(document.getElementById('angle').value);
    var n1=n*(Math.PI/180);
    var n3=Math.sin(n1);
    document.getElementById('ans').textContent = n3;
}
function cos(){
    var n = parseFloat(document.getElementById('angle').value);
    var n1=n*(Math.PI/180);
    var n3=Math.cos(n1);
    document.getElementById('ans').textContent = n3;
}
function tan(){
    var n = parseFloat(document.getElementById('angle').value);
    var n1=n*(Math.PI/180);
    var n3=Math.tan(n1);
    document.getElementById('ans').textContent = n3;
}
function log(){
    var n = parseFloat(document.getElementById('n1').value);
    var n3=Math.log(n);
    document.getElementById('ans').textContent = n3;
}