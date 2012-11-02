ACE editor widget
=================

Load requirements::

    >>> import yafowil.loader
    >>> import yafowil.widget.ace

Test widget::

    >>> from yafowil.base import factory

Render widget::

    >>> widget = factory('ace', 'acefield', props={'required': True})
    >>> pxml(widget())
    <div class="ace-editor-wrapper ace-option-theme-github ace-option-mode-python">
      <textarea class="ace-editor-value" id="ace-acefield-value" name="acefield"/>
      <div class="ace-editor" id="ace-acefield"/>
    </div>
    <BLANKLINE>

Widget extraction::

    >>> request = {'acefield': ''}
    >>> data = widget.extract(request)
    >>> data
    <RuntimeData acefield, value=<UNSET>, extracted='', 1 error(s) at ...>

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

    >>> pxml(widget(data))
    <div class="ace-editor-wrapper ace-option-theme-github ace-option-mode-python">
      <textarea class="ace-editor-value" id="ace-acefield-value" name="acefield">class Foo(object): pass</textarea>
      <div class="ace-editor" id="ace-acefield">class Foo(object): pass</div>
    </div>
    <BLANKLINE>

Display renderer::

    >>> value = 'class Foo(object): pass'
    >>> widget = factory('ace', 'acefield', value=value, mode='display')
    >>> widget()
    Traceback (most recent call last):
      ...
    NotImplementedError: ``yafowil.widget.ace`` does not support display mode yet
