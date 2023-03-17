const button = document.getElementById("button")

function sendInfo(){
   let info = {
    name: document.getElementById("name").value,
    age: document.getElementById("age").value,
    surname: document.getElementById("surname").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value
 }
   
 fetch("/registration", {
    method:"POST",
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSONE.stringify(info),
   })
}

button.addEventListener("click", sendInfo )