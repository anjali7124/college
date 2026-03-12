const container = document.getElementById("newsContainer");

async function getNews(query="technology") {

    const url = `https://hn.algolia.com/api/v1/search?query=${query}`;

    container.innerHTML = "Loading news...";

    try {

        const res = await fetch(url);
        const data = await res.json();

        console.log("data:", data);

        showNews(data.hits);

    } catch(error){
        container.innerHTML = "Error loading news";
        console.log(error);
    }
}

function showNews(articles){

    container.innerHTML = "";

    articles.slice(0,10).forEach(article => {

        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <h3>${article.title || "No Title"}</h3>
            <p>Author: ${article.author}</p>
            <a href="${article.url}" target="_blank">Read More</a>
        `;

        container.appendChild(card);
    });
}

function searchNews(){

    const query = document.getElementById("searchInput").value;

    getNews(query);
}

// default news when page loads
window.onload = () => {
    getNews("technology");
};
