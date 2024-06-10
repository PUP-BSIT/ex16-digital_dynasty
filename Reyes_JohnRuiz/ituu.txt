document.addEventListener("DOMContentLoaded", function () {
    let nameInput = document.getElementById("name");
    let commentTextarea = document.getElementById("textarea_for_comment");
    let commentButton = document.getElementById("comment");
  
    nameInput.addEventListener("input", checkFormValidity);
    commentTextarea.addEventListener("input", checkFormValidity);
  
    function checkFormValidity() {
      let nameValue = nameInput.value.trim();
      let commentValue = commentTextarea.value.trim();
      commentButton.disabled = !(nameValue && commentValue);
    }
  
    checkFormValidity();
  });
  