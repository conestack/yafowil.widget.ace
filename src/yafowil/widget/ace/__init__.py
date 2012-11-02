import os 
from yafowil.base import factory


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


def register():
    import widget
    factory.register_theme('default', 'yafowil.widget.ace',
                           resourcedir, js=js, css=css)
