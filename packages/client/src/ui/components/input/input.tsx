import { classnames } from '@utils'
import React from 'react'
import './styles.scss'

type InputProps = React.InputHTMLAttributes<HTMLInputElement>
export const Input: React.FC<InputProps> = ({ className, ...rest }) => {
  const classes = classnames(className, 'input')
  return <input {...rest} className={classes} />
}
