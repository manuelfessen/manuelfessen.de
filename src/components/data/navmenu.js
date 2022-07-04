$(function () {
  //hamburger menu toggle

  const menuButton = $("#menu-button");

  menuButton.on("click", function (e) {
    $("#close").removeClass("hidden");
    $("#close").addClass("block");
    menuButton.addClass("hidden");
    $("#menu-list").removeClass("hidden");
    $("#menu-list").addClass("block");
  });

  $("#close").click(function () {
    $("#close").removeClass("block");
    $("#close").addClass("hidden");
    menuButton.removeClass("hidden");
    menuButton.addClass("block");
    $("#menu-list").removeClass("block");
    $("#menu-list").addClass("hidden");
  });

  /*esto es lo ultimo que agregue*/
  $("#gigs-anchor").click(function () {
    $("#menu-list").removeClass("block");
    $("#menu-list").addClass("hidden");
    $("#close").removeClass("block");
    $("#close").addClass("hidden");
    menuButton.removeClass("hidden");
    $("#close").addClass("block");
  });

  /*Form Validation with jQuery
  source: https://www.geeksforgeeks.org/form-validation-using-jquery/*/

  // Validate name
  $("#name-error").hide();
  let nameError = true;
  $("#name").keyup(() => {
    validateName();
  });

  const validateName = () => {
    let name = $("#name").val();
    if (name === "") {
      $("#name-error").show();
      nameError = false;
      return false;
    } else {
      $("#name-error").hide();
    }
  };

  // Validate Email

  $("#email-error").hide();
  let emailError = true;
  $("#email").keyup(() => {
    validateEmail();
  });

  const validateEmail = () => {
    let email = $("#email").val();
    let regex = /^([_\-\.0-9a-zA-Z]+)@([_\-\.0-9a-zA-Z]+)\.([a-zA-Z]){2,7}$/;
    if (email === "") {
      $("#email-error").show();
      emailError = false;
      return false;
    } else if (regex.test(email) === false) {
      $("#email-error").show();
      emailError = false;
      return false;
    } else {
      $("#email-error").hide();
    }
  };

  // Submit button
  $("#submit").on("click", (element) => {
    validateName();
    validateEmail();
    if (nameError === true && emailError === true) {
      return true;
    } else {
      return false;
    }
  });
});