document.addEventListener("DOMContentLoaded", function () {
  init();
});

function init() {
  addEventListenerToStatusTodoClass();
}

function addEventListenerToStatusTodoClass() {
  var statusTodoClass = document.getElementsByClassName("status_todo"); //collection of html nodes
  //event always occcur at one node
  for (let i = 0; i < statusTodoClass.length; i++) {
    let item = statusTodoClass[i];
    item.addEventListener("change", (e) => {
      handleTodoStatusChange(e);
    });
  }
}

function handleTodoStatusChange(e) {
  console.log("done");
  // value --> done,not done
  //ajax call
  //response --> error --> alert
  //response --> value --> change
  const currEleme = e.target;
  var status_id = currEleme.value; //status_id
  var id = currEleme.closest("li").getAttribute("data-id");
  changeTodoStatus(id, status_id);
}

async function changeTodoStatus(id, status_id) {
  var url = `/todo/${id}/update_status/${status_id}`;
  try {
    let resp = await fetch(url, {
      method: "post",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    let data = await resp.json();
    console.log("success-added");
  } catch (error) {
    console.log("status_not_changed");
  }
}
