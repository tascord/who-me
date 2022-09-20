import { createStyles, Image, Container, Title, Button, Group, Text, List, ThemeIcon } from '@mantine/core';
import { Link } from '@remix-run/react';
import { IconBrandGithub, IconCheck } from '@tabler/icons';

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
                            A space <br /> <Text component='span' className={classes.highlight}>tailor made</Text> for someone like you
                        </Title>
                        <Text color="dimmed" mt="md">
                            make a profile that's as unique as you are, display all your favourite things, and share your most real self with the world.
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
                                <b>Anonymous</b>&nbsp;– we don't store nor really care about any personal information, so you can be yourself freely.
                            </List.Item>
                            <List.Item>
                                <b>Free + open source</b>&nbsp;– never pay for anything, and feel free to change things you don't like
                            </List.Item>
                        </List>

                        <Group mt={30}>
                            <Button component={Link} to="/create" radius="xl" size="md" className={classes.control}>
                                Create
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