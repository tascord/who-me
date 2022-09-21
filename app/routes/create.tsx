import { Container, Divider, FileInput, MultiSelect, NumberInput, Paper, ScrollArea, Select, Stack, Text, Textarea, TextInput } from "@mantine/core";
import { LoaderFunction, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useMemo, useState } from "react";
import { User, VisibleUser } from "~/backend/user.server";
import { commitSession, getSession } from "~/session";
import { Translator } from "~/translation";
import Profile, { bioProps } from "~/components/profile";
import { MultiPride, SinglePride } from "~/components/pride_select";
import { SingleCountry } from "~/components/contries_select";

const SAFE_ECHO = false;

export const loader: LoaderFunction = async ({ request }) => {
    const session = await getSession(request.headers.get("Cookie"));
    if (!session.has('token')) return redirect('/login');

    try {
        return (await User.fromToken(session.get('token') ?? '')).visible();
    } catch (e) {
        session.unset('token');
        return redirect('/login', {
            headers: {
                'Set-Cookie': await commitSession(session)
            }
        })
    }
}

export default function () {

    const [prides, setPrides] = useState<{ id: string, name: string }[]>([]);
    const [countries, setCountries] = useState<{ id: string, name: string }[]>([]);

    useMemo(async () => {
        setPrides(await fetch('/flags.json').then(res => res.json()));
        setCountries(await fetch('/countries.json').then(res => res.json()));
    }, [])


    const [user, setUser] = useState<VisibleUser>(useLoaderData() as any);
    function set_safe(path: string, value: any) {

        if (SAFE_ECHO) console.log(`<SET_SAFE> :: IN:`, { ...user }, `, PATH:`, path, `, VALUE:`, value);

        let mod = { ...user } as any;
        let parent = mod;
        const splits = path.split('.');

        for (let i = 0; i < splits.length; i++) {

            let sub_path = splits[i];
            if (parent[sub_path] === undefined) parent[sub_path] = {};
            if (i === splits.length - 1) parent[sub_path] = value;
            else parent = parent[sub_path];

        }

        console.log(mod);
        setUser(mod);
    }

    function get_safe(path: string): undefined | any {

        let parent = { ...user } as any;
        for (let sub_path of path.split('.')) {

            if (!parent[sub_path]) return undefined;
            parent = parent[sub_path];

        }

        if (SAFE_ECHO) console.log(`<GET_SAFE_RETURN> :: IN: `, { ...user }, `, PATH: `, path, `, VALUE: `, parent);
        return parent;
    }

    const bind = (key: keyof VisibleUser | string, raw: boolean = false) => ({
        value: get_safe(key),
        onChange: (e: any) => set_safe(key, raw ? e : e.currentTarget.value)
    })

    const bindImage = (key: keyof VisibleUser) => ({
        ...bind(key),
        accept: "image/png,image/jpeg",
        onChange: (f: File | null) => set_safe(key, f ? URL.createObjectURL(f) : '')
    })

    useMemo(() => console.log(user), [user]);

    return (
        <Container fluid sx={{ display: 'flex', flexWrap: 'nowrap' }}>
            <Paper px="lg" py="sm" sx={{ height: '100vh', width: '20rem', marginLeft: -16, borderTop: 'none', borderBottom: 'none', borderLeft: 'none', position: 'fixed' }} withBorder>
                <Stack>
                    <Text children={Translator.get('editor.title')} />
                    <Divider mb="-xs" />
                    <ScrollArea sx={{ height: '100vh' }}>
                        <Stack>
                            <TextInput label={Translator.get('editor.field.name')} {...bind('name')} />
                            <TextInput label={Translator.get('editor.field.username')} {...bind('username')} />
                            <FileInput label={Translator.get('editor.field.avatar')} {...bindImage('avatar')} />
                            <FileInput label={Translator.get('editor.field.banner')} {...bindImage('banner')} />
                            <SinglePride label={Translator.get('editor.field.ring.label')} {...bind('ring.id', true)} flags={prides} />
                            <NumberInput label={Translator.get('editor.field.ring.rotation')} {...bind('ring.rotation', true)} min={0} max={360} />
                            <SingleCountry label={Translator.get('editor.field.country')} {...bind('location', true)} countries={countries} />
                            <MultiPride label={Translator.get('editor.field.flags')} {...bind('flags', true)} flags={prides} max={4} />
                            <Textarea label={Translator.get('editor.field.bio')} {...bioProps} {...bind('bio')} readOnly={false} sx={{ height: 'fit-content' }} />
                        </Stack>
                    </ScrollArea>
                </Stack>
            </Paper>
            <Stack justify="center" align="center" pl="xl" sx={{ marginLeft: '20rem', height: '100vh', width: '100%' }}>
                <Profile data={user} />
            </Stack>
        </Container>
    )
}