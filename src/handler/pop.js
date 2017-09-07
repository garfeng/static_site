import $ from 'jquery';


/*
<div class="alert alert-dismissible alert-info">
  <button type="button" class="close" data-dismiss="alert">&times;</button>
  <strong>Heads up!</strong> This <a href="#" class="alert-link">alert needs your attention</a>, but it's not super important.
</div>
 */
const callback = function() {
	this.remove();
}


// warning success danger info
export const Message = (text, type = "info") => {
	const node = $("<div>");
	node.addClass("alert alert-dismissible alert-" + type);
	node.html(text);
	$("#pop_message").prepend(node);
	node.fadeOut(3000, callback.bind(node));
}