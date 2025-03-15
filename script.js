
function onStart(event)
{
	document.querySelectorAll("nav a").forEach((link) => {
	link.addEventListener("click", function(event)
	{
		event.preventDefault();
		loadpage(this.getAttribute("href"))
	});
  });
}

async function loadpage(page)
{
	console.log(page)
	let parser = new DOMParser();
	window.history.pushState({}, "", page.replace(".html",""));
	let route = routes[page] || routes[404];
	console.log(route);
	const html = await fetch(route).then((data) => data.text());
	document.getElementById("main-content").innerHTML = parser.parseFromString(html, "text/html").getElementById("main-content").innerHTML
}

const routes = {
  404: "index.html",
  "": "index.html",
  "/": "index.html",
  "/index": "index.html",
  "/home": "index.html",
  "/about": "index.html",
  "/projects.html": "projects.html",
  "/projects": "/projects.html",
};
document.addEventListener("DOMContentLoaded",onStart)

window.onpopstate = function (event) {
  loadpage(window.location.pathname.replace(".html",""));
};
loadpage(window.location.pathname.replace(".html", ""));