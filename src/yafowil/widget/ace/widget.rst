Datetime widget
===============

Load requirements::

    >>> import yafowil.loader
    >>> import yafowil.widget.ace

Test widget::

    >>> from yafowil.base import factory

Render widget::

    >>> widget = factory('ace', 'acefield', props={})
    >>> widget()

Widget extraction::

    >>> request = {'acefield': ''}
    >>> data = widget.extract(request)

No input was given::

    >>> data.errors
    [ExtractionError('Mandatory field was empty',)]

Empty string in extracted::

    >>> data.extracted
    ''

Widget extraction::

    >>> request = {'acefield': 'class Foo(object): pass'}
    >>> data = widget.extract(request)
    >>> data.errors
    []

    >>> data.extracted
    'class Foo(object): pass'

    >>> widget(data)

Display renderer::

    >>> value = 'class Foo(object): pass'
    >>> widget = factory('ace', 'acefield', value=value, mode='display')
    >>> widget()
