(function (exports, $, ace) {
    'use strict';

    class AceWidget {
        static initialize(context) {
            $('.ace-editor', context).each(function() {
                new AceWidget($(this));
            });
        }
        constructor(elem) {
            this.elem = elem;
            let cnt = this.container = elem.parent();
            this.textarea = $('.ace-editor-value', cnt);
            elem.width(cnt.width());
            let ed = this.editor = ace.edit(elem.attr('id'));
            ed.setTheme(`ace/theme/${this.ace_option('theme')}`);
            let sess = ed.getSession();
            sess.setMode(`ace/mode/${this.ace_option('mode')}`);
            sess.on('change', this.change_handle.bind(this));
        }
        ace_option(name) {
            let classes = this.container.attr('class').split(' '),
                class_, i, base;
            for (i = 0; i < classes.length; i++) {
                class_ = classes[i];
                base = 'ace-option-' + name;
                if (class_.indexOf(base) == 0) {
                    return class_.substring(base.length + 1, class_.length);
                }
            }
        }
        change_handle(evt) {
            this.textarea.val(this.editor.getValue());
        }
    }

    $(function() {
        if (window.ts !== undefined) {
            ts.ajax.register(AceWidget.initialize, true);
        } else {
            AceWidget.initialize();
        }
    });

    exports.AceWidget = AceWidget;

    Object.defineProperty(exports, '__esModule', { value: true });


    if (window.yafowil === undefined) {
        window.yafowil = {};
    }
    window.yafowil.ace = exports;


    return exports;

})({}, jQuery, ace);
//# sourceMappingURL=widget.js.map
