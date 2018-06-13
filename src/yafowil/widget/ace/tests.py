from node.utils import UNSET
from yafowil.base import ExtractionError
from yafowil.base import factory
from yafowil.compat import IS_PY2
from yafowil.tests import YafowilTestCase
from yafowil.tests import fxml
import unittest
import yafowil.loader


if not IS_PY2:
    from importlib import reload


class TestACEWidget(YafowilTestCase):

    def setUp(self):
        super(TestACEWidget, self).setUp()
        from yafowil.widget.ace import widget
        reload(widget)

    def test_edit_renderer(self):
        widget = factory('ace', 'acefield', props={'required': True})
        self.check_output("""
        <div class="ace-editor-wrapper ace-option-theme-github ace-option-mode-python">
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
        err = self.expect_error(
            NotImplementedError,
            widget
        )
        msg = '``yafowil.widget.ace`` does not support display mode yet'
        self.assertEqual(str(err), msg)

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

        self.check_output("""
        <div class="ace-editor-wrapper ace-option-theme-github ace-option-mode-python">
         <textarea class="ace-editor-value"
                   id="ace-acefield-value"
                   name="acefield"
                   style="display:none;">class Foo(object): pass</textarea>
         <div class="ace-editor"
              id="ace-acefield">class Foo(object): pass</div>
        </div>
        """, fxml(widget(data)))


if __name__ == '__main__':
    unittest.main()                                          # pragma: no cover
