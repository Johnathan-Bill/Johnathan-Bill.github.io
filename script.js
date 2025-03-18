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

	document.querySelectorAll("nav a, .nav-menu a").forEach((link) =>
	{

		link.addEventListener("click", function(event)
	{
		event.preventDefault();
		let path = this.getAttribute("href").replace(".html","");
		if (path === "index" || path === "/") path = "";

		if (path === window.location.pathname.replace(".html", "").replace("/", "")) return;
		
		let menu = document.getElementById("nav-menu")
		let main = document.getElementById("main-content");
		console.log(path); 
		

		if(menu.classList.contains("nav-fall"))
		{
			menu.classList.remove("nav-fall")

			menu.classList.add("nav-rise")
		}

		main.classList.add("fade-out");
		
		main.addEventListener('animationend', function fadeOutEnd(event)
		{
				main.removeEventListener("animationend", fadeOutEnd);

				window.history.pushState({}, "", `/${path}`);
                loadContent(path);

				main.classList.remove("fade-out");
        		main.classList.add("fade-in");;
				main.addEventListener('animationend', function fadeInEnd(event)
				{
					main.classList.remove("fade-in");
				});


			});
		console.log(routes[path].file)
		if(routes[path].file === "index.html")
			{
				document.title = "Home"
			}
		else	
			document.title = String(path).charAt(0).toUpperCase() + String(path).slice(1);
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


function navClick()
{
	
	let menu = document.getElementById("nav-menu")
	menu.classList.remove("nav-rise")
	menu.classList.add("nav-fall")
}
function navClose()
{
	let menu = document.getElementById("nav-menu")
	menu.classList.remove("nav-fall")

	menu.classList.add("nav-rise")
}