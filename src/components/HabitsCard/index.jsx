import { useState, useContext, useEffect } from 'react'
import { Bars } from 'react-loader-spinner'
import styled from 'styled-components'
import axios from 'axios'

import { UserContext, TodayContext } from '../../contexts/UserContext'
import { TrashOutline } from 'react-ionicons'

const HabitsCard = ({queryHabits, deleteHabit, create = false, data = null, setCreating}) => {
    const {queryHabits: queryTodayHabits} = useContext(TodayContext)
    const [formData, setData] = useState(null)
    const [disabled, setDisabled] = useState(false)
    const [selectedDays, selectDay] = useState(new Array(7).fill(false))
    const {user} = useContext(UserContext)

    useEffect(() => {
        if(data) {
            const a = [...selectedDays]
            data.days.map(e => {a[e-1] = true})
            selectDay(a)
        }
    }, [])

    const selectButton = (event, i) => {
        event.preventDefault()
        const a = [...selectedDays]
        a[i] = !a[i]
        selectDay(a)
    }

    const saveHabit = event => {
        setDisabled(true)
        event.preventDefault()
        const days = selectedDays.map((e, i) => e ? i + 1 : e).filter(e => e)
        const habit = {name: formData, days: days}

        axios
            .post('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits', habit, { headers: {'Authorization': `Bearer ${user.token}`}})
            .then(() => {
                alert('Salvo com sucesso!')
                setDisabled(false)
                queryHabits()
                queryTodayHabits()
            })
            .catch((response) => {
                console.error(response)
                setDisabled(false)
            })
    }

    const autoDelete = event => {
        event.preventDefault()
        deleteHabit(data.id)
    }

    return <fieldset disabled={disabled}>
        <Card> 
            <div className="ahoy">
                {create ?
                    <input onChange={({target}) => setData(target.value)} type="text" placeholder='nome do hábito'/>
                    : <DeleteButtonHolder><h3>{data.name}</h3><div onClick={autoDelete}><TrashOutline/></div></DeleteButtonHolder> 
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
                    <div onClick={() => setCreating(false)}>Cancelar</div>
                    <button onClick={saveHabit}>{disabled ? <Bars height={20} color='#ffffff'/> : 'Salvar'}</button>
                </div>
            : <></>}
        </Card>
    </fieldset>
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

    h3 {
        font-size: 20px;
        color: #666666;
        margin-bottom: 8px;
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

const DeleteButtonHolder = styled.div`
    display: flex;
    justify-content: space-between;
`