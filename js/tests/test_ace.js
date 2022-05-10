import {AceWidget} from '../src/widget.js';

QUnit.test('test', assert => {
    let wrapper_elem = $('<div class="ace-editor-wrapper ace-option-theme-github ace-option-mode-python" />');
    let textarea = $('<textarea class="ace-editor-value" />').appendTo(wrapper_elem);
    let elem = $('<div class="ace-editor" />').appendTo(wrapper_elem);
    wrapper_elem.appendTo($('body'));

    AceWidget.initialize();
    let widget = elem.data('ace_widget');

    assert.ok(widget.textarea.is('textarea.ace-editor-value'));
    assert.strictEqual(widget.ace_option('theme'), 'github');
    assert.strictEqual(widget.ace_option('mode'), 'python');
});
