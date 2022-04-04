import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useContext } from 'react';
import { TodayContext } from '../../contexts/UserContext';

import { buildStyles, CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Footer = () => {
    const {today} = useContext(TodayContext)

    const completed = today.filter(e => e.done).length

    return <FooterContainer>
        <Link to='/habitos'><p>Hábitos</p></Link>
        <Link to='/hoje'>
            <ProgressbarContainer>
                <CircularProgressbarWithChildren
                    value={completed/today.length *100}
                    background={true}
                    backgroundPadding={6}
                    styles={buildStyles({
                        backgroundColor: '#52B6FF',
                        pathColor: "#fff",
                        trailColor: "transparent"
                    })}
                >
                    <p>Hoje</p>
                </CircularProgressbarWithChildren>
            </ProgressbarContainer>
        </Link>
        <Link to='/historico'><p>Histórico</p></Link>
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
    bottom: 0;
    a, p {
        font-size: 17px;
        color: #52B6FF;
        text-decoration: none;
        font-family: 'Lexend Deca', sans-serif;
    }
`

const ProgressbarContainer = styled.div`
    position: relative;
    height: 91px;
    width: 91px;
    bottom: 20px;
    p {
        color: white
    }
`