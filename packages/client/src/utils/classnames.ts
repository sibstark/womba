// can be replaced by npm "classnames"
function isPlainObject(
  value: unknown
): value is Record<string, unknown | unknown[]> {
  return (
    typeof value === 'object' &&
    value !== null &&
    value.constructor === Object &&
    Object.prototype.toString.call(value) === '[object Object]'
  )
}

function plainObject(obj: Record<string, unknown | unknown[]>) {
  const classes: unknown[] = []
  for (const key in obj) {
    const val = obj[key]

    if (val === true) {
      classes.push(key)
    }

    if (Array.isArray(val)) {
      classes.push(...array(val))
    }
  }

  return classes
}

function array(arr: Array<unknown>): unknown[] {
  return arr.reduce((acc: unknown[], cur) => {
    if (typeof cur === 'string' && cur) {
      acc.push(cur)
    }

    if (typeof cur === 'number' && cur) {
      acc.push(cur)
    }

    if (isPlainObject(cur)) {
      acc.push(...plainObject(cur))
    }

    if (Array.isArray(cur)) {
      acc.push(...array(cur))
    }
    return acc
  }, [])
}

export function classnames(...args: unknown[]) {
  const classes: unknown[] = []
  for (const arg of args) {
    if (typeof arg === 'string' && arg) {
      classes.push(arg)
    }

    if (typeof arg === 'number' && arg) {
      classes.push(arg)
    }

    if (isPlainObject(arg)) {
      classes.push(...plainObject(arg))
    }

    if (Array.isArray(arg)) {
      classes.push(...array(arg))
    }
  }

  return classes.join(' ')
}
