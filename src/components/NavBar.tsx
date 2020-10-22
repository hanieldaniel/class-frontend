import { Box, Button, Flex, Link } from '@chakra-ui/core';
import React from 'react'
import NextLink from "next/link";
import { useMeQuery } from '../generated/graphql';
// import { withCookies, Cookies } from "react-cookie";



interface NavBarProps {

}



export const NavBar: React.FC<NavBarProps> = ({ }) => {
    const [{ data, fetching }] = useMeQuery();
    let body = null;


    // const cookies = new Cookies();

    // logout User
    function logout() {
        document.cookie.split(";").forEach((c) => {
            document.cookie = c
                .replace(/^ +/, "")
                .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
        });
        window.location.href = '/';
    }


    if (fetching) {
        body = null;
    } else if (!data?.me) {
        body = (
            <>
                <NextLink href="/login">
                    <Link mr={4}>Login</Link>
                </NextLink>
                <NextLink href="/register">
                    <Link>Register</Link>
                </NextLink>
            </>
        );
    } else {
        body = (
            <Flex>
                <Box mr={4}> {data.me.username} <small> {data.me.usertype} User</small></Box>
                <Button variant="link" onClick={logout}>Logout</Button>
            </Flex>
        )
    }

    return (
        <Flex bg='tan' p={4} >
            <Box ml={'auto'}>
                {body}
            </Box>
        </Flex>
    );
}