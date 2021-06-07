import React, { useState } from 'react'
import classNames from 'classnames'
import Transition from '../Transition/transition'

// export type AlertType = 

export interface BaseAlertProps{
  title: string;
  type?: 'success' | 'default' | 'danger' | 'warning';
  description?: string; 
  closable?: boolean;
  style?: React.CSSProperties;
  onClose?: () => void;
}

const Alert: React.FC<BaseAlertProps> = (props) => {
  const [show, setShow] = useState(true)
  const {
    title,
    type,
    description,
    closable,
    style,
    onClose
  } = props
  const classes = classNames('alert', {
    [`alert-${type}`]: type,
  })
  return (
    <Transition
      animation="zoom-in-top"
      timeout={500}
      in={show}
    >
      <div
        className={classes}
        style={style}
      >
        <div className="alert-header">
          <div className="alert-title">{title}</div>
          {closable ? <div className="alert-close-btn iconfont" onClick={() => {setShow(false);onClose&&onClose()}}>&#xe6d5;</div> : ''}
        </div>
          <div className="alert-desc">{description}</div>
      </div>
    </Transition>
  )
}

Alert.defaultProps = {
  type: "default",
  closable: true
}

export default Alert