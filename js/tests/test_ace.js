import {AceWidget} from '../src/widget.js';

QUnit.test('test', assert => {
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

    AceWidget.initialize();
    let widget = wrapper.data('yafowil-ace');
    assert.ok(widget instanceof AceWidget);
    assert.ok(widget.ed_elem.is(ed_elem));
    assert.ok(widget.textarea.is(textarea));
    assert.deepEqual(widget.opts, {
        'basepath': '',
        'theme': 'github',
        'mode': 'python'
    });
});
