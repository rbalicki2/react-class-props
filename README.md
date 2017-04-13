# React Class Props

> A utility class for decorating React components to turn props into classNames.

## Motivation

At its best, React components expose simple, clean and statically-typed interfaces (via `propTypes`) that effectively hide their internal complexity. However, these components often are not sufficient for our needs, and we need to resort to the use of `className`s (and `style`) to augment their capabilities.

And while the `propTypes` interface is elegant, the use of `className`s is not. Some of the downsides of using the `className`s interface include:

* It is not easy to determine which classes are allowed, and which have no effect.
* It is hard to distinguish between props accepted by the original component, and user-added extra features (via classes and CSS).
* It is difficult to visually distinguish between classes that are universal (e.g. `pull-right` from Twitter Bootstrap) and classes can only affect a particular component.

(There are other advantages to using `propTypes` that this library does not address.)

This library exposes a method that wraps existing Components and adds props which have the effect of creating more `className`s.

(This library does not concern itself with `style`, although see [this section](#style).)

## Example

The following two are essentially equivalent:

```
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
const TitleComponentWrapped = ({ className, title, pullRight, pullLeft }) => ({
  const className = `${pullRight ? 'pull-right' : ''} ${pullLeft ? 'pull-left' : ''} className`;
  return (<h1 className={className}>
    { title }
  </h1>);
});
```

You can also use `reactClassProps` as a class decorator.

## <a name="style"></a>Style