import { structure } from "tamnora-react"

export function AdminHome() {
  async function getData() {
    await structure('t', 'vehiculos').then(res => console.log(res))

  }
  return (
    <>
      <button onClick={getData}> touch me </button>
    </>
  )
}