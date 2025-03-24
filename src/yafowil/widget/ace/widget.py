from yafowil.base import factory
from yafowil.base import fetch_value
from yafowil.common import generic_extractor
from yafowil.common import generic_required_extractor
from yafowil.utils import as_data_attrs
from yafowil.utils import attr_value
from yafowil.utils import cssid
from yafowil.utils import managedprops
from yafowil.utils import cssclasses


@managedprops('basepath', 'theme', 'dark_theme', 'mode', 'wrapper_class', 'read_only')
def ace_edit_renderer(widget, data):
    value = fetch_value(widget, data)
    if not value:
        value = ''
    ta_attrs = {
        'id': cssid(widget, 'ace', 'value'),
        'name': widget.dottedpath,
        'class': 'ace-editor-value',
        'style': 'display:none;',
    }
    ta = data.tag('textarea', value, **ta_attrs)
    editor_attrs = {
        'id': cssid(widget, 'ace'),
        'class': 'ace-editor',
    }
    editor = data.tag('div', value, **editor_attrs)
    wrapper_attrs = {
        'class': cssclasses(widget, data, classattr='wrapper_class')
    }
    wrapper_attrs.update(as_data_attrs({
        'yafowil-ace': {
            'basepath': attr_value('basepath', widget, data),
            'theme': attr_value('theme', widget, data),
            'dark_theme': attr_value('dark_theme', widget, data),
            'mode': attr_value('mode', widget, data),
            'read_only': attr_value('read_only', widget, data)
        }
    }))
    return data.tag('div', ta + editor, **wrapper_attrs)


def ace_display_renderer(widget, data):
    widget.attrs['read_only'] = True
    return ace_edit_renderer(widget, data)


factory.register(
    'ace',
    extractors=[
        generic_extractor,
        generic_required_extractor
    ],
    edit_renderers=[ace_edit_renderer],
    display_renderers=[ace_display_renderer]
)

factory.doc['blueprint']['ace'] = """\
Add-on blueprint `yafowil.widget.ace
<http://github.com/conestack/yafowil.widget.ace/>`_ .
"""

factory.defaults['ace.default'] = ''

factory.defaults['ace.class'] = 'ace_editor'

factory.defaults['ace.wrapper_class'] = 'ace-editor-wrapper'

factory.defaults['ace.basepath'] = ''
factory.doc['props']['ace.basepath'] = """\
ACE Basepath for resources.
"""

factory.defaults['ace.theme'] = 'github'
factory.doc['props']['ace.theme'] = """\
ACE Theme.
"""

factory.defaults['ace.dark_theme'] = None
factory.doc['props']['ace.dark_theme'] = """\
ACE Dark Mode Theme, applied on Bootstrap 5 data-bs-theme=['dark'] HTML attribute.
Requires bootstrap5 site theme.
"""

factory.defaults['ace.mode'] = 'python'
factory.doc['props']['ace.mode'] = """\
ACE Mode.
"""

factory.defaults['ace.readonly'] = False
factory.doc['props']['ace.readonly'] = """\
Render ACE widget in readonly mode.
"""