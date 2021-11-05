import { PropsWithChildren } from 'react'
import LoginPage from '../components/pages/LoginPage'
import MessagePage from '../components/pages/MessagePage'
import SignUpPage from '../components/pages/SignUpPage'

interface IRoutes {
  path: string | string[]
  component: (props: PropsWithChildren<any>) => JSX.Element
  exact?: boolean
}

export enum PathEnum {
  DEFAULT = '/',
  LOGIN = '/login',
  DEFAULT_CHAT = '/messages',
  CHAT_WITH_ID = '/messages/:id',
  SIGN_UP = '/signup'
}

// TODO: remove messages from publicroutes

export const publicRoutes: IRoutes[] = [
  {
    path: [PathEnum.DEFAULT, PathEnum.LOGIN],
    component: () => <LoginPage />,
    exact: true
  },
  {
    path: [PathEnum.DEFAULT_CHAT, PathEnum.CHAT_WITH_ID],
    component: () => <MessagePage />,
    exact: true
  },
  {
    path: PathEnum.SIGN_UP,
    component: () => <SignUpPage />,
    exact: true
  }
]

export const privateRoutes: IRoutes[] = [
  {
    path: [PathEnum.DEFAULT_CHAT, PathEnum.CHAT_WITH_ID],
    component: () => <MessagePage />,
    exact: true
  }
]
