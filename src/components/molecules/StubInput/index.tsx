import classNames from 'classnames'

import Label from '../../atoms/Label'

import './styles.scss'

interface IStubInput {
  labelText: string
  isLoading: boolean
}

const StubInput: React.FC<IStubInput> = ({ labelText, isLoading }) => {
  return (
    <div className="stub">
      <Label labelText={labelText} />
      <div
        className={classNames('stub__input', { stub__input_loading: isLoading, stub__input_error: !isLoading })}
      ></div>
    </div>
  )
}

export default StubInput
