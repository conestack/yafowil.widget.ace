from yafowil.base import factory


DOC_ACE_PYTHON = """
ACE in Python mode
------------------

Set the 'mode' option to 'python' to create a Python Ace widget.

.. code-block:: python

    value = '''
    def foo():
        return 'foo'
    '''
    ace = factory('#field:ace', value=value, props={
        'label': 'Python source',
        'required': 'Code is required',
        'theme': 'github',
        'mode': 'python',
    })
"""

ace_py_value = """\
def foo():
    return 'foo'
"""


def ace_python():
    part = factory(u'fieldset', name='yafowil.widget.ace.python')
    part['ace'] = factory('#field:ace', value=ace_py_value, props={
        'label': 'Python source',
        'required': 'Code is required',
        'theme': 'github',
        'mode': 'python',
    })
    return {
        'widget': part,
        'doc': DOC_ACE_PYTHON,
        'title': 'Python',
    }


DOC_ACE_JS = """
ACE in Javascript mode
----------------------

Set the 'mode' option to 'javascript' to create a JavaScript Ace widget.

.. code-block:: python

    value = '''
    var foo = function() {
        return 'foo';
    };
    '''
    ace = factory('#field:ace', value=value, props={
        'label': 'Javascript Source',
        'required': 'Code is required',
        'theme': 'github',
        'mode': 'javascript',
    })
"""

ace_js_value = """\
var foo = function() {
    return 'foo';
};
"""


def ace_js():
    part = factory(u'fieldset', name='yafowil.widget.ace.js')
    part['ace'] = factory('#field:ace', value=ace_js_value, props={
        'label': 'Javascript Source',
        'required': 'Code is required',
        'theme': 'github',
        'mode': 'javascript',
    })
    return {
        'widget': part,
        'doc': DOC_ACE_JS,
        'title': 'Javascript',
    }


DOC_ACE_THEMES = """
Themes
------

Customize syntax highlighting and appearance with one of the available ACE themes.

.. code-block:: python

    value = '''
    function foo(items) {
        for (var i=0; i<=items.length; i++) {
            alert(items[i]);
        }
    }
    '''
    ace = factory('#field:ace', value=value, props={
        'label': 'Cobalt Theme',
        'required': 'Code is required',
        'theme': 'cobalt',
        'mode': 'javascript'
    })
"""

ace_theme_value = """\
function foo(items) {
    for (var i=0; i<=items.length; i++) {
        alert(items[i]);
    }
}
"""


def ace_themes():
    part = factory(u'fieldset', name='yafowil.widget.ace.themes')
    part['ace'] = factory('#field:ace', value=ace_theme_value, props={
        'label': 'Cobalt Theme',
        'required': 'Code is required',
        'theme': 'cobalt',
        'mode': 'javascript'
    })
    return {
        'widget': part,
        'doc': DOC_ACE_THEMES,
        'title': 'Themes',
    }


def get_example():
    return [ace_python(), ace_js(), ace_themes()]
