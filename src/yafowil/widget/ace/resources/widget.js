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
                for (i = 0; i < classes.length; i++) {
                    class_ = classes[i];
                    base = 'ace-option-' + name;
                    if (class_.indexOf(base) == 0) {
                        return class_.substring(base.length + 1, class_.length);
                    }
                }
            },
            
            binder: function(context) {
                $('.ace-editor', context).each(function() {
                    var elem = $(this);
                    var parent = elem.parent();
                    var textarea = $('.ace-editor-value', parent);
                    elem.width(parent.width());
                    var theme = yafowil.ace.option(parent, 'theme');
                    var mode = yafowil.ace.option(parent, 'mode');
                    var editor = ace.edit($(this).attr('id'));
                    editor.setTheme('ace/theme/' + theme);
                    editor.getSession().setMode('ace/mode/' + mode);
                    var bind_change = function(editor, textarea) {
                        var e = editor;
                        var ta = textarea;
                        e.getSession().on('change', function(evt) {
                            ta.val(e.getValue());
                        });
                    }
                    bind_change(editor, textarea);
                });
            }
        }
    });

})(jQuery);