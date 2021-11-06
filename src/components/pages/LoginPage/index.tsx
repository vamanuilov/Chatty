import { useEffect } from 'react'
import { useHistory } from 'react-router'
import { observer } from 'mobx-react-lite'

import LoginForm from '../../organisms/LoginForm'
import FormTemplate from '../../templates/StartForm'
import FormHeader from '../../organisms/FormHeader'

import user from '../../../store/user'

import { ILoginData } from '../../../interface/user'

const LoginPage: React.FC = () => {
  const history = useHistory()

  const onSubmitHandler = (data: ILoginData) => {
    user.logIn(data)
  }

  const onAdditionalButtonClickHandler = () => {
    history.push('/signup')
  }

  useEffect(() => {
    if (user.wsConnectKey) {
      history.push('/messages')
    }
  }, [user.wsConnectKey])

  return (
    <FormTemplate
      isLoading={user.isLoading}
      form={
        <LoginForm onSubmitHandler={onSubmitHandler} onAdditionalButtonClickHandler={onAdditionalButtonClickHandler} />
      }
      header={<FormHeader mainText="Welcome" additionalText="Please, authorize yourself" />}
    />
  )
}

export default observer(LoginPage)
