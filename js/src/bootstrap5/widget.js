import $ from 'jquery';
import { AceWidget } from '../default/widget.js';

export class BS5AceWidget extends AceWidget {

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
        const observer = new MutationObserver((mutationsList) => {
            for (let mutation of mutationsList) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'data-bs-theme') {
                    const new_theme = html.getAttribute('data-bs-theme');
                    this.update_theme(new_theme);
                }
            }
        });

        observer.observe(html, {
            attributes: true
        });
    }

    update_theme(theme) {
        const ace_theme = this.themes[theme] || this.themes['light'];
        this.editor.setTheme(`ace/theme/${ace_theme}`);
    }
}

//////////////////////////////////////////////////////////////////////////////
// yafowil.widget.array integration
//////////////////////////////////////////////////////////////////////////////

export function ace_on_array_add(inst, context) {
    BS5AceWidget.initialize(context);
}

export function register_array_subscribers() {
    if (window.yafowil_array === undefined) {
        return;
    }
    window.yafowil_array.on_array_event('on_add', ace_on_array_add);
}
