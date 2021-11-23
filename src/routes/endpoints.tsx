import LoginPage from '../components/pages/LoginPage'
import MessagePage from '../components/pages/MessagePage'
import SignUpPage from '../components/pages/SignUpPage'

interface IRoutes {
  id: string
  path: string | string[]
  component: () => JSX.Element
  exact?: boolean
}

export enum PathEnum {
  DEFAULT = '/',
  LOGIN = '/login',
  DEFAULT_CHAT = '/messages',
  CHAT_WITH_ID = '/messages/:id',
  SIGN_UP = '/signup'
}

export const publicRoutes: IRoutes[] = [
  {
    id: 'loginPage',
    path: [PathEnum.DEFAULT, PathEnum.LOGIN],
    component: () => <LoginPage />,
    exact: true
  },
  {
    id: 'signUpPage',
    path: PathEnum.SIGN_UP,
    component: () => <SignUpPage />,
    exact: true
  }
]

export const privateRoutes: IRoutes[] = [
  {
    id: 'messagePage',
    path: [PathEnum.DEFAULT_CHAT, PathEnum.CHAT_WITH_ID],
    component: () => <MessagePage />,
    exact: true
  }
]
