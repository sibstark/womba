import { classnames } from '@utils'
import React from 'react'
import './styles.scss'

export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({
  className,
  ...rest
}) => {
  const classes = classnames(className, 'input')
  return <input {...rest} className={classes} />
}
