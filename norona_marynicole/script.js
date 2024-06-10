document.addEventListener("DOMContentLoaded", function () {
  let nameInput = document.getElementById("name");
  let commentTextarea = document.getElementById("gcomment");
  let commentButton = document.getElementById("comment_button");

  nameInput.addEventListener("input", checkFormValidity);
  commentTextarea.addEventListener("input", checkFormValidity);
  commentButton.addEventListener("click", addComment);

  function checkFormValidity() {
    let nameValue = nameInput.value.trim();
    let commentValue = commentTextarea.value.trim();
    commentButton.disabled = !(nameValue && commentValue);
  }

  checkFormValidity();

  loadComments();
});

let comments = [];

checkFormValidity();

function addComment() {
  const nameInput = document.getElementById("name").value;
  const commentInput = document.getElementById("gcomment").value;

  if (!nameInput.trim() || !commentInput.trim()) {
    return;
  }

  const comment = {
    name: nameInput,
    text: commentInput,
    date: new Date().toISOString(),
  };
  comments.push(comment);
  saveComments();
  displayComments();
  document.getElementById("name").value = "";
  document.getElementById("gcomment").value = "";
}

function displayComments() {
  const commentsSection = document.querySelector(".comment");
  commentsSection.innerHTML = "<h2 class='comment'>COMMENTS</h2>";
  comments.forEach((comment) => {
    const commentDiv = document.createElement("div");
    commentDiv.classList.add("comment");
    const commentDate = new Date(comment.date).toLocaleString();
    commentDiv.innerHTML = `
                  <p>Name: ${comment.name}</p>
                  <p>Comment: ${comment.text}</p>
                  <p class="comment-date">Date: ${commentDate}</p>
              `;
    commentsSection.appendChild(commentDiv);
  });
}

function sortComments(order) {
  if (order === "asc") {
    comments.sort((a, b) => new Date(a.date) - new Date(b.date));
  } else if (order === "desc") {
    comments.sort((a, b) => new Date(b.date) - new Date(a.date));
  }
  displayComments();
}

function saveComments() {
  localStorage.setItem("comments", JSON.stringify(comments));
}

function loadComments() {
  const storedComments = localStorage.getItem("comments");
  if (storedComments) {
    comments = JSON.parse(storedComments);
    displayComments();
  }
}
