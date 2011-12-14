Ti.include("lib/date.js");
Ti.include("lib/pulltorefresh.js");

var count = 0;
var rows = [];

var pullToRefresh = PullToRefresh.createPullToRefresh({
	backgroundColor:"#CCC",
	labelColor:"#000",
	action: function() {
		setTimeout(function() {
			refresh();
		}, 500)
	}
});

var win = Ti.UI.createWindow();

var tableView = Ti.UI.createTableView();
tableView.headerPullView = pullToRefresh;
tableView.addEventListener("scroll",function(e) {
	PullToRefresh._scroll(e);
});
tableView.addEventListener("scrollEnd",function(e) {
	PullToRefresh._begin(e, this);
});
win.add(tableView);

var refresh = function()
{
	count++;
	rows.push(Ti.UI.createTableViewRow({
		title:"Row " + count
	}));

	tableView.setData(rows);

	PullToRefresh._end(function() {
		tableView.setContentInsets({top:0},{animated:true});
	});
}

win.addEventListener("open", function() {
	refresh();
});

win.open();
