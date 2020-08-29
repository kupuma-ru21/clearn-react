import React from 'react';
import Styles from './icon-styles.scss';

export enum IconName {
  thumDown = 'thumDown',
  thumUp = 'thumUp',
}

type Props = {
  iconName: IconName;
  className?: string;
};

const Icon: React.FC<Props> = ({ iconName, className }: Props) => {
  const iconColor = iconName === IconName.thumDown ? Styles.red : Styles.green;
  return (
    <div className={[Styles.iconWrap, iconColor, className].join(' ')}>
      <img className={Styles.icon} src={iconName} />
    </div>
  );
};

export default Icon;
