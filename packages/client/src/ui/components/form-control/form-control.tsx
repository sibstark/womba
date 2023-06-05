import React from 'react'
import classnames from 'classnames'
import './styles.scss'

export const FormControl: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...rest
}) => {
  const classes = classnames(className, 'form-control')
  return <div className={classes} {...rest} />
}
