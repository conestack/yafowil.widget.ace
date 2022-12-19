import {AceWidget} from '../src/widget.js';

let _array_subscribers = {
    on_add: []
}

window.yafowil_array = {
    on_array_event: function(evt_name, evt_function) {
        _array_subscribers[evt_name] = evt_function;
    }
};

QUnit.test('widget', assert => {
    let wrapper = $('<div />')
        .addClass('ace-editor-wrapper')
        .data('yafowil-ace', {
            'basepath': './base/path',
            'theme': 'github',
            'mode': 'python'
        })
        .appendTo($('body'));
    let textarea = $('<textarea />')
        .addClass('ace-editor-value')
        .appendTo(wrapper);
    let ed_elem = $('<div />')
        .addClass('ace-editor')
        .appendTo(wrapper);

    AceWidget.initialize();
    let widget = wrapper.data('yafowil-ace');
    assert.ok(widget instanceof AceWidget);
    assert.ok(widget.ed_elem.is(ed_elem));
    assert.ok(widget.textarea.is(textarea));
    assert.deepEqual(widget.opts, {
        'basepath': './base/path',
        'theme': 'github',
        'mode': 'python'
    });

    assert.strictEqual(widget.textarea.val(), '');
    widget.editor.setValue('example value');
    assert.strictEqual(widget.textarea.val(), 'example value');
    wrapper.remove();
});

QUnit.test('ace_on_array_add', assert => {
    let wrapper = $('<div />')
        .addClass('ace-editor-wrapper')
        .data('yafowil-ace', {
            'basepath': '',
            'theme': 'github',
            'mode': 'python'
        })
        .appendTo($('body'));
    let textarea = $('<textarea />')
        .addClass('ace-editor-value')
        .appendTo(wrapper);
    let ed_elem = $('<div />')
        .addClass('ace-editor')
        .appendTo(wrapper);

    // invoke array on_add
    _array_subscribers['on_add'].apply(null, $('body'));

    let widget = wrapper.data('yafowil-ace');
    assert.ok(widget);
    assert.ok(widget instanceof AceWidget);
    assert.ok(widget.ed_elem.is(ed_elem));
    assert.ok(widget.textarea.is(textarea));
    assert.deepEqual(widget.opts, {
        'basepath': '',
        'theme': 'github',
        'mode': 'python'
    });
    wrapper.remove();

    window.yafowil_array = undefined;
});
