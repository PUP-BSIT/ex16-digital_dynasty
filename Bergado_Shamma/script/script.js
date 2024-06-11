let nameInput, commentTextarea, commentButton;

document.addEventListener("DOMContentLoaded", function () {
  nameInput = document.getElementById("name");
  commentTextarea = document.getElementById("textarea_for_comment");
  commentButton = document.getElementById("comment");

  function checkFormValidity() {
    let nameValue = nameInput.value.trim();
    let commentValue = commentTextarea.value.trim();
    commentButton.disabled = !(nameValue && commentValue);
  }

  checkFormValidity();

  nameInput.addEventListener("input", checkFormValidity);
  commentTextarea.addEventListener("input", checkFormValidity);
  commentButton.addEventListener("click", addComment);

  loadComments();
});

let comments = [];

function addComment() {
  const nameInputValue = nameInput.value.trim();
  const commentInputValue = commentTextarea.value.trim();
  if (nameInputValue && commentInputValue) {
    const comment = {
      name: nameInputValue,
      text: commentInputValue,
      date: new Date().toISOString(),
    };
    comments.push(comment);
    saveComments();
    displayComments();
    nameInput.value = "";
    commentTextarea.value = "";
    checkFormValidity();
  }
}

function displayComments() {
  const commentsSection = document.querySelector(".comments-of-team");
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
