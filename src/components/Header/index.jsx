import styled from 'styled-components'
import headerLogo from '../../assets/headerLogo.svg'

const Header = ({profile}) => 
    <HeaderContainer>
        <img src={headerLogo} alt="header-logo" />
        <ProfilePicture src={profile} alt="profile-picture" />
    </HeaderContainer>

export default Header

const HeaderContainer = styled.header`
    height: 70px;
    position: fixed;
    z-index: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #126BA5;
    width: 100%;
    padding: 0 18px
`

const ProfilePicture = styled.img`
    height: 50px;
    border-radius: 50%;
`