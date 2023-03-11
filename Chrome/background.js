// Disable filter
function disable()
{
	// Disable filter
	chrome.declarativeNetRequest.updateDynamicRules({
		removeRuleIds: [1]
	});

	// Store to settings
	chrome.storage.local.set({ enabled: false });
}

// Enable filter
function enable()
{
	// Enable filter
	// Adds "sellerid=0" to requests to filter out resellers
	chrome.declarativeNetRequest.updateDynamicRules({
		addRules:[
			{
				"id" : 1,
				"priority": 1,
				"action" : {
					"type" : "redirect",
					"redirect": {
						"transform": {
							"queryTransform": {
								"addOrReplaceParams": [{ "key": "sellerId", "value": "0" }]
							}
						}
					}
				},
				"condition" : {
					"urlFilter" : "searchtext=",
					"domains" : ["bol.com", "*.bol.com"],
					"resourceTypes" : ["main_frame", "sub_frame", "script", "xmlhttprequest", "object", "websocket", "other"]
				}
			}
		],
		removeRuleIds: [1]
	});

	// Store to settings
	chrome.storage.local.set({ enabled: true });
}

// Handle messages from the front
chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse)
	{
		if (request === "bf_enable")
			enable();
		else if (request === "bf_disable")
			disable();
	}
);

// Enable on load
enable();
