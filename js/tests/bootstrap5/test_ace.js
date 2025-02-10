import {BS5AceWidget} from '../../src/bootstrap5/widget.js';
import {register_array_subscribers} from '../../src/default/widget.js';
import $ from 'jquery';
import * as ace from 'ace'; // Necessary for global access in tests; do not remove.

QUnit.module('BS5AceWidget', hooks => {
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

    QUnit.test('bootstrap theme change', assert => {
        const html = document.documentElement;
        let darkmode_data = {
            'basepath': './base/path',
            'theme': 'github',
            'mode': 'python',
            'dark_theme': 'dracula'
        }
        wrapper.data('yafowil-ace', darkmode_data);
        BS5AceWidget.initialize();
        widget = wrapper.data('yafowil-ace');
        assert.true(widget instanceof BS5AceWidget);
        assert.true(widget.ed_elem.is(ed_elem));

        assert.strictEqual(html.getAttribute('data-bs-theme'), null);
        assert.strictEqual(widget.editor.getTheme(), 'ace/theme/github');

        const done1 = assert.async();
        html.setAttribute('data-bs-theme', 'dark');
        setTimeout(()=> {
            assert.strictEqual(widget.editor.getTheme(), 'ace/theme/dracula');
            done1();
        });
        
        const done2 = assert.async();
        setTimeout(()=> {
            widget.destroy();
            html.setAttribute('data-bs-theme', 'light');
            assert.strictEqual(widget.editor.getTheme(), 'ace/theme/dracula');
            done2();
        });
    });
});
