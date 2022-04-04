import axios from "axios"
import { useContext, useState, useEffect } from "react"
import { UserContext, TodayContext } from "../../contexts/UserContext"

import styled from 'styled-components'
import TodayCard from "../TodayCard"

const Today = () => {
    const {user} = useContext(UserContext)
    const {today: habits, setToday: setHabits, queryHabits} = useContext(TodayContext)

    useEffect(queryHabits, [])

    const todayDate = new Date()
    const weekday = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
    const completed = habits.filter(e => e.done).length

    return <> 
        <DonePercentageHolder>
            <h1>{weekday[todayDate.getDay()]}, {`${todayDate.getDate()}`.padStart(2, '0')}/{`${todayDate.getMonth()}`.padStart(2, '0')}</h1>
            {habits.length !== 0 ? <h2>
                {completed === 0 ? 'Nenhum hábito concluído ainda' : <span className='selected'>{((completed/habits.length)*100).toFixed(0)}% dos hábitos concluídos</span>}
            </h2> : <></>}
        </DonePercentageHolder>
        {habits.map(e => <TodayCard queryHabits={queryHabits} data={e}/>)}
        {habits.length === 0 ?
            <p>
                Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!
            </p>
        : <></>}
    </>
}

export default Today

const DonePercentageHolder = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    flex-direction: column;
    gap: 6px;
`