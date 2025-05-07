import { Outlet } from "react-router-dom"
import Header from "./Header"
import SideBar from "./SideBar"
import styled from "styled-components"

const Main=styled.main`
    background-color:var(--color-grey-50) ;
    padding: 4rem 4.8rem 6.4rem;
`
const StyledLayout=styled.div`
    display: grid;
    height: 100vh;
    grid-template-columns: 26rem 1fr;
    grid-template-rows:auto 1fr;
`

function Applayout() {
    return (
        <StyledLayout>
             <Header/>
             <SideBar/>
             <Main>
             <Outlet/>
             </Main>
        </StyledLayout>
    )
}

export default Applayout
