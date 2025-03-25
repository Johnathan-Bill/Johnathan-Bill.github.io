let parser = new DOMParser();
let nav_closed = true;
let curr_theme ="";
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

	// let s = document.cookie;

	// if(s==="")
	// {
	// 	document.cookie ="theme=light"
	// }
	// s = document.cookie;
	// console.log(getCookie("theme"))

	if(window.matchMedia)
		{
			// if(window.matchMedia('(prefers-color-scheme: dark)').matches || getCookie("theme") == "dark")
			if(window.matchMedia('(prefers-color-scheme: dark)').matches)
				{
					document.documentElement.setAttribute("data-theme", "dark")
					curr_theme = "dark";
					document.getElementById("dark-mode-img").src ="../images/dark-mod-inverse.png"
					// document.cookie ="theme=dark"
					

				}
				else
				{
					document.documentElement.setAttribute("data-theme", "light")
					document.getElementById("dark-mode-img").src ="..\\images\\dark-mode.png"

					curr_theme = "light";
					// document.cookie ="theme=light"


				}
		}

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
	document.body.classList.remove("no-scroll")

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
	if(nav_closed)
		{
		let menu = document.getElementById("nav-menu")
		menu.classList.remove("nav-rise")
		menu.classList.add("nav-fall")
		document.body.classList.add("no-scroll")
		nav_closed = !nav_closed

	}
	else
	{
		navClose()
	}
}
function navClose()
{
	let menu = document.getElementById("nav-menu")
	menu.classList.remove("nav-fall")
	document.body.classList.remove("no-scroll")

	menu.classList.add("nav-rise")
	nav_closed = !nav_closed

}
function dark_mode_toggle()
{

	switch (curr_theme)
	{
		case "dark":
			document.documentElement.setAttribute("data-theme" ,"light")
			document.getElementById("dark-mode-img").src ="..\\images\\dark-mode.png"
			// document.cookie ="theme=light"

			curr_theme ="light";
			break;
		case "light":			
			document.documentElement.setAttribute("data-theme" ,"dark")
			document.getElementById("dark-mode-img").src ="..\\images\\dark-mod-inverse.png"
			curr_theme ="dark";
			// document.cookie ="theme=dark"

			break;
		default:
			document.documentElement.setAttribute("data-theme" ,"light")
			document.getElementById("dark-mode-img").src ="..\\images\\dark-mod-inverse.png"
			// document.cookie ="theme=light"

			curr_theme ="light";
			break;
	}
	
}
// function getCookie(name)
// {

// 	let cookies = document.cookie;
	
// 	let regex = new RegExp(`(?:${name.toLowerCase()})[=](.[A-z]+)`)
// 	group = regex.exec(cookies)



// 	return group[1];
// }