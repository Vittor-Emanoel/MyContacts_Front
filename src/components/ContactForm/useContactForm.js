import { useEffect, useImperativeHandle, useState } from "react"
import formatPhone from "../../utils/formatPhone"
import isEmailValid from "../../utils/isEmailValid"

// Utils
import CategoriesService from "../../services/CategoriesService"

// CustomHooks
import useErrors from "../../hooks/useErrors"
import useStateAsyncState from "../../hooks/useSafeAsyncState"

export default function useContactForm(onSubmit, ref) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [categoryId, setCategoryId] = useState("")
  const [categories, setCategories] = useStateAsyncState([])
  const [isLoadingCategories, setIsLoadingCategories] = useStateAsyncState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { setError, removeError, getErrorMessageByFieldName, errors } =
    useErrors()

  const isFormValid = name && errors.length === 0

  useImperativeHandle(
    ref,
    () => ({
      setFieldsValues: (contact) => {
        setName(contact.name ?? "")
        setEmail(contact.email ?? "")
        setPhone(formatPhone(contact.phone) ?? "")
        setCategoryId(contact.category.id ?? "")
      },
      resetFields: () => {
        setName("")
        setEmail("")
        setPhone("")
        setCategoryId("")
      }
    }),
    []
  )

  useEffect(() => {
    async function loadCategories() {
      try {
        const categoriesList = await CategoriesService.listCategories()

        setCategories(categoriesList)
      } catch {
      } finally {
        setIsLoadingCategories(false)
      }
    }
    loadCategories()
  }, [setCategories, setIsLoadingCategories])

  function handleNameChange({ target }) {
    setName(target.value)

    if (!target.value) {
      setError({
        field: "name",
        message: "Nome Obrigatório"
      })
    } else {
      removeError("name")
    }
  }

  function handleEmailChange({ target }) {
    setEmail(target.value)

    if (target.value && !isEmailValid(target.value)) {
      setError({
        field: "email",
        message: "E-mail Inválido"
      })
    } else {
      removeError("email")
    }
  }

  function handlePhoneChange(event) {
    setPhone(formatPhone(event.target.value))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setIsSubmitting(true)

    await onSubmit({
      name,
      email,
      phone,
      // phone: phone.replace(/\D/g, ""),
      categoryId
    })

    setIsSubmitting(false)
  }

  return {
    handleSubmit,
    getErrorMessageByFieldName,
    handleNameChange,
    name,
    email,
    handleEmailChange,
    phone,
    handlePhoneChange,
    categoryId,
    isLoadingCategories,
    isSubmitting,
    categories,
    isFormValid
  }
}
