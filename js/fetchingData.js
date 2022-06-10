const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "b8116117a4msh1dc03e971dc3dd5p15fae5jsn0782a0ea8bac",
    "X-RapidAPI-Host": "domaination.p.rapidapi.com",
  },
};
const domainData = [];
let btn = document.getElementById("search");

btn.addEventListener("click", async (event) => {
  let loading = document.getElementById("loading");
  loading.classList.remove("loading-hide");
  loading.classList.add("loading-show");
  let domainName = document.getElementById("domain-name").value;
  domainData.push(domainName.split(" ").join(""));
  if (domainName) {
    let data = await fetch(
      `https://api.datamuse.com//words?ml=${domainName}`,
      (error) => {
        console.log("there is an error in fetching data");
      }
    );

    var result = await data.json();

    console.log("fetching data");
    if (result.length > 0) {
      result.length = 10;
      for (i of result) {
        domainData.push(i.word.split(" ").join(""));
      }
    }
    var ul = document.getElementById("domain-name-list");
    var li = document.createElement("li");
    let select = document.getElementById("select");
    var value = select.options[select.selectedIndex].value;
    for (word of domainData) {
      let domainInfo = await fetch(
        `https://domaination.p.rapidapi.com/domains/${word}${value}`,
        options
      );
      const isavailable = await domainInfo.json();
      console.log(isavailable);

      loading.classList.remove("loading-show");
      loading.classList.add("loading-hide");
      li.setAttribute("class", "list-item");
      li.innerHTML = `${isavailable.domain.name}  ${
        isavailable.domain.isAvailable ? " is Available" : " is Not Available"
      }`;
      ul.appendChild(li);
    }
  }
});
