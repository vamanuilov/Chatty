import cn from 'classnames'

import Image from '../../atoms/Image'

import loaderElements from '../../../assets/images/loaderElements.png'

type LoaderType = {
  isLoading: boolean
}

import './styles.scss'

const Loader: React.FC<LoaderType> = ({ isLoading }) => {
  return (
    <div className={cn('loader', { hidden: !isLoading })}>
      <div className="loader-content">
        <div className="loader-content__img">
          <Image src={loaderElements} altText="loader" />
        </div>
      </div>
    </div>
  )
}

export default Loader
