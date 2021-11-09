import cn from 'classnames'

import { ReactComponent as LoaderIcon } from '../../../assets/images/Loader.svg'

type LoaderType = {
  isLoading: boolean
  isFixed?: boolean
}

import './styles.scss'

const Loader: React.FC<LoaderType> = ({ isLoading, isFixed }) => {
  return (
    <div className={cn('loader', { loader_hidden: !isLoading, loader_fixed: isFixed })}>
      <div className="loader-content">
        <div className="loader-content__img">
          <LoaderIcon />
        </div>
      </div>
    </div>
  )
}

export default Loader
