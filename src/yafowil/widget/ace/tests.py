from node.utils import UNSET
from yafowil.base import ExtractionError
from yafowil.base import factory
from yafowil.compat import IS_PY2
from yafowil.tests import fxml
from yafowil.tests import YafowilTestCase
import os
import unittest


if not IS_PY2:
    from importlib import reload


def np(path):
    return path.replace('/', os.path.sep)


class TestACEWidget(YafowilTestCase):

    def setUp(self):
        super(TestACEWidget, self).setUp()
        from yafowil.widget import ace
        from yafowil.widget.ace import widget
        reload(widget)
        ace.register()

    def test_edit_renderer(self):
        widget = factory('ace', 'acefield', props={'required': True})
        self.checkOutput("""
        <div class="ace-editor-wrapper"
             data-yafowil-ace="{&quot;basepath&quot;:
                                &quot;&quot;,
                                &quot;theme&quot;:
                                &quot;github&quot;,
                                &quot;mode&quot;:
                                &quot;python&quot;}">
          <textarea class="ace-editor-value"
                    id="ace-acefield-value"
                    name="acefield"
                    style="display:none;"/>
          <div class="ace-editor" id="ace-acefield"/>
        </div>
        """, fxml(widget()))

    def test_display_renderer(self):
        value = 'class Foo(object): pass'
        widget = factory('ace', 'acefield', value=value, mode='display')
        with self.assertRaises(NotImplementedError) as arc:
            widget()
        msg = '``yafowil.widget.ace`` does not support display mode yet'
        self.assertEqual(str(arc.exception), msg)

    def test_extraction(self):
        widget = factory('ace', 'acefield', props={'required': True})
        request = {'acefield': ''}
        data = widget.extract(request)
        self.assertEqual(data.name, 'acefield')
        self.assertEqual(data.value, UNSET)
        self.assertEqual(data.extracted, '')
        self.assertEqual(data.errors, [
            ExtractionError('Mandatory field was empty')
        ])

        request = {'acefield': 'class Foo(object): pass'}
        data = widget.extract(request)
        self.assertEqual(data.name, 'acefield')
        self.assertEqual(data.value, UNSET)
        self.assertEqual(data.extracted, 'class Foo(object): pass')
        self.assertEqual(data.errors, [])

        self.checkOutput("""
        <div class="ace-editor-wrapper"
             data-yafowil-ace="{&quot;basepath&quot;:
                                &quot;&quot;,
                                &quot;theme&quot;:
                                &quot;github&quot;,
                                &quot;mode&quot;:
                                &quot;python&quot;}">
          <textarea class="ace-editor-value"
                    id="ace-acefield-value"
                    name="acefield"
                    style="display:none;">class Foo(object): pass</textarea>
          <div class="ace-editor"
               id="ace-acefield">class Foo(object): pass</div>
        </div>
        """, fxml(widget(data)))

    def test_resources(self):
        factory.theme = 'default'
        resources = factory.get_resources('yafowil.widget.ace')
        self.assertTrue(resources.directory.endswith(np('/ace/resources')))
        self.assertEqual(resources.name, 'yafowil.widget.ace')
        self.assertEqual(resources.path, 'yafowil-ace')

        scripts = resources.scripts
        self.assertEqual(len(scripts), 2)

        self.assertTrue(scripts[0].directory.endswith(np('/ace/resources/ace')))
        self.assertEqual(scripts[0].path, 'yafowil-ace/ace')
        self.assertEqual(scripts[0].file_name, 'ace.js')
        self.assertTrue(os.path.exists(scripts[0].file_path))

        self.assertTrue(scripts[1].directory.endswith(np('/ace/resources')))
        self.assertEqual(scripts[1].path, 'yafowil-ace')
        self.assertEqual(scripts[1].file_name, 'widget.min.js')
        self.assertTrue(os.path.exists(scripts[1].file_path))

        styles = resources.styles
        self.assertEqual(len(styles), 1)

        self.assertTrue(styles[0].directory.endswith(np('/ace/resources')))
        self.assertEqual(styles[0].path, 'yafowil-ace')
        self.assertEqual(styles[0].file_name, 'widget.css')
        self.assertTrue(os.path.exists(styles[0].file_path))


if __name__ == '__main__':
    unittest.main()
