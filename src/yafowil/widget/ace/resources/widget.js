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
            
            option: function(elem, name) {
                var classes = elem.attr('class').split(' ');
                var class_, i, base;
                for (i = 0, i < classes.length; i++) {
                    class_ = classes[i];
                    base = 'ace-option-' + name;
                    if (class_.indexOf(base) == 0) {
                        alert(class_.substring(base.length, class_length));
                        return class_.substring(base.length, class_length);
                    }
                }
            },
            
            binder: function(context) {
                $('.ace_editor', context).each(function() {
                    var elem = $(this);
                    var parent = elem.parent();
                    elem.width(parent().width());
                    var theme = yafowil.widget.ace.option(elem, 'theme');
                    var mode = yafowil.widget.ace.option(elem, 'mode');
                    alert(theme);
                    alert(mode);
                    var editor = ace.edit($(this).attr('id'));
                    editor.setTheme('ace/theme/' + theme);
                    editor.getSession().setMode('ace/mode/' + mode);
                    editor.getSession().on('change', function(e) {
                        // e.type, etc
                        editor.getValue();
                    });
                });
            }
        }
    });

})(jQuery);