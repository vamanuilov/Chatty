import * as yup from 'yup'

import { MAX_INPUT_VALUE, MIN_INPUT_VALUE } from './'

export const signUpSchema = yup.object().shape({
  login: yup.string().min(MIN_INPUT_VALUE).max(MAX_INPUT_VALUE).required('Required field'),
  password: yup.string().min(MIN_INPUT_VALUE).max(MAX_INPUT_VALUE).required('Required field'),
  password_confirm: yup
    .string()
    .required('Required field')
    .oneOf([yup.ref('password'), null], 'Passwords do not match'),
  name: yup.string().min(MIN_INPUT_VALUE).max(MAX_INPUT_VALUE).required('Required field'),
  gender_id: yup.number().required('Required field'),
  captcha: yup.string().required('Required field')
})

export const loginSchema = yup.object().shape({
  login: yup.string().min(MIN_INPUT_VALUE).required(),
  password: yup.string().min(MIN_INPUT_VALUE).max(MAX_INPUT_VALUE).required(),
  captcha: yup.string().required()
})
