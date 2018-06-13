from yafowil.base import factory
from yafowil.utils import entry_point
import os


resourcedir = os.path.join(os.path.dirname(__file__), 'resources')
js = [{
    'group': 'yafowil.widget.ace.dependencies',
    'resource': 'ace/ace.js',
    'order': 20,
}, {
    'group': 'yafowil.widget.ace.common',
    'resource': 'widget.js',
    'order': 21,
}]
css = [{
    'group': 'yafowil.widget.ace.common',
    'resource': 'widget.css',
    'order': 20,
}]


@entry_point(order=10)
def register():
    from yafowil.widget.ace import widget
    factory.register_theme('default', 'yafowil.widget.ace',
                           resourcedir, js=js, css=css)
