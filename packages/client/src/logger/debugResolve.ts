import getNameWithTimeColored from './getNameWithTimeColored'

const backgroundColor = 'red'

const debugResolve = (moduleName = '', { method = 'debug' } = {}) => {
  // @ts-ignore
  return (...args) => {
    // @ts-ignore
    console[method](
      ...getNameWithTimeColored({ name: moduleName, backgroundColor }),
      ...args
    )
  }
}

export default debugResolve
