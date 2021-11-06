import cn from 'classnames'

import { ReactComponent as LoaderIcon } from '../../../assets/images/Loader.svg'

type LoaderType = {
  isLoading: boolean
}

import './styles.scss'

const Loader: React.FC<LoaderType> = ({ isLoading }) => {
  return (
    <div className={cn('loader', { loader_hidden: !isLoading })}>
      <div className="loader-content">
        <div className="loader-content__img">
          <LoaderIcon />
        </div>
      </div>
    </div>
  )
}

export default Loader
