import $ from 'jquery';

export class AceWidget {

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
        let ed = this.editor = ace.edit(this.ed_elem.attr('id'), {
            readOnly: opts.read_only
        });
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

//////////////////////////////////////////////////////////////////////////////
// yafowil.widget.array integration
//////////////////////////////////////////////////////////////////////////////

export function ace_on_array_add(inst, context) {
    AceWidget.initialize(context);
}

export function register_array_subscribers() {
    if (window.yafowil_array === undefined) {
        return;
    }
    window.yafowil_array.on_array_event('on_add', ace_on_array_add);
}
