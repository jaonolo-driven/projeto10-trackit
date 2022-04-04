import Header from "../Header"
import { useContext } from "react"
import UserContext from "../../contexts/UserContext"

const Habits = () => {
    const {token} = useContext(UserContext)

    return <>
        <Header profile={token.image}/>
    </>
}

export default Habits