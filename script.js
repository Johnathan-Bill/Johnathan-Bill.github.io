let parser = new DOMParser();

const routes = {
  "": {
    content: "",
    file: "index.html",
  },
  "/": {
    content: "",
    file: "index.html",
  },
  "index": {
    content: "",
    file: "index.html",
  },
  "projects": {
    content: "",
    file: "projects.html",
  },
};

async function loadRoutes() {

	for (const [path,{content,file}] of Object.entries(routes))
	{
			routes[path].content = parser.parseFromString
			(await fetch(file).then((data) => data.text()),"text/html")
			.getElementById("main-content").innerHTML;
	}
}

function onStart()
{
	const query = window.matchMedia(
  		'(prefers-reduced-motion: reduce)');
	if(query.matches)
	{
		return;
	}

	document.querySelectorAll("nav a").forEach((link) =>
	{

		link.addEventListener("click", function(event)
	{
		event.preventDefault();
		let path = this.getAttribute("href").replace(".html","");
		if (path === "index" || path === "/") path = "";

		console.log(path);
		if (path === window.location.pathname.replace(".html", "").replace("/", "")) return;

		
      	window.history.pushState({}, "", `/${path}`);
		loadContent(path);
		

	})
	});
}

function loadContent(path)
{
	document.getElementById("main-content").innerHTML = routes[path].content;

}

loadRoutes();
document.addEventListener("DOMContentLoaded",onStart)
window.onpopstate = function (event)
{
	loadContent(window.location.pathname.replace( ".html","").replace('/',""))
}
