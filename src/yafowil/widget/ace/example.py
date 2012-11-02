from yafowil.base import factory


DOC_ACE = """
ACE Editor
----------

.. code-block:: python

    ace = factory('#field:ace', props={
        'label': 'ACE field',
        'required': 'Code is required'})
"""

def ace():
    part = factory(u'fieldset', name='yafowilwidgetace')
    part['ace'] = factory('#field:ace', props={
        'label': 'ACE field',
        'required': 'Code is required'})
    return {'widget': part,
            'doc': DOC_ACE,
            'title': 'ACE Editor'}


def get_example():
    return [ace()]