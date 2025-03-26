import { Header as HeaderCom } from "../stories/Header"

export default function Header() {
  return (
    <HeaderCom onCreateAccount={() => { }} onLogin={() => { }} onLogout={() => { }} user={{
      name: ""
    }} />
  )
}
