import { Container, Stack, Group, Text, Button, TextInput } from "@mantine/core";
import { Form, Link } from "@remix-run/react";
import { Hero } from "~/components/hero";
import { Translator } from "~/translation";

export default function () {
    return (
        <Container fluid>
            <Group position="apart" py="xs" sx={{ height: 32, alignItems: 'center' }}>
                <Text weight={800} size="lg" variant="gradient" gradient={{ from: 'pink', to: 'orange' }}>
                    who, me?
                </Text>

                <Group>
                    <Button variant="light" component={Link} to="/create">{Translator.get('meta.cta.1')}</Button>
                </Group>
            </Group>
            <Form style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Stack justify="center" align="center" sx={{ height: 'calc(100vh - 32px)', width: '40rem', maxWidth: '85vw' }}>
                    <TextInput
                        sx={{ width: '100%' }}
                        label={Translator.get('login.username.label')}
                        description={Translator.get('login.username.description')}
                        placeholder="flora"
                        name="username" />
                    <TextInput
                        sx={{ width: '100%' }}
                        label={Translator.get('login.password.label')}
                        description={Translator.get('login.password.description')}
                        placeholder="••••••••••"
                        type="password"
                        name="password" />

                    <Group sx={{ width: '100%' }} position="apart">
                        <Button sx={{ flex: 1 }} variant="default" children={Translator.get('login.register')} />
                        <Button sx={{ flex: 1 }} children={Translator.get('login.login')} />
                    </Group>
                </Stack>
            </Form>
        </Container >
    )
}