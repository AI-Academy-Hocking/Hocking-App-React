declare module 'react-transition-group' {
  import * as React from 'react';

  export interface CSSTransitionProps {
    in?: boolean;
    timeout: number;
    classNames: string;
    children: React.ReactNode;
    [key: string]: any;
  }

  export interface TransitionGroupProps {
    children: React.ReactNode;
    [key: string]: any;
  }

  export class CSSTransition extends React.Component<CSSTransitionProps> {}
  export class TransitionGroup extends React.Component<TransitionGroupProps> {}
} 