import React from 'react'
import { classnames } from '@utils'
import './styles.scss'

type FormErrorProps = React.HTMLAttributes<HTMLDivElement>
export const FormError: React.FC<FormErrorProps> = ({ className, ...rest }) => {
  const classes = classnames(className, 'form-error')
  return <div className={classes} {...rest} />
}
