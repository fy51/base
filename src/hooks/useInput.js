import { useState } from 'react'

const useInput = (initValue) => {
  const [value, setValue] = useState(initValue)

  const resetValue = () => setValue(initValue)

  const attributes = {
    value,
    onChange: (e) => setValue(e.target.value),
  }

  return [value, resetValue, attributes]
}

export default useInput
