/* 
 * yafowil ace editor widget
 * 
 * Requires: tinymce
 * Optional: bdajax
 */

if (typeof(window['yafowil']) == "undefined") yafowil = {};

(function($) {

    $(document).ready(function() {
        // initial binding
        yafowil.ace.binder();
        
        // add after ajax binding if bdajax present
        if (typeof(window['bdajax']) != "undefined") {
            $.extend(bdajax.binders, {
                ace_binder: yafowil.ace.binder
            });
        }
    });
    
    $.extend(yafowil, {
        
        ace: {
            
            // tinymce options. extend or override as desired
            options: {
                theme: 'ace/theme/github',
                mode: 'ace/mode/python'
            },
            
            binder: function(context) {
                $('.ace_editor', context).each(function() {
                    var elem = $(this);
                    elem.width(elem.parent().width());
                    var options = yafowil.ace.options;
                    var editor = ace.edit($(this).attr('id'));
                    editor.setTheme(options.theme);
                    editor.getSession().setMode(options.mode);
                    editor.getSession().on('change', function(e) {
                        // e.type, etc
                        editor.getValue();
                    });
                });
            }
        }
    });

})(jQuery);