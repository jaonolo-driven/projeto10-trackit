import { useState, useContext, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'

import UserContext from '../../contexts/UserContext'

const HabitsCard = ({deleteHabit, create = false, data = null}) => {
    const [formData, setData] = useState(null)
    const [selectedDays, selectDay] = useState(new Array(7).fill(false))
    const {token} = useContext(UserContext)

    useEffect(() => {
        if(data) {
            const a = [...selectedDays]
            data.days.map(e => {a[e-1] = true})
            selectDay(a)
        }
    })

    const selectButton = (event, i) => {
        event.preventDefault()
        const a = [...selectedDays]
        a[i] = !a[i]
        selectDay(a)
    }

    const saveHabit = event => {
        event.preventDefault()
        const days = selectedDays.map((e, i) => e ? i + 1 : e).filter(e => e)
        const habit = {name: formData, days: days}

        axios
            .post('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits', habit, { headers: {'Authorization': `Bearer ${token.token}`}})
            .then(() => alert('Salvo com sucesso!'))
            .catch(console.error)
    }

    const autoDelete = event => {
        event.preventDefault()
        deleteHabit(data.id)
    }

    return <Card> 
        <div className="ahoy">
            {create ?
                <input onChange={({target}) => setData(target.value)} type="text" placeholder='nome do hábito'/>
                : <><p>{data.name}</p><button onClick={autoDelete}></button></> 
            }
            <div>
                {['D','S','T','Q','Q','S','S'].map((e, i) => 
                    <button disabled={!create} className={selectedDays[i] ? 'selected' : ''} onClick={event => selectButton(event, i)}>
                        {e}
                    </button>
                )}
            </div>
        </div>
        {create ?
            <div>
                <div>Cancelar</div>
                <button onClick={saveHabit}>Salvar</button>
            </div>
        : <></>}
    </Card>
}

export default HabitsCard

const Card = styled.form`
    width: 100%;
    max-height: 180px;
    gap: 30px;
    padding: 17px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: white;
    border-radius: 5px;

    input {
        height: 45px;
        border-radius: 5px;
        border: solid 1px #D4D4D4;
        padding: 11px;
        font-size: 20px;
        ::placeholder {
            color: #DBDBDB;
        }
    }

    > div:not(.ahoy) {
        display: flex;
        justify-content: flex-end;
        gap: 24px;

        div {
            display: flex;
            align-items: center;
            font-size: 16px;
            color: #52B6FF;
        }

        button {
            background-color: #52B6FF;
            border: none;
            color: white;
            font-size: 16px;
            padding: 7px 17px;
            border-radius: 5px;
        }
    }

    .ahoy {
        display: flex;
        flex-direction: column;
        gap: 10px;

        button {
            width: 30px;
            height: 30px;
            padding: 0;
            border-radius: 5px;
            border: solid 1px #D4D4D4;
            background-color: transparent;
            font-size: 20px;
            color: #DBDBDB;
        }

        .selected {
            background-color: #CFCFCF;
            border-color: #CFCFCF;
            color: white;
        }

        > div {
            display: flex;
            gap: 4px;
        }
    }
`