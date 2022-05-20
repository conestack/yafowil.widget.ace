from yafowil.base import factory
from yafowil.utils import entry_point
import os
import webresource as wr


resources_dir = os.path.join(os.path.dirname(__file__), 'resources')


##############################################################################
# Default
##############################################################################

# webresource ################################################################

scripts = wr.ResourceGroup(name='scripts')
scripts.add(wr.ScriptResource(
    name='ace-js',
    # actually it not depends on jquery, but yafowil-ace-js does
    # think about multiple depends values in webresource
    depends='jquery-js',
    directory=os.path.join(resources_dir, 'ace'),
    resource='ace.js'
))
scripts.add(wr.ScriptResource(
    name='yafowil-ace-js',
    depends='ace-js',
    directory=resources_dir,
    resource='widget.js',
    compressed='widget.min.js'
))

styles = wr.ResourceGroup(name='styles')
styles.add(wr.StyleResource(
    name='yafowil-ace-css',
    directory=resources_dir,
    resource='widget.css'
))

resources = wr.ResourceGroup(name='ace-resources')
resources.add(scripts)
resources.add(styles)

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

    # Default
    factory.register_theme(
        'default', 'yafowil.widget.ace', resources_dir,
        js=js, css=css, resources=resources
    )
