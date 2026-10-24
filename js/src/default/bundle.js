import $ from 'jquery';
import { AceWidget, register_array_subscribers } from './widget.js';

export * from './widget.js';

$(() => {
    if (window.ts !== undefined) {
        ts.ajax.register(AceWidget.initialize, true);
    } else if (window.bdajax !== undefined) {
        bdajax.register(AceWidget.initialize, true);
    } else {
        AceWidget.initialize();
    }
    register_array_subscribers();
});
