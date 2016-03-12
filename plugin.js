tinymce.PluginManager.add('bootstrapaccordion', function(editor, url) {
	// Add a button that opens a window
	editor.addButton('bootstrapaccordion', {
		text: 'Bootstrap Accordion',
		icon: false,
		onclick: function() {
			// Open window
			editor.windowManager.open({
				title: 'Example plugin',
				body: [
					{type: 'textbox', name: 'title', label: 'Title'}
				],
				onsubmit: function(e) {
					// Insert content when the window form is submitted
					editor.insertContent('Title: ' + e.data.title);
				}
			});
		}
	});

	// Adds a menu item to the tools menu
	editor.addMenuItem('bootstrapaccordion', {
		text: 'Bootstrap Accordion',
		context: 'insert',
		onclick: function() {
			// Open window with a specific url
			editor.windowManager.open({
				title: 'Accordion',
				url: url + '/dialog.html',
				width: 600,
				height: 400,
				buttons: [
					{
						text: 'Insert',
						onclick: function() {
							// Top most window object
							var win = editor.windowManager.getWindows()[0];

							// Insert the contents of the dialog.html textarea into the editor
							editor.insertContent(win.getContentWindow().tinyMCE.activeEditor.getContent({format : 'raw'}));

							// Close the window
							win.close();
						}
					},

					{text: 'Close', onclick: 'close'}
				]
			});
		}
	});
});
