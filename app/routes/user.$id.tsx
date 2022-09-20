import { Container, Stack } from "@mantine/core";
import User from "~/components/user";

export default function () {
    return (
        <Container fluid>
            <Stack justify="center" align="center" sx={{ height: '100vh' }}>
                <User data={{
                    name: 'flora :3',
                    username: 'flora',
                    banner: 'https://images.unsplash.com/photo-1649841432772-a6ce266a5019?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
                    avatar: 'https://avatars.githubusercontent.com/u/35181375?v=4',
                    pronouns: ['she', 'her'],
                    flags: ['nonbinary_2014', 'transgender_1999', 'bisexual_1998'],
                    location: 'australia',
                    links: { twitter: 'tascord', github: 'tascord', },
                    ring: { id: 'nonbinary_2014', rotation: 45, },
                    color: ''
                }} />
            </Stack>
        </Container>
    )
}