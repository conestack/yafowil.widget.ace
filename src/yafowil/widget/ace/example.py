from yafowil.base import factory


DOC_ACE_PYTHON = """
ACE in Python mode
------------------

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


def get_example():
    return [ace_python(), ace_js()]
