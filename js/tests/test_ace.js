import {AceWidget} from '../src/widget.js';
import {register_array_subscribers} from '../src/widget.js';
import $ from 'jquery';
import * as ace from 'ace'; // Necessary for global access in tests; do not remove.

QUnit.module('AceWidget', hooks => {
    let wrapper,
        textarea,
        ed_elem,
        widget,
        _array_subscribers = {
            on_add: []
        };

    hooks.beforeEach(() => {
        // generate DOM elements
        let data = {
            'basepath': './base/path',
            'theme': 'github',
            'mode': 'python'
        }
        wrapper = $('<div class="ace-editor-wrapper" />')
            .data('yafowil-ace', data)
            .appendTo($('body'));
        textarea = $('<textarea class="ace-editor-value" />')
            .appendTo(wrapper);
        ed_elem = $('<div class="ace-editor" />')
            .appendTo(wrapper);
    });
    hooks.afterEach(() => {
        // cleanup
        widget = null;
        wrapper.remove();
        window.yafowil_array = undefined;
    });

    QUnit.test('initialize', assert => {
        AceWidget.initialize();
        widget = wrapper.data('yafowil-ace');
        assert.true(widget instanceof AceWidget);
        assert.true(widget.ed_elem.is(ed_elem));
        assert.true(widget.textarea.is(textarea));
        assert.strictEqual(widget.opts['basepath'], './base/path');
        assert.strictEqual(widget.opts['theme'], 'github');
        assert.strictEqual(widget.opts['mode'], 'python');
    });

    QUnit.test('initialize without basepath', assert => {
        // no base path defined
        let data = wrapper.data('yafowil-ace');
        delete data['basepath'];
        AceWidget.initialize();
        widget = wrapper.data('yafowil-ace');
        assert.notOk(widget.opts['basepath']);
    });

    QUnit.test('change_handle', assert => {
        AceWidget.initialize();
        widget = wrapper.data('yafowil-ace');
        assert.strictEqual(widget.textarea.val(), '');
        widget.editor.setValue('example value');
        assert.strictEqual(widget.textarea.val(), 'example value');
    })

    QUnit.test('register_array_subscribers', assert => {
        // return if window.yafowil === undefined
        register_array_subscribers();
        widget = wrapper.data('yafowil-ace');

        /* The widget will be equal to the initial opts
           when initialize returns.
        */
        let opts = {
            "basepath": "./base/path",
            "mode": "python",
            "theme": "github"
        }
        assert.false(widget instanceof AceWidget);
        assert.deepEqual(widget, opts);
        widget = null;

        // // patch yafowil_array
        window.yafowil_array = {
            on_array_event: function(evt_name, evt_function) {
                _array_subscribers[evt_name] = evt_function;
            },
            inside_template(elem) {
                return elem.parents('.arraytemplate').length > 0;
            }
        };
        register_array_subscribers();
        // create table DOM
        let table = $('<table />')
            .append($('<tr id="row" />'))
            .append($('<td />'))
            .appendTo('body');

        $('td', table).addClass('arraytemplate');
        wrapper.detach().appendTo($('td', table));

        // invoke array on_add - returns
        let context = $('#row');
        _array_subscribers['on_add'].apply(null, context);
        widget = wrapper.data('yafowil-ace');
        assert.deepEqual(widget, opts);
        $('td', table).removeClass('arraytemplate');

        // invoke array on_add
        wrapper.attr('id', '');
        _array_subscribers['on_add'].apply(null, context);
        widget = wrapper.data('yafowil-ace');
        assert.ok(widget);

        table.remove();
    });
});
