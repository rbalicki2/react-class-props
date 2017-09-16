# React Class Props

> A utility class for decorating React components to turn props into classNames.

## Quick reference

```
import reactClassProps from 'react-class-props';

@reactClassProps({
  propName: 'class-name',
  // e.g.
  pullRight: 'pull-right'
})
class MyComponent extends Component {
  // ...
}
```

Now, `MyComponent` accepts a `pullRight` prop that applies a `pull-right` class to the component!

## Motivation

At their best, React components expose simple, clean and statically-typed interfaces (via `propTypes`) that effectively hide their internal complexity. However, these components often are not sufficient for our needs, and we need to resort to the use of `className`s (and `style`) to augment their capabilities.

And while the `propTypes` interface is elegant, the use of `className`s is not. Some of the downsides of using the `className`s interface include:

* It is not easy to determine which classes are allowed, and which have no effect.
* It is hard to distinguish between props accepted by the original component, and user-added extra features (via classes and CSS).
* It is difficult to visually distinguish between classes that are universal (e.g. `pull-right` from Twitter Bootstrap) and classes can only affect a particular component.

(There are other advantages to using `propTypes` that this library does not address.)

This library exposes a method that wraps existing Components and adds props which have the effect of creating more `className`s.

(This library does not concern itself with `style`, although see [the inline-style section](#style).)

## Example

The following two examples are roughly equivalent:

```
import React from 'react';
import reactClassProps from 'react-class-props';

const TitleComponent = ({ className, title }) => (<h1 className={className}>
  { title }
</h1>);

const TitleComponentWrapped = reactClassProps({
  pullRight: 'pull-right',
  pullLeft: 'pull-left',
})(TitleComponent);
```

and

```
import React from 'react';

const TitleComponentWrapped = ({ className, title, pullRight, pullLeft }) => ({
  const newClassName = `${pullRight ? 'pull-right' : ''} ${pullLeft ? 'pull-left' : ''} ${className}`;
  return (<h1 className={newClassName}>
    { title }
  </h1>);
});
```

You can also use `reactClassProps` as a class decorator.

```
import React, { Component } from 'react';
import reactClassProps from 'react-class-props';

@reactClassProps({
  pullLeft: 'pull-left',
  pullRight: 'pull-right',
})
class TitleComponentWrapped extends Component {
  render() {
    return (<h1 className={this.props.className}>
      { this.props.title }
    </h1>);
  }
}

```

## API

### `reactClassProps`

Access this via `import reactClassProps from 'react-class-props';`

This is the default class exported. It has the following signature:

`propsToClassNamesHash => (Component => WrappedComponent)`

`propsToClassNamesHash` is an object whose keys are names of props and whose values are classes you want applied to the component, e.g.

```
{
  pullRight: 'pull-right',
}
```

I haven't tested whether non-standard characters in the keys or values (e.g. other unicode characters, whitespace, etc.) work, so caveat emptor.

### `componentWithName`

Access this via `import { componentWithName } from 'react-class-props';`

This is an internal utility class that creates a component with a particular name, that optionally extends from a parent class.

Javascript does not make it easy to have dynamically named classes or functions. In our case, we use it so that when the component is logged out to the console, it has the same name as the original component.

It has the following signature:

`(name, ParentClass) => Component`

Both are optional parameters. If `name` is supplied, the Component has that name, and if `ParentClass` is supplied, `Component` extends from that class.

It's internal use is as follows:

`WrappedComponent = componentWithName(Component.name, Object.getPrototypeOf(ParentClass));`

## <a name="style"></a>Inline style

Inline styles can also be difficult to manage and as a project gets larger, and can grow out of hand. I would recommend encapsulating various commonly used style changes, e.g. `{ display: 'inline-block' }` as classes, and running those classes through this library.

## Contributing

Please, feel free to reach out and contribute! [robert.balicki@gmail.com](mailto:robert.balicki@gmail.com)
