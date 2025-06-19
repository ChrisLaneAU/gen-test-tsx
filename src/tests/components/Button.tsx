import { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';

type BaseLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  /** Include an href to turn the button into a link. */
  href: string;
};

type BaseButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Button must have a click event handler. */
  onClick: AnchorHTMLAttributes<HTMLButtonElement>['onClick'];
  /** Button must not have an href. */
  href?: never;
};

type ButtonProps = BaseLinkProps | BaseButtonProps;

export const Button = (props: ButtonProps) =>
  'href' in props ? <a {...(props.href && props)} /> : <button {...props} />;
