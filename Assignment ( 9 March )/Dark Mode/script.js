
let btn = document.querySelector("#toggle");

let theme = localStorage.getItem("theme");

if(theme === "dark"){
    document.body.classList.add("dark");
    btn.innerText = "light Mode";
}

btn.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){
        localStorage.setItem("theme","dark");
        btn.innerText = "Light Mode";
    }else{
        localStorage.setItem("theme","light");
        btn.innerText = "Dark Mode";
    }

});
