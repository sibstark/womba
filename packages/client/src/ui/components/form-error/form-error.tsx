import React from 'react'
import classnames from 'classnames'
import './styles.scss'

export const FormError: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...rest
}) => {
  const classes = classnames(className, 'form-error')
  return <div className={classes} {...rest} />
}
