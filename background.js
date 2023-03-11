var ruleID = 1;

function disable()
{
	chrome.declarativeNetRequest.updateDynamicRules({
		removeRuleIds: [ruleID]
	});
}

function enable()
{
	chrome.declarativeNetRequest.updateDynamicRules({
		addRules:[
			{
				"id" : ruleID,
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
					"resourceTypes" : ["main_frame", "script", "xmlhttprequest", "other"]
				}
			}
		],
		removeRuleIds: [ruleID]
	});
}

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse)
	{
		if (request.greeting === "bf_enable")
		{
			enable();
			sendResponse({farewell: "enabled"});
			console.log("Enabled");
		}
		else if (request.greeting === "bf_disable")
		{
			disable();
			sendResponse({farewell: "disabled"});
			console.log("Disabled");
		}
		else
		{
			console.log(request.greeting);
		}
	}
);

enable();
