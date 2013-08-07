
var pullToRefresh = require("lib/pulltorefresh.js"),
	count = 0,
	rows = [],
	win = Ti.UI.createWindow(),
	tableView = Ti.UI.createTableView();


//pull to refresh
var refreshView = pullToRefresh.createPullToRefresh({
	backgroundColor: '#CCC',
	labelColor: '#000',
	action: function() {
		setTimeout(function() {
			refresh();
		}, 500)
	}
});
tableView.headerPullView = refreshView;

tableView.addEventListener('scroll', function(e) {
	pullToRefresh._scroll(e);
});
tableView.addEventListener('dragend', function(e) {
	pullToRefresh._begin(e, this);
});

win.add(tableView);

var refresh = function() {
	count++;
	rows.push(Ti.UI.createTableViewRow({
		title:"Row " + count
	}));

	tableView.setData(rows);

	pullToRefresh._end(function() {
		tableView.setContentInsets({top:0},{animated:true});
	});
}

win.addEventListener("open", function() {
	refresh();
});

win.open();
