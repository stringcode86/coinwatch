import { TailSpin } from 'react-loader-spinner'

export default function Spinner({visible}: {visible: boolean}) {
  return (
    <TailSpin visible={visible} color="var(--foreground)" wrapperClass="w-12 m-auto"/>
  )
}