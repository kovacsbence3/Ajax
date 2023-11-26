const api_url = "https://retoolapi.dev/MTLEZa/data";

document.addEventListener("DOMContentLoaded", ()=> {
  const peopleTable =  document.getElementById("peopleTable");
  const personForm = document.getElementById("personForm");
  const personTable = document.getElementById("personTable")
  personForm.addEventListener("submit", newPerson)
//  personTable.addEventListener("delete", deletePerson(person.id))
//  personTable.addEventListener("modify", modifyPerson(person.id))
  fetch(api_url).then(httpResponse => httpResponse.json())
  .then(responseBody => {
    let html = "";
  responseBody.forEach(person => {

    const actionsTableData = document.createElement("td")
    const deleteButton = document.createElement("button")
    const modifyButton = document.createElement("button")
    deleteButton.textContent = "Törlés";
    modifyButton.textContent = "Szerkesztés";
    deleteButton.addEventListener("click", () => deletePerson(person.id))
    deleteButton.addEventListener("click", () => modifyPerson(person.id))
    actionsTableData.appendChild(deleteButton)
    actionsTableData.appendChild(modifyButton)

    const tableRow = `<tr>
    <td>${person.id}</td>
    <td>${person.Name}</td>
    <td>${person.Birthdate}</td>
    <td>${person.Birthplace}</td>
    <td>${person.IdCardNumber}</td>
    <td>${deleteButton}</td>
    <td>${modifyButton}</td>
    </tr>`;

    html += tableRow;
  });
  peopleTable.innerHTML = html;
  });
})

async function newPerson(event){
  event.preventDefault();
  const Name = document.getElementById("Name").value
  const Birthdate = document.getElementById("Birthdate").value
  const Birthplace = document.getElementById("Birthplace").value
  const IdCardNumber = document.getElementById("IdCardNumber").value
  const person = {
    Name: Name,
    Birthdate: Birthdate,
    Birthplace: Birthplace,
    IdCardNumber: IdCardNumber
  };
  const response = await fetch(api_url, {
    method: "POST",
    body: JSON.stringify(person),
    headers: {
      "Content-Type": "application/json"
    }
  });
  if (response.ok){
    window.location.reload()
  }

  // async function deletePerson(id){
  //   const response = await fetch(`${api_url}/${id}`, {method: "DELETE"});


  // }
  // async function modifyPerson(id){
  //   const response = await fetch(api_url);
    
  // }
}

function resetForm(){
  document.getElementById("Name").value = "";
  document.getElementById("Birthdate").value = "";
  document.getElementById("Birthplace").value = "";
  document.getElementById("IdCardNumber").value = "";
}


async function deletePerson(id){
  const response = await fetch(`${api_url}/${id}`, {method: "DELETE"})
}
async function modifyPerson(id){
  const response = await fetch(`${api_url}/${id}`, {method: "UPDATE"})
}