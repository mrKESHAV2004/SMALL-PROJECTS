var guestlist=["a","b","c","d","e","f"];
var guest_name=prompt("Enter a name");
if(guestlist.includes(guest_name)){
    alert("guest is on the list");
}else{
    alert("guest is not in the list");
}