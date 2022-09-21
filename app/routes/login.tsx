import { Container, Stack, Group, Text, Button, TextInput } from "@mantine/core";
import { ActionFunction, redirect } from "@remix-run/node";
import { Form, Link, useActionData } from "@remix-run/react";
import { useEffect, useMemo, useState } from "react";
import { User } from "~/backend/user.server";
import { commitSession, getSession } from "~/session";
import { Translator } from "~/translation";

export const action: ActionFunction = async ({ request }) => {
    const data = await request.formData();

    const method = data.get("method")?.toString();
    const username = data.get("username")?.toString();
    const password = data.get("password")?.toString();

    if (!method || !username || !password) return "meta.error.invalid.fields";

    let user: User;
    try {
        if (method === "login") {
            user = await User.login(username, password);
        } else {
            user = await User.create(username, password);
        }
    } catch (e) {
        return e;
    }

    const session = await getSession(request.headers.get("Cookie"));
    session.set('token', user.token());

    return redirect('/create', {
        headers: {
            'Set-Cookie': await commitSession(session)
        }
    })
}

export default function () {
    const [method, setMethod] = useState<'login' | 'register'>('login');
    const [error, setError] = useState<string>(useActionData() ?? '');

    useMemo(() => {
        setError(useActionData() ?? '');
    }, [useActionData()]);

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
            <Form method="post" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Stack justify="center" align="center" sx={{ height: 'calc(100vh - 32px)', width: '40rem', maxWidth: '85vw' }}>
                    <Text size="lg" weight={600} color="red" children={Translator.get(error)} />
                    <input type="hidden" name="method" value={method} />

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
                        <Button onClick={() => setMethod(method === 'login' ? 'register' : 'login')} sx={{ flex: 1 }} variant="default" children={Translator.get(method === 'login' ? 'login.register.alt' : 'login.login.alt')} />
                        <Button type="submit" sx={{ flex: 1 }} children={Translator.get(method === 'login' ? 'login.login' : 'login.register')} />
                    </Group>
                </Stack>
            </Form>
        </Container >
    )
}