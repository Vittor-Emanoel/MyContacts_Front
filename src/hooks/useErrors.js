import { useCallback, useState } from "react"

export default function useErrors() {
  const [errors, setErrors] = useState([])

  const setError = useCallback(
    ({ field, message }) => {
      const errorAlreadyExists = errors.find((error) => error.field === field)

      if (errorAlreadyExists) {
        return
      }
      setErrors((prevState) => [...prevState, { field, message }])
    },
    [errors]
  )

  const removeError = useCallback((fiedlName) => {
    setErrors((prevState) =>
      prevState.filter((error) => error.field !== fiedlName)
    )
  }, [])

  const getErrorMessageByFieldName = useCallback(
    (fieldName) => errors.find((error) => error.field === fieldName)?.message,
    [errors]
  )

  return {
    setError,
    removeError,
    getErrorMessageByFieldName,
    errors
  }
}
