import React from 'react';

import styles from './Backdrop.module.css';

const backDrop = (props) => (
    props.show ? <div className={[styles.Backdrop, styles[props.type]].join(" ")} onClick={props.clicked}></div> : null
);

export default backDrop;