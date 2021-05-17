
let score = {}
//Demonstrating the ability to use multiple products - we will use products to demonstrate (since no get endpoint
//provided)
//I made the assumption that the return value would be a json object with all products id: name

const products = {"AEDOER1345": "Rhino", "LTERTE345": "Home API", "FEIENN3334": "End Systems"}
const main = document.getElementById("main")
let keys = Object.keys(products)
for (let r = 0; r < keys.length; r++){
  let div = document.createElement("div")
  div.id = keys[r] + "-base"
  let title = document.createElement("h4")
  let titleName = document.createTextNode(products[keys[r]])
  title.appendChild(titleName)
  let oSpan = document.createElement("span")
  oSpan.id = keys[r]
  oSpan.onmouseleave = function () {
    onLeave(keys[r])
  }
  for (let j = 0; j < 5; j++){
    let n = j + 1
    let star = document.createElement("span")
    star.id = "star-"+n+"-"+keys[r]
    star.className = "fa fa-star-o"
    star.style.color = "black"
    star.onmouseover = function () {
      highlight(n,false, keys[r])
    }
    star.onclick = function (){
      submit(n, keys[r])
    }
    oSpan.appendChild(star)
  }
  let sp = document.createElement("br")
  div.appendChild(title)
  div.appendChild(sp)
  div.appendChild(oSpan)
  div.appendChild(sp)
  main.appendChild(div)

}
//Function highlights the stars based on two aspects
//num - number of stars
//conf - confirmed (true) or not (false)
function highlight(num, conf, id){
  //set the right color
  let color = "grey"
  if (conf){
    color = "black"
  }
  let star1 = document.getElementById("star-1-"+id)
  let star2 = document.getElementById("star-2-"+id)
  let star3 = document.getElementById("star-3-"+id)
  let star4 = document.getElementById("star-4-"+id)
  let star5 = document.getElementById("star-5-"+id)

  let arr = [star1,star2,star3,star4,star5]
  let max = 5
  for (let i = 0; i < num; i++){
    arr[i].className = "fa fa-star"
    arr[i].style.color = color
  }
  for (let i = num; i < max; i++){
    arr[i].className = "fa fa-star-o"
    arr[i].style.color = "black"
  }
}

//No user ID - the score will be saved as {"product-id" : rating}
function submit(num, id){
  //we can get the id by querying the child
  score[id] = num
  highlight(num,true, id)
  UserAction()
  //communicate score to REST API

}

//Post the score to the REST endpoint
//We do not have an ID of the user so this is just a general posting
//A simple fix would be to include one in "score" and reference {"userId" : {"productId" : rating }}
function UserAction() {
  const xhttp = new XMLHttpRequest();
  xhttp.open("POST", "http://example.com/example.html", true);
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      alert(this.responseText);
    }
  };
  xhttp.setRequestHeader("Content-type", "application/json");
  //extra sanity check that this is being recorded as it should - feel free to remove
  console.log("You will be posting the following: "+ JSON.stringify(score))
  //It will fail, the url is bogus
  xhttp.send(JSON.stringify(score));
}

function onLeave(id){
  if (id in score){
    highlight(score[id], true, id)
  } else {
    highlight(0, false, id)
  }
}
