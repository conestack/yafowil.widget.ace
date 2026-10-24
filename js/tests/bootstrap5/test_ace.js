import 'ace'; // Necessary for global access in tests; do not remove.
import $ from 'jquery';
import { BS5AceWidget, register_array_subscribers } from '../../src/bootstrap5/widget.js';

QUnit.module('BS5AceWidget', (hooks) => {
    let wrapper,
        textarea,
        ed_elem,
        widget,
        _array_subscribers = {
            on_add: [],
        };

    hooks.beforeEach(() => {
        // generate DOM elements
        const data = {
            basepath: './base/path',
            theme: 'github',
            mode: 'python',
        };
        wrapper = $('<div class="ace-editor-wrapper" />')
            .data('yafowil-ace', data)
            .appendTo($('body'));
        textarea = $('<textarea class="ace-editor-value" />').appendTo(wrapper);
        ed_elem = $('<div class="ace-editor" />').appendTo(wrapper);
    });
    hooks.afterEach(() => {
        // cleanup
        widget = null;
        wrapper.remove();
        window.yafowil_array = undefined;
        delete window.ts;
        document.documentElement.removeAttribute('data-bs-theme');
    });

    QUnit.test('bootstrap theme change', (assert) => {
        assert.ok(true);
        const html = document.documentElement;
        const darkmode_data = {
            basepath: './base/path',
            theme: 'github',
            mode: 'python',
            dark_theme: 'dracula',
        };
        wrapper.data('yafowil-ace', darkmode_data);
        BS5AceWidget.initialize();
        widget = wrapper.data('yafowil-ace');
        assert.true(widget instanceof BS5AceWidget);
        assert.true(widget.ed_elem.is(ed_elem));
        assert.true(widget.textarea.is(textarea));

        assert.strictEqual(html.getAttribute('data-bs-theme'), null);
        assert.strictEqual(widget.editor.getTheme(), 'ace/theme/github');

        const done1 = assert.async();
        html.setAttribute('data-bs-theme', 'dark');
        setTimeout(() => {
            assert.strictEqual(widget.editor.getTheme(), 'ace/theme/dracula');
            done1();
        });
        const done2 = assert.async();
        setTimeout(() => {
            widget.destroy();
            assert.strictEqual(widget.editor, null);
            done2();
        });
    });

    QUnit.test('attach to ts.ajax and destroy without theme observer', (assert) => {
        const attached = [];
        window.ts = {
            ajax: {
                attach: (inst, elem) => {
                    attached.push([inst, elem]);
                },
            },
        };
        BS5AceWidget.initialize();
        widget = wrapper.data('yafowil-ace');
        assert.strictEqual(attached.length, 1);
        assert.strictEqual(attached[0][0], widget);
        assert.true(attached[0][1].is(wrapper));
        assert.strictEqual(widget.observer, undefined);
        assert.strictEqual(widget.editor.getTheme(), 'ace/theme/github');

        widget.destroy();
        assert.strictEqual(widget.editor, null);
        assert.strictEqual(widget.ed_elem, null);
    });

    QUnit.test('register_array_subscribers', (assert) => {
        // return if window.yafowil === undefined
        register_array_subscribers();
        widget = wrapper.data('yafowil-ace');

        /* The widget will be equal to the initial opts
           when initialize returns.
        */
        const opts = {
            basepath: './base/path',
            mode: 'python',
            theme: 'github',
        };
        assert.false(widget instanceof BS5AceWidget);
        assert.deepEqual(widget, opts);
        widget = null;

        // // patch yafowil_array
        window.yafowil_array = {
            on_array_event: (evt_name, evt_function) => {
                _array_subscribers[evt_name] = evt_function;
            },
            inside_template(elem) {
                return elem.parents('.arraytemplate').length > 0;
            },
        };
        register_array_subscribers();
        // create table DOM
        const table = $('<table />')
            .append($('<tr id="row" />'))
            .append($('<td />'))
            .appendTo('body');

        $('td', table).addClass('arraytemplate');
        wrapper.detach().appendTo($('td', table));

        // invoke array on_add - returns
        const context = $('#row');
        _array_subscribers.on_add.apply(null, context);
        widget = wrapper.data('yafowil-ace');
        assert.deepEqual(widget, opts);
        $('td', table).removeClass('arraytemplate');

        // invoke array on_add
        wrapper.attr('id', '');
        _array_subscribers.on_add.apply(null, context);
        widget = wrapper.data('yafowil-ace');
        assert.ok(widget);

        table.remove();
    });
});
