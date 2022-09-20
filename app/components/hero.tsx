import { createStyles, Image, Container, Title, Button, Group, Text, List, ThemeIcon } from '@mantine/core';
import { Link } from '@remix-run/react';
import { IconBrandGithub, IconCheck } from '@tabler/icons';
import Translate, { Translator } from '~/translation';

const useStyles = createStyles((theme) => ({
    inner: {
        display: 'flex',
        justifyContent: 'space-between',
        paddingTop: theme.spacing.xl * 4,
        paddingBottom: theme.spacing.xl * 4,
    },

    content: {
        maxWidth: 480,
        marginRight: theme.spacing.xl * 3,

        [theme.fn.smallerThan('md')]: {
            maxWidth: '100%',
            marginRight: 0,
        },
    },

    title: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        fontSize: 44,
        lineHeight: 1.2,
        fontWeight: 900,

        [theme.fn.smallerThan('xs')]: {
            fontSize: 28,
        },
    },

    control: {
        [theme.fn.smallerThan('xs')]: {
            flex: 1,
        },
    },

    image: {
        flex: 1,

        [theme.fn.smallerThan('lg')]: {
            display: 'none',
        },
    },

    highlight: {
        position: 'relative',
        backgroundColor: theme.fn.variant({ variant: 'light', color: 'pink' }).background,
        background: `linear-gradient(45deg, ${theme.colors.pink[4]}aa 0%, ${theme.colors.orange[4]}aa 100%)`,
        borderRadius: theme.radius.sm,
        padding: '4px 12px',
    },
}));

export function Hero() {
    const { classes } = useStyles();
    return (
        <div>
            <Group>
                <div className={classes.inner}>
                    <div className={classes.content}>
                        <Title className={classes.title}>
                            {
                                Translator.get('meta.hero.catch.1')
                                    .split(/[\[\]]/)
                                    .map((part, index) => (index % 2 === 0 ? part : <Text component='span' className={classes.highlight}>{part}</Text>))
                            }
                        </Title>
                        <Text color="dimmed" mt="md">
                            <Translate children="meta.hero.catch.2" />
                        </Text>

                        <List
                            mt={30}
                            spacing="sm"
                            size="sm"
                            sx={{ width: '45rem' }}
                            icon={
                                <ThemeIcon size={20} radius="xl">
                                    <IconCheck size={12} stroke={1.5} />
                                </ThemeIcon>
                            }
                        >
                            <List.Item>
                                <b><Translate children="meta.hero.feature.1.title" /></b>&nbsp;–
                                <Translate children="meta.hero.feature.1.text" />
                            </List.Item>
                            <List.Item>
                                <b><Translate children="meta.hero.feature.2.title" /></b>&nbsp;–
                                <Translate children="meta.hero.feature.2.text" />
                            </List.Item>
                        </List>

                        <Group mt={30}>
                            <Button component={Link} to="/create" radius="xl" size="md" className={classes.control}>
                                <Translate children="meta.cta.1" />
                            </Button>
                            <Button component="a" href="https://github.com/tascord/who-me" target="_blank" variant="default" radius="xl" size="md" className={classes.control}>
                                <IconBrandGithub />
                            </Button>
                        </Group>
                    </div>
                    <Image src="/images/trip.svg" className={classes.image} />
                </div>
            </Group>
        </div>
    );
}