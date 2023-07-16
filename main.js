var nameinput= document.getElementById("name");
var url= document.getElementById("url");
var btn= document.getElementById("addbtn");
var table= document.getElementById("tableb");
var bookmarks=[];
var mainindex=0;
if(localStorage.getItem("Bookmarks")!=null){
    bookmarks=JSON.parse(localStorage.getItem("Bookmarks"));
    display();
}
var Nregex = /^[A-Za-z_]{1,}$/
function isNameValid(){
    if(Nregex.test(nameinput.value)){
        return true;
    }else{
return false;
    }
}
var Uregex =/^(https:\/\/)?(www\.)?[A-Za-z0-9_\.]{1,}\.[a-z]{3}$/
function isurlValid(){
    if(Uregex.test(url.value)){
        return true;
    }else{
return false;
    }
}
 
nameinput.onkeyup =function(){
    if(isurlValid() && isNameValid()){
        btn.removeAttribute("disabled")
    }else{
        btn.disabled ="true";
    }
}
url.onkeyup =function(){
    if(isurlValid() && isNameValid()){
        btn.removeAttribute("disabled")
    }else{
        btn.disabled ="true";
    }
}


function add(){
    if(btn.innerHTML=="update"){
        btn.innerHTML="submit";
        var bookmark ={
            name: nameinput.value,
           url: url.value
        
        
        }
        bookmarks.splice(mainindex,1,bookmark);
    }else{
        var bookmark ={
            name: nameinput.value,
           url: url.value
        
        
        }
        bookmarks.push(bookmark)
    }
   
   
    localStorage.setItem('Bookmarks',JSON.stringify(bookmarks))
    display();
    clearForm();
}

function clearForm(){
    nameinput.value='';
    url.value='';

}
function display(){
    var cartona =``;
    for (var i = 0; i < bookmarks.length; i++) {
       
        cartona +=`<tr>
        <td>`+bookmarks[i].name+`</td>
        <td><a href="${bookmarks[i].url}"><button class="btn  btn-primary" >visit </button></a></td>
<td><button onclick="updatebtn(${i})" class="btn  btn-warning"> update</button></td>
<td><button onclick="deletebtn(${i})" class="btn  btn-danger"> delete</button></td>
    </tr>`
    }
    document.getElementById("tableb").innerHTML=cartona
}
function deletebtn(index){
    bookmarks.splice(index,1);
    localStorage.setItem('Bookmarks',JSON.stringify(bookmarks))
    display();
}
function updatebtn(index){
    
  
    nameinput.value=bookmarks[index].name;
    url.value=bookmarks[index].url;

 btn.innerHTML="update"
 mainindex=index;
}
function search(term){
   
    var cartona =``;
    for(var i= 0; i<bookmarks.length;i++){

if(bookmarks[i].name.toLowerCase().includes(term.toLowerCase())){
    cartona +=`<tr>
    <td>`+[i +1]+`</td>
    <td>`+bookmarks[i].name+`</td>
    <td><a href="${bookmarks[i].url}"><button class="btn  btn-primary" >visit </button></a></td>
<td><button  onclick="updatebtn(${i})" class="btn  btn-warning"> update</button></td>
<td><button onclick="deletebtn(${i})" class="btn  btn-danger"> delete</button></td>
</tr>`
}
    }
    document.getElementById("tableb").innerHTML=cartona;
}


