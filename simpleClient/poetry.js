const form = document.getElementById("form");
const submitBtn = document.getElementById("createButton");
const resultsHeader = document.getElementById("results");
const loader = document.getElementById("myLoader");

submitBtn.addEventListener("click", queryServerForPoem);

let poemWord = "";

async function queryServerForPoem(event) {
  loader.classList.add("loader");
  loader.classList.remove("loaderHidden");
  resultsHeader.innerHTML = "";

  poemWord = document.getElementById("fpoem").value;
  console.log(poemWord);
  console.log("please");

  let response = await fetch(
    "http://localhost:3000/q=getPoem&word=" + poemWord,
    {
      method: "GET",
    }
  );
  //   let response = await fetch(
  //     "http://localhost:3000/q=getLimerick&" + poemWord,
  //     { method: "GET" }
  //   );
  // { method: 'GET', headers: {'Content-type': 'application/json'}})
  // { method: 'GET', headers: {'Content-type': 'application/json'}})

  console.log(response.status); // 200
  console.log(response.statusText); // OK

  let data = await response.json();
  console.log("server response data:\n" + data);

  let mySet = new Set(data);

  var names = "";
  // data.forEach((element) => {
  //   resultsHeader.innerHTML += names += poemWord + " " + element + "\n";
  //   console.log(element);
  // });

  loader.classList.remove("loader");
  loader.classList.add("loaderHidden");

  mySet.forEach((element) => {
    resultsHeader.innerHTML = names += poemWord + " " + element + "<br>";
    console.log(element);
  });

  console.log(names);
  console.log(mySet);

  if ("speechSynthesis" in window) {
    let msg = new SpeechSynthesisUtterance();
    msg.text = names;
    window.speechSynthesis.speak(msg);
  } else {
    // Speech Synthesis Not Supported
    console.log("Sorry, your browser doesn't support text to speech!");
  }
}
