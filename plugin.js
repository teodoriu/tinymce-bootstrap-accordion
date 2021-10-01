tinymce.PluginManager.add('bootstrapaccordion', function (editor, url) {
  editor.ui.registry.addButton('bootstrapaccordion', {
    text: 'Accordion',
    onAction: function () {
      accordionDialog();
    },
    stateSelector: 'div.bootstrap-accordion *'
  });
  
  function accordionDialog () {
    var current, iframe;
    
    const instanceApi = editor.windowManager.openUrl({
      title: 'Accordion',
      url: url + '/dialog.html',
      width: 600,
      height: 400,
      onAction: function (dialogApi, details) {
        
        var timestamp = new Date().getTime();
        
        var accordionTitle = iframe.first().contents().find('#accordion-title').val();
        var accordionContent = iframe[0].contentWindow.tinymce.editors['accordion-content'].getContent();
        var accordionIn = iframe.first().contents().find('#accordion-open').val() == 'Yes' ? ' in' : '';
        
        var accordion =
          '<div class="panel panel-default bootstrap-accordion">' +
          '<div class="panel-heading" role="tab" id="heading-' + timestamp + '">' +
          '<h4 class="panel-title">' +
          '<a role="button" class="bootstrap-accordion-title" data-toggle="collapse" data-parent="#accordion" href="#collapse-' + timestamp + '">' +
          accordionTitle +
          '</a>' +
          '</h4>' +
          '</div>' +
          '<div id="collapse-' + timestamp + '" class="panel-collapse collapse' + accordionIn + '" role="tabpanel">' +
          '<div class="panel-body bootstrap-accordion-content">' +
          accordionContent +
          '</div>' +
          '</div>' +
          '</div>';
        
        if (current.length > 0) {
          current.html(accordion);
        } else {
          tinymce.activeEditor.execCommand('mceInsertContent', false, accordion);
        }
        
        dialogApi.close();
      },
      buttons: [
        {
          type: 'custom',
          text: 'Insert',
        },
        
        {
          type: 'cancel',
          text: 'Close',
        }
      ]
    });
    
    iframe = $('.tox-tinymce-aux').find('iframe');
    current = $(tinyMCE.activeEditor.selection.getNode()).closest('.bootstrap-accordion');
    
    iframe[0].contentWindow.document.body.onload = function () {
      if (current.length > 0) {
        iframe.first().contents().find('#accordion-title').val(current.find('.bootstrap-accordion-title').html());
        iframe.first().contents().find('#accordion-content').val(current.find('.bootstrap-accordion-content').html());
        iframe.first().contents().find('#accordion-open').val(current.find('.panel-collapse.collapse.in').length > 0 ? 'Yes' : 'No');
      }
    };
  }
  
});
