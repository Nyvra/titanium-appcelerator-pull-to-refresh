var PullToRefresh = {
	_loadingCallback: null,
	_pulling: false,
	_reloading: false,
	_view: null,
	_arrow: null,
	_status: null,
	_lastUpdate: null,
	_activityIndicator: null,
	
	createPullToRefresh: function(parameters) 
	{
		PullToRefresh._loadingCallback = parameters.action;
		
		PullToRefresh._view = Ti.UI.createView({
			backgroundColor:parameters.backgroundColor,
			width:320,
			height:60
		});
		
		PullToRefresh._arrow = Ti.UI.createView({
			backgroundImage:"/lib/arrow.png",
			width:30,
			height:30,
			bottom:20,
			left:20
		});
		PullToRefresh._view.add(PullToRefresh._arrow);

		PullToRefresh._status = Ti.UI.createLabel({
			text:"Puxe para recarregar...",
			left:55,
			width:220,
			bottom:35,
			height:"auto",
			color:parameters.labelColor,
			textAlign:"center",
			font:{fontSize:13,fontWeight:"bold"}
		});
		PullToRefresh._view.add(PullToRefresh._status);

		PullToRefresh._lastUpdate = Ti.UI.createLabel({
			text:"Última atualização: " + formatDate(),
			left:55,
			width:220,
			bottom:15,
			height:15,
			height:"auto",
			color:parameters.labelColor,
			textAlign:"center",
			font:{fontSize:12}
		});
		PullToRefresh._view.add(PullToRefresh._lastUpdate);
		
		PullToRefresh._activityIndicator = Titanium.UI.createActivityIndicator({
			left:20,
			bottom:13,
			width:30,
			height:30,
			style:Titanium.UI.iPhone.ActivityIndicatorStyle.DARK
		});
		PullToRefresh._view.add(PullToRefresh._activityIndicator);
		
		return PullToRefresh._view;
		
	},

	_scroll: function(e)
	{
		var offset = e.contentOffset.y;
		if (offset <= -65.0 && !PullToRefresh._pulling)
		{
			var t = Ti.UI.create2DMatrix();
			t = t.rotate(-180);
			PullToRefresh._pulling = true;
			PullToRefresh._arrow.animate({transform:t, duration:180});
			PullToRefresh._status.text = "Solte para recarregar...";
		}
		else if (PullToRefresh._pulling && offset > -65.0 && offset < 0)
		{
			PullToRefresh._pulling = false;
			var t = Ti.UI.create2DMatrix();
			PullToRefresh._arrow.animate({transform:t,duration:180});
			PullToRefresh._status.text = "Puxe para recarregar...";
		}
	},

	_begin: function(e, tableView)
	{
		if (PullToRefresh._pulling && !PullToRefresh._reloading && e.contentOffset.y <= -65.0)
		{
			PullToRefresh._reloading = true;
			PullToRefresh._pulling = false;
			PullToRefresh._arrow.hide();
			PullToRefresh._activityIndicator.show();
			PullToRefresh._status.text = "Carregando...";
			tableView.setContentInsets({top:60},{animated:true});
			PullToRefresh._arrow.transform = Ti.UI.create2DMatrix();
			PullToRefresh._loadingCallback();
		}
	},
	
	_end: function(callback)
	{
		callback();
		PullToRefresh._reloading = false;
		PullToRefresh._lastUpdate.text = "Última atualização: " + formatDate();
		PullToRefresh._status.text = "Puxe para recarregar...";
		PullToRefresh._activityIndicator.hide();
		PullToRefresh._arrow.show();
	}
}

exports = exports || {};

exports.PullToRefresh = PullToRefresh;
