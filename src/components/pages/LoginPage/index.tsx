import { useHistory } from 'react-router'

import LoginForm from '../../organisms/LoginForm'
import FormTemplate from '../../templates/StartForm'
import FormHeader from '../../organisms/FormHeader'

const LoginPage: React.FC = () => {
  const history = useHistory()

  const onSubmitHandler = () => {
    history.push('/messages')
  }

  return (
    <FormTemplate
      form={<LoginForm onSubmitHandler={onSubmitHandler} />}
      header={<FormHeader mainText="Welcome" additionalText="Please, authorize yourself" />}
    />
  )
}

export default LoginPage
