import $ from 'jquery';

import {AceWidget} from './widget.js';

export * from './widget.js';

$(function() {
    if (window.ts !== undefined) {
        ts.ajax.register(AceWidget.initialize, true);
    } else {
        AceWidget.initialize();
    }
});
