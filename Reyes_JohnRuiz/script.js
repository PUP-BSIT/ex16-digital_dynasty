document.addEventListener("DOMContentLoaded", function() {
  initialize();
});

function initialize() {
  const commentNameInput = document.getElementById("comment_name");
  const commentTextInput = document.getElementById("comment_text");
  const submitCommentButton = document.getElementById("submit_comment");
  const commentsContainer = document.getElementById("comments_container");
  const sortAscButton = document.getElementById("sort_asc");
  const sortDescButton = document.getElementById("sort_desc");

  let comments = [];

  function checkCommentValidity() {
    const nameValue = commentNameInput.value.trim();
    const textValue = commentTextInput.value.trim();
    submitCommentButton.disabled = !(nameValue && textValue);
  }

  function submitComment(e) {
    e.preventDefault();
    const name = commentNameInput.value.trim();
    const text = commentTextInput.value.trim();

    if (!name || !text) {
      return;
    }

    addComment(name, text, new Date());
    commentNameInput.value = "";
    commentTextInput.value = "";
    checkCommentValidity();
  }

  function addComment(name, text, date) {
    comments.push({ name, text, date });
    renderComments(comments);
  }

  function createCommentElement(name, text, date) {
    const commentElement = document.createElement("p");
    commentElement.innerHTML = "Name: " + name + "<br>Comment: " + text + "<br><small>" + date.toLocaleString() + "</small>";
    return commentElement;
  }

  function sortComments(ascending) {
    const sortedComments = comments.slice();
    sortedComments.sort(function(a, b) {
      return ascending ? a.date - b.date : b.date - a.date;
    });
    renderComments(sortedComments);
  }

  function renderComments(commentsToRender) {
    commentsContainer.innerHTML = "";
    for (var i = 0; i < commentsToRender.length; i++) {
      const comment = commentsToRender[i];
      const commentElement = createCommentElement(comment.name, comment.text, comment.date);
      commentsContainer.appendChild(commentElement);
    }
    // Re-attach the sort buttons after rendering comments
    commentsContainer.appendChild(sortAscButton);
    commentsContainer.appendChild(sortDescButton);
  }

  checkCommentValidity();
  commentNameInput.addEventListener("input", checkCommentValidity);
  commentTextInput.addEventListener("input", checkCommentValidity);
  submitCommentButton.addEventListener("click", submitComment);
  sortAscButton.addEventListener("click", function() {
    sortComments(true);
  });
  sortDescButton.addEventListener("click", function() {
    sortComments(false);
  });
}
