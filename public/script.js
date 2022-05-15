var socket = io();

$("#container").hide();

$("#login").click(() => {
  //   console.log("clicked....");
  const username = $("#user").val();
  if (!username) alert("Please have some username");
  else {
    $("#login_section").hide();
    $("#container").show();

    socket.emit("username", username);
  }
});

$("#send").click(() => {
  // console.log("send button clicked...");
  const chat = $("#chat").val();
  if (chat) {
    // console.log(chat);
    $("#chat").val("");
    socket.emit("send_msg", chat);
  }
});

socket.on("receive_msg", (data) => {
  // console.log(data);
  const li = document.createElement("li");
  li.innerText = `${data.username} : ${data.msg}`;
  // li.setAttribute("class", "list-group-item p-3 rounded-pill mb-3 shadow-sm");
  $(".chat_list").append(
    $("<li>")
      .html(`<b>${data.username}</b> <br>`)
      .append(`${data.msg}`)
      .addClass("text_msg rounded-3 m-2 ms-3 px-3 py-2")
  );
  // $(".chat_list").lastChild.scrollIntoView();
  $(".chat_list").scrollTop($(".chat_list").outerHeight());
});
