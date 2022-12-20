import {AceWidget} from '../src/widget.js';
import {register_array_subscribers} from '../src/widget.js';

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
        // window.yafowil_array is not defined
        register_array_subscribers();
        widget = wrapper.data('yafowil-ace');
        // widget data is widget opts before initialize
        assert.false(widget instanceof AceWidget);
        assert.deepEqual(
            widget,
            {
                "basepath": "./base/path",
                "mode": "python",
                "theme": "github"
            }
        );
    });

    QUnit.test('ace_on_array_add', assert => {
        // patch yafowil_array
        window.yafowil_array = {
            on_array_event: function(evt_name, evt_function) {
                _array_subscribers[evt_name] = evt_function;
            }
        };
        register_array_subscribers();

        let table = $('<table />')
            .append($('<tr />'))
            .append($('<td />'))
            .appendTo('body');

        // invoke array on_add
        _array_subscribers['on_add'].apply(null, $('tr', table));

        widget = wrapper.data('yafowil-ace');
        assert.true(widget instanceof AceWidget);
    });
});
