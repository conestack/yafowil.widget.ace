var yafowil_ace = (function (exports, $) {
    'use strict';

    class AceWidget {
        static initialize(context) {
            $('.ace-editor-wrapper', context).each(function() {
                let elem = $(this);
                if (window.yafowil_array !== undefined &&
                    window.yafowil_array.inside_template(elem)) {
                    return;
                }
                new AceWidget(elem, elem.data('yafowil-ace'));
            });
        }
        constructor(elem, opts) {
            elem.data('yafowil-ace', this);
            this.elem = elem;
            this.opts = opts;
            this.ed_elem = $('.ace-editor', elem);
            this.textarea = $('.ace-editor-value', elem);
            if (opts.basepath) {
                ace.config.set('basePath', opts.basepath);
            }
            let ed = this.editor = ace.edit(this.ed_elem.attr('id'));
            this.set_theme(opts);
            let sess = ed.getSession();
            sess.setMode(`ace/mode/${opts.mode}`);
            sess.on('change', this.change_handle.bind(this));
        }
        set_theme(opts) {
            this.editor.setTheme(`ace/theme/${opts.theme}`);
        }
        change_handle(evt) {
            this.textarea.val(this.editor.getValue());
        }
    }

    class BS5AceWidget extends AceWidget {
        static initialize(context) {
            $('.ace-editor-wrapper', context).each(function() {
                let elem = $(this);
                if (window.yafowil_array !== undefined &&
                    window.yafowil_array.inside_template(elem)) {
                    return;
                }
                new BS5AceWidget(elem, elem.data('yafowil-ace'));
            });
        }
        constructor(elem, opts) {
            super(elem, opts);
            this.update_theme = this.update_theme.bind(this);
            if (window.ts !== undefined) {
                window.ts.ajax.attach(this, elem);
            }
            if (opts.dark_theme) {
                this.observe_theme_change();
            }
        }
        set_theme(opts) {
            this.themes = {
                'light': opts.theme,
                'dark': opts.dark_theme
            };
            this.update_theme(document.documentElement.getAttribute('data-bs-theme'));
        }
        observe_theme_change() {
            const html = document.documentElement;
            this.observer = new MutationObserver((mutationsList) => {
                for (let mutation of mutationsList) {
                    if (
                        mutation.type === 'attributes'
                        && mutation.attributeName === 'data-bs-theme'
                    ) {
                        const new_theme = html.getAttribute('data-bs-theme');
                        this.update_theme(new_theme);
                    }
                }
            });
            this.observer.observe(html, { attributes: true });
        }
        update_theme(theme) {
            const ace_theme = this.themes[theme] || this.themes['light'];
            this.editor.setTheme(`ace/theme/${ace_theme}`);
        }
        destroy() {
            this.observer.disconnect();
        }
    }
    function ace_on_array_add(inst, context) {
        BS5AceWidget.initialize(context);
    }
    function register_array_subscribers() {
        if (window.yafowil_array === undefined) {
            return;
        }
        window.yafowil_array.on_array_event('on_add', ace_on_array_add);
    }

    $(function() {
        if (window.ts !== undefined) {
            ts.ajax.register(BS5AceWidget.initialize, true);
        } else if (window.bdajax !== undefined) {
            bdajax.register(BS5AceWidget.initialize, true);
        } else {
            BS5AceWidget.initialize();
        }
        register_array_subscribers();
    });

    exports.BS5AceWidget = BS5AceWidget;
    exports.ace_on_array_add = ace_on_array_add;
    exports.register_array_subscribers = register_array_subscribers;

    Object.defineProperty(exports, '__esModule', { value: true });


    window.yafowil = window.yafowil || {};
    window.yafowil.ace = exports;


    return exports;

})({}, jQuery);
