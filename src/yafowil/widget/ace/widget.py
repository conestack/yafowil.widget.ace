from yafowil.base import (
    factory,
    fetch_value,
)
from yafowil.common import (
    generic_extractor,
    generic_required_extractor,
)


def ace_edit_renderer(widget, data):
    pass


def ace_display_renderer(widget, data):
    raise NotImplementedError(u"``yafowil.widget.ace`` does not support "
                              u"display mode yet")


factory.register(
    'ace',
    extractors=[generic_extractor, generic_required_extractor],
    edit_renderers=[ace_edit_renderer],
    display_renderers=[ace_display_renderer])

factory.doc['blueprint']['ace'] = \
"""Add-on blueprint `yafowil.widget.ace 
<http://github.com/bluedynamics/yafowil.widget.ace/>`_ .
"""

factory.defaults['ace.default'] = ''

factory.defaults['ace.class'] = 'ace_editor'

factory.defaults['ace.theme'] = 'ace/theme/github'
factory.doc['props']['ace.theme'] = \
"""ACE Theme.
"""

factory.defaults['ace.mode'] = 'ace/mode/python'
factory.doc['props']['ace.mode'] = \
"""ACE Mode.
"""
