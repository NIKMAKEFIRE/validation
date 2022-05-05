import React, { useContext } from 'react'
import { Navbar, Container, Nav, NavbarBrand, NavLink } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../App';

const NavbarMenu = ({state}) => {
    const { user, setUser } = useContext(UserContext);
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand>React-Тестовое</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Регистрация</Nav.Link>
                        <Nav.Link as={Link} to="/login">Логин</Nav.Link>
                        {
                            user.loggedIn
                            ? <Nav.Link as={Link} to="/password">Сменить пароль</Nav.Link> 
                            : null
                        }
                    </Nav>
                    {
                            user.loggedIn
                            ?  <h6>{`Добро пожаловать: ${state.email}`}</h6>
                            : null
                        }
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavbarMenu