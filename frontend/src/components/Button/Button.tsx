import {IconType} from 'react-icons';
import {ComponentPropsWithoutRef, ElementType} from 'react';

type ButtonProps<T extends ElementType> = {
  icon?: IconType,
  tag?: T;
} & ComponentPropsWithoutRef<T>;

export const Button = <T extends ElementType = 'button'>(
  {
    tag,
    children,
    icon: Icon,
    ...otherProps
  }: ButtonProps<T> &
    Omit<ComponentPropsWithoutRef<T>, keyof ButtonProps<T>>) => {
  const Component = tag || 'button';
  return (
    <Component className={'button'} {...otherProps}>
      {children} {Icon && <Icon/>}
    </Component>
  );
};
