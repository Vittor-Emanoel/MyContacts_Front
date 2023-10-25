/* eslint-disable no-shadow */
import PropTypes from "prop-types"
import { useEffect, useState } from "react"
import formatPhone from "../../utils/formatPhone"
import isEmailValid from "../../utils/isEmailValid"

// Utils
import CategoriesService from "../../services/CategoriesService"

// Components
import Button from "../Button"
import FormGroup from "../FormGroup"
import Input from "../Input"
import Select from "../Select"


// Styles
import { ButtonContainer, Form } from "./styles"

// CustomHooks
import useErrors from "../../hooks/useErrors"

// Controlled Componentes = Responsabilidade do react, renderiza a cada letra
// Uncontrolled Componentes = Javascript puro(useRef)

export default function ContactForm({ buttonLabel, onSubmit }) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [categoryId, setCategoryId] = useState("")
  const [categories, setCategories] = useState([])
  const [isLoadingCategories, setIsLoadingCategories] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { setError, removeError, getErrorMessageByFieldName, errors } =
    useErrors()

  const isFormValid = name && errors.length === 0

  useEffect(() => {
    async function loadCategories() {
      try 
      
      {
        const categoriesList = await CategoriesService.listCategories()

        setCategories(categoriesList)
      } catch {
      } finally {
        setIsLoadingCategories(false)
      }
    }
    loadCategories()
  }, [])

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

  function handlePhoneChange({ target }) {
    setPhone(formatPhone(target.value))
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

    setName('')
    setEmail('')
    setPhone('')
    setCategoryId('')
 
  }



  return (
    <Form onSubmit={handleSubmit} noValidate>
      <FormGroup error={getErrorMessageByFieldName("name")}>
        <Input
          error={getErrorMessageByFieldName("name")}
          placeholder="Nome *"
          value={name}
          onChange={handleNameChange}
          disabled={isSubmitting}
        />
      </FormGroup>

      <FormGroup error={getErrorMessageByFieldName("email")}>
        <Input
          error={getErrorMessageByFieldName("email")}
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={handleEmailChange}
          disabled={isSubmitting}
        />
      </FormGroup>

      <FormGroup>
        <Input
          placeholder="Telefone"
          value={phone}
          onChange={handlePhoneChange}
          maxLength="15"
          disabled={isSubmitting}
        />
      </FormGroup>

      <FormGroup isLoading={isLoadingCategories}>
        <Select
          value={categoryId}
          onChange={({ target }) => setCategoryId(target.value)}
          disabled={isLoadingCategories || isSubmitting}
          
        >
          <option value="">Sem categoria</option>

          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Select>
      </FormGroup>

      <ButtonContainer>
        <Button 
          type="submit" 
          disabled={!isFormValid} 
          isLoading={isSubmitting}
        >
          {buttonLabel}
          
        </Button>
      </ButtonContainer>
    </Form>
  )
}

ContactForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
}
