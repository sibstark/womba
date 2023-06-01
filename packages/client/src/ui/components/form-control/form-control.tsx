import React from 'react'
import { classnames } from '@utils'
import './styles.scss'

type FormControlProps = React.HTMLAttributes<HTMLDivElement>
export const FormControl: React.FC<FormControlProps> = ({
  className,
  ...rest
}) => {
  const classes = classnames(className, 'form-control')
  return <div className={classes} {...rest} />
}
