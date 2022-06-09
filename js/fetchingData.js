import whoiser from "whoiser";
const domainData = [];

let btn = document.getElementById("search");
btn.addEventListener("click", async (event) => {
  let loading = document.getElementById("loading");
  loading.classList.remove("loading-hide");
  loading.classList.add("loading-show");
  let domainName = document.getElementById("domain-name").value;
  if (domainName) {
    let data = await fetch(
      `https://api.datamuse.com//words?ml=${domainName}`,
      (error) => {
        console.log("there is an error in fetching data");
      }
    );

    const result = await data.json();
    console.log("fetching data");
    for (i of result) {
      let word = i.word.split(" ").join("");
      let domainInfo = await whoiser(`${word}.com`);
      console.log(domainInfo);
    }
  }
});
