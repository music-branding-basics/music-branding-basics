import {Link} from 'gatsby';
import React from 'react';
import classNames from 'classnames';

export default function Button({
  primary,
  small,
  large,
  className,
  component: As,
  children,
  ...props
}) {
  return (
    <As
      className={classNames(
        'border border-gray-200',
        (large && 'py-[10px] px-[18px] text-sm') || 'py-2 px-3 text-xs',
        'rounded-[8px] shadow-sm ',
        'text-center',
        'transition-all',
        (primary && 'bg-primary text-white hover:bg-primary-dark active:bg-primary-darker ') ||
          'text-black hover:bg-light active:bg-light',
        className
      )}
      {...props}
    >
      {children}
    </As>
  );
}

Button.defaultProps = {
  component: 'button',
};
