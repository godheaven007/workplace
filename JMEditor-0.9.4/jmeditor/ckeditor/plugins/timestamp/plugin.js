CKEDITOR.plugins.add( 'timestamp', {
    icons: 'timestamp',
    init: function( editor ) {
        editor.addCommand( 'insertTimestamp', {
            exec: function( editor ) {
                var now = new Date();
                editor.insertHtml( '<em style="color:red;">' + now.toString() + '</em>' );
            }
        });
        editor.ui.addButton( 'timestamp', {
            label: 'Insert Timestamp',
            command: 'insertTimestamp',
            toolbar: 'xsf, 0'
        });
    }
});
