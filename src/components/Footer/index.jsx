import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react';
import UserContext from '../../contexts/UserContext';
import axios from 'axios';

import { buildStyles, CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Footer = () => {
    const {token} = useContext(UserContext)
    const [habits, setHabits] = useState([])

    const queryHabits = () => 
        axios
            .get('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today', { headers: {'Authorization': `Bearer ${token.token}`}})
            .then(({data}) => setHabits(data))
            .catch(console.error)

    useEffect(queryHabits, [])
    const completed = habits.filter(e => e.done).length

    return <FooterContainer>
        <Link to='/habitos'>Hábitos</Link>
        <Link to='/hoje'>
            <ProgressbarContainer>
                <CircularProgressbarWithChildren
                    value={completed/habits.length * 100}
                    background={true}
                    backgroundPadding={6}
                    styles={buildStyles({
                        backgroundColor: '#52B6FF',
                        pathColor: "#fff",
                        trailColor: "transparent"
                    })}
                >
                    Hoje
                </CircularProgressbarWithChildren>
            </ProgressbarContainer>
        </Link>
        <Link to='/historico'>Histórico</Link>
    </FooterContainer>}

export default Footer

const FooterContainer = styled.footer`
    height: 70px;
    position: fixed;
    z-index: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: white;
    width: 100%;
    padding: 0 36px;
    bottom: 0
`

const ProgressbarContainer = styled.div`
    position: relative;
    height: 91px;
    width: 91px;
    bottom: 20px
`