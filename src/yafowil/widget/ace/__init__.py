from yafowil.base import factory
from yafowil.utils import entry_point
import os
import webresource as wr


resources_dir = os.path.join(os.path.dirname(__file__), 'resources')


##############################################################################
# Default
##############################################################################

# webresource ################################################################

resources = wr.ResourceGroup(
    name='yafowil.widget.ace',
    directory=resources_dir,
    path='yafowil-ace'
)
resources.add(wr.ScriptResource(
    name='ace-js',
    directory=os.path.join(resources_dir, 'ace'),
    path='yafowil-ace/ace',
    resource='ace.js'
))
resources.add(wr.ScriptResource(
    name='yafowil-ace-js',
    depends=[
        'jquery-js',
        'ace-js'
    ],
    resource='widget.js',
    compressed='widget.min.js'
))
resources.add(wr.StyleResource(
    name='yafowil-ace-css',
    directory=resources_dir,
    resource='widget.css'
))

# B/C resources ##############################################################

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


##############################################################################
# Registration
##############################################################################

@entry_point(order=10)
def register():
    from yafowil.widget.ace import widget  # noqa

    widget_name = 'yafowil.widget.ace'

    # Default
    factory.register_theme(
        'default',
        widget_name,
        resources_dir,
        js=js,
        css=css
    )
    factory.register_resources('default', widget_name, resources)
