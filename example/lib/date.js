var formatDate = function()
{
	var d = new Date;
	var month = d.getMonth() + 1;
	var datestr = d.getDate() + "/" + month + "/" + d.getFullYear();
	
	var minutes = d.getMinutes();
	if (minutes < 10) {
		minutes = "0" + minutes;
	}
	
	datestr += " " + d.getHours() + ":" + minutes;
	
	return datestr;
}