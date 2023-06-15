
ajax({
	type: 'post',
	dataType: 'json',
	data: {},
	url: '',
	success: function(res) {

	},
	fail: function(error) {

	}
})

function ajax(options) {
	options = options || {};
	options.type = (options.type || 'GET').toUpperCase();
	options.dataType = options.dataType || 'json';

	const params = options.data;
	const xhr = new XMLHttpRequest();

	if (options.type === 'GET') {
		xhr.open('GET', options.url + '?' + params, true);
		xhr.send(null);
	}
	if (options.type === 'POST') {
		xhr.open('POST', options.url, true);
		xhr.send(params);
	}
	
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			let status = xhr.status;
			if (status >= 200 && status < 300) {
				options.success && options.success(xhr.responseText, xhr.responseXML);
			} else {
				options.fail && options.fail(status);
			}
		}
	}
}