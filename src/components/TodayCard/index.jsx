import axios from 'axios'
import { useState, useContext, useEffect } from 'react'
import styled from 'styled-components'

import UserContext from '../../contexts/UserContext'

const TodayCard = ({queryHabits, data}) => {
    const selected = data.done
    const {token} = useContext(UserContext)

    const toggleSelect = () =>
        axios
            .post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${data.id}/${selected ? 'un' : ''}check`, {}, { headers: {'Authorization': `Bearer ${token.token}`} })
            .then(queryHabits)
            .catch(console.error)

    return <TCard> 
        <div>
            <h3>{data.name}</h3>
            <p>
                Sequência atual: <span className={selected ? 'selected' : ''} >{data.currentSequence}</span>
                <br/>
                Seu recorde: <span className={data.currentSequence === data.highestSequence ? 'selected' : ''} >{data.highestSequence}</span>
            </p>
        </div>
        <SelectButton className={selected ? 'selected' : ''} onClick={toggleSelect}>oi</SelectButton>
    </TCard>
}

export default TodayCard

const TCard = styled.article`
    width: 100%;
    max-height: 180px;
    gap: 30px;
    padding: 13px;
    display: flex;
    justify-content: space-between;
    background-color: white;
    border-radius: 5px;

    h3 {
        font-size: 20px;
        color: #666666;
        margin-bottom: 8px;
    }

    p {
        line-height: 17px;
        font-size: 13px;
    }

    button.selected {
        background-color: #8FC549;
    }
`

const SelectButton = styled.button`
    border: none;
    border-radius: 5px;
    color: white;
    width: 70px;
    height: 70px;
    background-color: #EBEBEB
`