import { Container, Stack, Group, Text, Button } from "@mantine/core";
import { Link } from "@remix-run/react";
import { Hero } from "~/components/hero";
import { Translator } from "~/translation";

export default function () {
    return (
        <Container fluid>
            <Group position="apart" py="xs" sx={{ height: 32, alignItems: 'center' }}>
                <Text weight={800} size="lg" variant="gradient" gradient={{from: 'pink', to: 'orange'}}>
                    who, me?
                </Text>

                <Group>
                    <Button variant="light" component={Link} to="/create">{Translator.get('meta.cta.1')}</Button>
                </Group>
            </Group>
            <Stack justify="center" align="center" sx={{ height: 'calc(100vh - 32px)' }}>
                <Hero />
            </Stack>
        </Container>
    )
}