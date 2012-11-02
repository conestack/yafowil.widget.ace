from yafowil.base import factory


DOC_ACE_PYTHON = """
ACE in Python mode
------------------

.. code-block:: python

    value = "def foo():\\n    return 'foo'"
    ace = factory('#field:ace', value=value, props={
        'label': 'Python source',
        'required': 'Code is required',
        'theme': 'github',
        'mode': 'python'})
"""

def ace_python():
    part = factory(u'fieldset', name='yafowil.widget.ace.python')
    value = "def foo():\n    return 'foo'"
    part['ace'] = factory('#field:ace', value=value, props={
        'label': 'Python source',
        'required': 'Code is required',
        'theme': 'github',
        'mode': 'python'})
    return {'widget': part,
            'doc': DOC_ACE_PYTHON,
            'title': 'Python'}


DOC_ACE_JS = """
ACE in Javascript mode
----------------------

.. code-block:: python

    value = "var foo = function() {\\n    return 'foo';\\n};"
    ace = factory('#field:ace', value=value, props={
        'label': 'Javascript Source',
        'required': 'Code is required',
        'theme': 'github',
        'mode': 'javascript'})

"""

def ace_js():
    part = factory(u'fieldset', name='yafowil.widget.ace.js')
    value = "var foo = function() {\n    return 'foo';\n};"
    part['ace'] = factory('#field:ace', value=value, props={
        'label': 'Javascript Source',
        'required': 'Code is required',
        'theme': 'github',
        'mode': 'javascript'})
    return {'widget': part,
            'doc': DOC_ACE_JS,
            'title': 'Javascript'}


def get_example():
    return [ace_python(), ace_js()]
