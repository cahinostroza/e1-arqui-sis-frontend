export default function ErrorMessage({ message, show }) {
  return (
    <>
    { show && <div>{message}</div>}
    </>
  )
}