import React, { useState } from 'react'
import classNames from 'classnames'
import {CSSTransition} from 'react-transition-group'

export enum AlertType {
  Success = 'success',
  Default = 'default',
  Danger = 'danger',
  Warning = 'warning'
}

interface BaseAlertProps{
  title: string;
  type?: AlertType;
  description?: string; 
  closable?: boolean;
  style?: React.CSSProperties;
  onClose?: () => void;
}

const Alert: React.FC<BaseAlertProps> = (props) => {
  const [show, setShow] = useState(true)
  const nodeRef = React.useRef(null)
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
    <CSSTransition
      nodeRef={nodeRef}
      classNames="alert-tran"
      timeout={500}
      in={show}
      appear={true}
    >
      <div
        ref={nodeRef}
        className={classes}
        style={style}
      >
        <div className="alert-header">
          <div className="alert-title">{title}</div>
          {closable ? <div className="alert-close-btn iconfont" onClick={() => {setShow(false);onClose&&onClose()}}>&#xe6d5;</div> : ''}
        </div>
          <div className="alert-desc">{description}</div>
      </div>
    </CSSTransition>
  )
}

Alert.defaultProps = {
  type: AlertType.Default,
  closable: true
}

export default Alert