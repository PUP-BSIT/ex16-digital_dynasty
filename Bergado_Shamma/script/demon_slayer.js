document.addEventListener("DOMContentLoaded", function () {
  fetchCharacters();
});

function fetchCharacters() {
  fetch("demon_slayer.php")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      if (data.error) {
        console.error("API Error:", data.error);
        return;
      }
      let tableBody = document.querySelector("#character_table tbody");
      tableBody.innerHTML = "";
      data.forEach((character) => {
        let row = `<tr>
                <td>${character.character_name}</td>
                <td>${character.role}</td>
                <td>${character.breathing_style}</td>
                <td>${character.rank}</td>
                <td>${character.age}</td>
                <td>
                    <button onclick="deleteCharacter(${character.id})">Delete</button>
                    <button onclick="editCharacter(${character.id}, 
                    '${character.character_name}', 
                    '${character.role}', 
                    '${character.breathing_style}', 
                    '${character.rank}', 
                    '${character.age}')">Edit</button>
                </td>
            </tr>`;
        tableBody.innerHTML += row;
      });
    })
    .catch((error) => console.error("Error fetching characters:", error));
}

function insertCharacter() {
  let character_name = document.getElementById("character_name").value;
  let role = document.getElementById("role").value;
  let breathing_style = document.getElementById("breathing_style").value;
  let rank = document.getElementById("rank").value;
  let age = document.getElementById("age").value;

  fetch("demon_slayer.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ character_name, role, breathing_style, rank, age }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        alert("Error: " + data.error);
      } else {
        alert(data.message || "Character added successfully");
        fetchCharacters();
        clearForm();
      }
    })
    .catch((error) => console.error("Error adding character:", error));
}

function deleteCharacter(id) {
  fetch("demon_slayer.php", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        alert("Error: " + data.error);
      } else {
        alert(data.message);
        fetchCharacters();
      }
    })
    .catch((error) => console.error("Error deleting character:", error));
}

function editCharacter(id, character_name, role, breathing_style, rank, age) {
  document.getElementById("character_name").value = character_name;
  document.getElementById("role").value = role;
  document.getElementById("breathing_style").value = breathing_style;
  document.getElementById("rank").value = rank;
  document.getElementById("age").value = age;
  document.getElementById("character_id").value = id;
  document.getElementById("add_btn").innerText = "Update Character";
  document.getElementById("add_btn").onclick = function () {
    updateCharacter(id);
  };
}

function updateCharacter(id) {
  let character_name = document.getElementById("character_name").value;
  let role = document.getElementById("role").value;
  let breathing_style = document.getElementById("breathing_style").value;
  let rank = document.getElementById("rank").value;
  let age = document.getElementById("age").value;

  fetch("demon_slayer.php", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, character_name, role, breathing_style, rank, age }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        alert("Error: " + data.error);
      } else {
        alert(data.message || "Character updated successfully");
        fetchCharacters();
        clearForm();
      }
    })
    .catch((error) => console.error("Error updating character:", error));
}

function clearForm() {
  document.getElementById("character_name").value = "";
  document.getElementById("role").value = "";
  document.getElementById("breathing_style").value = "";
  document.getElementById("rank").value = "";
  document.getElementById("age").value = "";
  document.getElementById("character_id").value = "";
  document.getElementById("add_btn").innerText = "Add Character";
  document.getElementById("add_btn").onclick = insertCharacter;
}