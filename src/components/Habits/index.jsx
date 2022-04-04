import axios from "axios"
import { useContext, useState, useEffect } from "react"
import { UserContext, TodayContext } from "../../contexts/UserContext"

import { Add } from "react-ionicons"
import HabitsCard from "../HabitsCard"

import styled from 'styled-components'

const Habits = () => {
    const {user} = useContext(UserContext)
    const {queryHabits: queryTodayHabits} = useContext(TodayContext)
    const [creating, setCreating] = useState(false)
    const [habits, setHabits] = useState([])

    const queryHabits = () => 
        axios
            .get('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits', { headers: {'Authorization': `Bearer ${user.token}`}})
            .then(({data}) => setHabits(data))
            .catch(console.error)

    const deleteHabit = id =>
        axios
            .delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}`, { headers: {'Authorization': `Bearer ${user.token}`}})
            .then(() => {
                alert('Hábito deletado com sucesso')
                queryHabits()
                queryTodayHabits()
            })
            .catch(console.error)

    useEffect(queryHabits, [])

    return <>
        <AddButtonHolder>
            <h1>Meus Hábitos</h1>
            <button onClick={() => setCreating(true)}><Add color="#ffffff"/></button>
        </AddButtonHolder>
        {habits.map((e, i) => <HabitsCard key={i} data={e} deleteHabit={deleteHabit}/>)}
        {creating ? <HabitsCard queryHabits={queryHabits} create={true} setCreating={setCreating}/> : <></>}
        {habits.length === 0 ?
            <p>
                Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!
            </p>
        : <></>}
    </>
}

const AddButtonHolder = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;

    > button {
        padding: 2px 6px;
        background-color: #52B6FF;
        border: none;
        border-radius: 5px;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;

        > span {
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
`

export default Habits