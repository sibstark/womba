import React from 'react'
import { classnames } from '@utils'
import './styles.scss'

type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>
export const Label: React.FC<LabelProps> = ({ className, ...rest }) => {
  const classes = classnames(className, 'form-label')
  return <label className={classes} {...rest} />
}
