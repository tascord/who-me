import { Button, Container, Group, Stack, Text } from "@mantine/core";
import { LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { User, VisibleUser } from "~/backend/user.server";
import { Translator } from "~/translation";
import Profile from "~/components/user";

export const loader: LoaderFunction = ({ params }) => new Promise(r => User.get(params.id!).then(r).catch(() => r(null)));

export default function () {

    const user = useLoaderData() as VisibleUser | null;

    if (!user) return (
        <Container fluid>
            <Group position="apart" py="xs" sx={{ height: 32, alignItems: 'center' }}>
                <Text weight={800} size="lg" variant="gradient" gradient={{ from: 'pink', to: 'orange' }}>
                    who, me?
                </Text>

                <Group>
                    <Button variant="light" component={Link} to="/create">{Translator.get('meta.cta.1')}</Button>
                </Group>
            </Group>
            <Stack justify="center" align="center" sx={{ height: 'calc(100vh - 32px)' }}>
                <Text sx={{ fontSize: '15rem', fontWeight: 900, opacity: 0.075, marginBottom: -84 }}>404</Text>
                <Text size="xl" children={Translator.get('meta.error.404.title')} />
                <Button component={Link} to="/" children={Translator.get('meta.error.404.button')} />
            </Stack>
        </Container>
    )

    return (
        <Container fluid>
            <Stack justify="center" align="center" sx={{ height: '100vh' }}>
                <Profile data={{
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