//分页函数
page_parent_div_name,sum,length,url,div_name,page_shownumber
(function($){
	function PAGE(page_shownumber,options){
		page_shownumber=page_shownumber?page_shownumber:5;
		this.opts = $.extend({}, PAGE.DEFAULTS, options);
	}
})(jQuery)