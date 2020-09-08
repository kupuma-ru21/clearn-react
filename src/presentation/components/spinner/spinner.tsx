import React from 'react';
import Styles from './spinner-styles.scss';

type Props = React.HTMLAttributes<HTMLElement> & { isNegative?: boolean };

const Spinner: React.FC<Props> = (props: Props) => {
  const neagtiveClass = props.isNegative ? Styles.negative : '';
  return (
    <div
      data-testid="spinner"
      {...props}
      className={[Styles.spinner, neagtiveClass, props.className].join(' ')}
    >
      <div />
      <div />
      <div />
      <div />
    </div>
  );
};

export default Spinner;
