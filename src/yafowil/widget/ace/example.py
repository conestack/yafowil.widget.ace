from yafowil.base import factory


DOC_ACE_PYTHON = """
Python Editor
-------------

.. code-block:: python

    value = "def foo():\\n    return 'foo'"
    ace = factory('#field:ace', value=value, props={
        'label': 'Python source',
        'required': 'Code is required',
        'theme': 'github',
        'mode': 'python'})
"""

def ace_python():
    part = factory(u'fieldset', name='yafowilwidgetacepython')
    value = "def foo():\n    return 'foo'"
    part['ace'] = factory('#field:ace', value=value, props={
        'label': 'Python source',
        'required': 'Code is required',
        'theme': 'github',
        'mode': 'python'})
    return {'widget': part,
            'doc': DOC_ACE_PYTHON,
            'title': 'Python Source'}


DOC_ACE_JS = """
Javascript Editor
-----------------

.. code-block:: python

    value = "var foo = function() {\\n    return 'foo';\\n};"
    ace = factory('#field:ace', value=value, props={
        'label': 'Javascript Source',
        'required': 'Code is required',
        'theme': 'github',
        'mode': 'javascript'})

"""

def ace_js():
    part = factory(u'fieldset', name='yafowilwidgetacejs')
    value = "var foo = function() {\n    return 'foo';\n};"
    part['ace'] = factory('#field:ace', value=value, props={
        'label': 'Javascript Source',
        'required': 'Code is required',
        'theme': 'github',
        'mode': 'javascript'})
    return {'widget': part,
            'doc': DOC_ACE_JS,
            'title': 'Javascript Source'}


def get_example():
    return [ace_python(), ace_js()]
