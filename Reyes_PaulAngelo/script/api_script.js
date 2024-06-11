document.addEventListener("DOMContentLoaded", function () {
  fetchcharacter();
});

function fetchcharacter() {
  fetch("./backend/slime_rest.php")
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
      data.forEach((slime) => {
        let row = `<tr>
                <td>${slime.character}</td>
                <td>${slime.species}</td>
                <td>${slime.from_where}</td>
                <td>${slime.rank}</td>
                <td>${slime.title}</td>
                <td>
                    <button onclick="deletecharacter(${slime.id})">Delete</button>
                    <button onclick="edit_character(${slime.id}, 
                    '${slime.movie_name}', 
                    '${slime.species}', '${slime.from_where}', 
                    '${slime.rank}', '${slime.title}')">Edit</button>
                </td>
            </tr>`;
        tableBody.innerHTML += row;
      });
    })
    .catch((error) => console.error("Error fetching character:", error));
}

function insertcharacter() {
  let movie_name = document.getElementById("character").value;
  let species = document.getElementById("species").value;
  let from_where = document.getElementById("from_where").value;
  let rank = document.getElementById("rank").value;
  let title = document.getElementById("title").value;

  fetch("./backend/slime_rest.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ character, species, from_where, rank, title }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        alert("Error: " + data.error);
      } else {
        alert(data.message || "Character added successfully");
        fetchcharacter();
        clearForm();
      }
    })
    .catch((error) => console.error("Error adding movie:", error));
}

function deleteMovie(id) {
  fetch("./backend/slime_rest.php", {
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
        fetchcharacter();
      }
    })
    .catch((error) => console.error("Error deleting character:", error));
}

function edit_character(id, movie_name, species, from_where, rank, title) {
  document.getElementById("character").value = movie_name;
  document.getElementById("species").value = species;
  document.getElementById("from_where").value = from_where;
  document.getElementById("rank").value = rank;
  document.getElementById("title").value = title;
  document.getElementById("movie_id").value = id;
  document.getElementById("add_btn").innerText = "Update character";
  document.getElementById("add_btn").onclick = function () {
    updateMovie(id);
  };
}

function update_character(id) {
  let movie_name = document.getElementById("character").value;
  let species = document.getElementById("species").value;
  let from_where = document.getElementById("from_where").value;
  let rank = document.getElementById("rank").value;
  let title = document.getElementById("title").value;

  fetch("./backend/slime_rest.php", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, character, species, from_where, rank, title}),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        alert("Error: " + data.error);
      } else {
        alert(data.message || "Character" updated successfully");
        fetchcharacter();
        clearForm();
      }
    })
    .catch((error) => console.error("Error updating movie:", error));
}

function clearForm() {
  document.getElementById("character").value = "";
  document.getElementById("species").value = "";
  document.getElementById("from_where").value = "";
  document.getElementById("rank").value = "";
  document.getElementById("title").value = "";
  document.getElementById("add_btn").innerText = "Add character";
  document.getElementById("add_btn").onclick = insert_char;
} 