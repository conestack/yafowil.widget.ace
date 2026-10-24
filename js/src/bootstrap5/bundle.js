import $ from 'jquery';
import { BS5AceWidget, register_array_subscribers } from './widget.js';

export * from './widget.js';

$(() => {
    if (window.ts !== undefined) {
        ts.ajax.register(BS5AceWidget.initialize, true);
    } else if (window.bdajax !== undefined) {
        bdajax.register(BS5AceWidget.initialize, true);
    } else {
        BS5AceWidget.initialize();
    }
    register_array_subscribers();
});
