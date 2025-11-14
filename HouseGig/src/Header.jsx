import './Header.css';
import {Group, Button, TextInput, Flex, Box} from '@mantine/core';
import { IconSearch, IconHome, IconUser, IconBookmark, IconSettings } from '@tabler/icons-react';
import { Link, useNavigate } from "react-router-dom";
import { useRef, useEffect } from "react";

function Header(){
    const headerRef = useRef(null);
    const lastScrollY = useRef(window.scrollY);

    useEffect(() => {
        const handleScroll = () => {
            if (!headerRef.current) return;
            if (window.scrollY > lastScrollY.current && window.scrollY > 60) {
                headerRef.current.style.transform = "translateY(-100%)";
            } else {
                headerRef.current.style.transform = "translateY(0)";
            }
            lastScrollY.current = window.scrollY;
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return(
        <header className="header" ref={headerRef}>
            <Flex justify="space-between" align="center" style={{ width: "100%" }}>
                <Group gap="xs">
                    <Link to="/">
                        <Button variant="subtle" size="md" className="header-btn" aria-label="Home">
                            <IconHome size={22} />
                        </Button>
                    </Link>
                    <Link to="/">
                        <Button variant="subtle" size="md" className="header-btn" aria-label="Explore">
                            Explore
                        </Button>
                    </Link>
                </Group>
                <Box style={{ flex: 1, maxWidth: 400, margin: "0 1rem" }}>
                    <TextInput
                        placeholder="Search listings..."
                        leftSection={<IconSearch size={18} />}
                        size="md"
                        radius="md"
                        className="header-search"
                    />
                </Box>
                <Group gap="xs">
                    <Link to="/collections">
                        <Button
                            variant="subtle"
                            size="md"
                            className="header-btn"
                            aria-label="Collections"
                        >
                            <IconBookmark size={22} />
                        </Button>
                    </Link>
                    <Link to="/dashboard">
                        <Button
                            variant="subtle"
                            size="md"
                            className="header-btn"
                            aria-label="Dashboard"
                        >
                            <IconSettings size={22} />
                        </Button>
                    </Link>
                    <Link to="/profile">
                        <Button
                            variant="subtle"
                            size="md"
                            className="header-btn"
                            aria-label="Profile"
                        >
                            <IconUser size={22} />
                        </Button>
                    </Link>
                    <Link to="/auth">
                        <Button
                            variant="subtle"
                            size="md"
                            className="header-btn"
                            aria-label="Login/Register"
                        >
                            Login
                        </Button>
                    </Link>
                </Group>
            </Flex>
        </header>
    );
}

export default Header;