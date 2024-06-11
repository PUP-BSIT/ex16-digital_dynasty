document.addEventListener("DOMContentLoaded", function () {
  const nameInput = document.getElementById("name");
  const commentTextarea = document.getElementById("textarea_for_comment");
  const commentButton = document.getElementById("comment");

  nameInput.addEventListener("input", checkFormValidity);
  commentTextarea.addEventListener("input", checkFormValidity);
  commentButton.addEventListener("click", addComment);

  document.getElementById("sort_asc").addEventListener("click", function () {
    sortComments("asc");
  });
  document.getElementById("sort_desc").addEventListener("click", function () {
    sortComments("desc");
  });

  loadComments();
});

let comments = [];

function checkFormValidity() {
  const nameValue = document.getElementById("name").value.trim();
  const commentValue = document
    .getElementById("textarea_for_comment")
    .value.trim();
  document.getElementById("comment").disabled = !(nameValue && commentValue);
}

function addComment() {
  const nameInput = document.getElementById("name").value;
  const commentInput = document.getElementById("textarea_for_comment").value;
  if (nameInput.trim() && commentInput.trim()) {
    const comment = {
      name: nameInput,
      text: commentInput,
      date: new Date().toISOString(),
    };
    comments.push(comment);
    saveComments();
    displayComments();
    document.getElementById("name").value = "";
    document.getElementById("textarea_for_comment").value = "";
    document.getElementById("comment").disabled = true;
  }
}

function displayComments() {
  const commentsSection = document.querySelector(".comments-of-team-comment");
  commentsSection.innerHTML = "<h3>Comments</h3>";
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
