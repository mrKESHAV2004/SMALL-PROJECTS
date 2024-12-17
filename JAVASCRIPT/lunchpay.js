function lunch(names){
    var numberofPeople= names.length;
    var randomPos = Math.floor(Math.random()*numberofPeople);
    var person=names[randomPos];
    return person;
}
names=["a","b","c","d","e"];
console.log(lunch(names),"is going to pay the bill")