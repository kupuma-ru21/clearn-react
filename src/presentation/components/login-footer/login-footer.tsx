import React, { memo } from 'react';
import Styles from './login-footer-styles.scss';

const LoginFooter: React.FC = () => <footer className={Styles.footer} />;

export default memo(LoginFooter);
