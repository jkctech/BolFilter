const cb = document.getElementById('switch');

// Communicate with background worker to enable / disable filter
cb.addEventListener('change', (event) => {
	if (event.currentTarget.checked) {
		chrome.runtime.sendMessage("bf_enable");
	} else {
		chrome.runtime.sendMessage("bf_disable");
	}
});

window.onload = function()
{
	// Preload settings
	chrome.storage.local.get('enabled', function (result) {
		cb.checked = result.enabled;
    });

	// Handle hrefs
	const links = document.getElementsByTagName("a");
	for(let i = 0; i < links.length; i++)
	{
		links[i].addEventListener("click", function(e){
			chrome.tabs.create({url: e.target.getAttribute('href')});
			return false;
		});
	}
};
