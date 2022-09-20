import { Card, Container, Stack, Image, Group, Text, Avatar, ThemeIcon, MantineColor, Box } from "@mantine/core";
import { IconBrandGithub, IconBrandTwitter, TablerIcon } from "@tabler/icons";

type SocialLink = 'twitter' | 'github';
const SocialIcons: { [key in SocialLink]: TablerIcon } = {
  'github': IconBrandGithub,
  'twitter': IconBrandTwitter
}

const SocialURLs: { [key in SocialLink]: string } = {
  'github': 'https://github.com/%s',
  'twitter': 'https://twitter.com/%s'
}

const SocialColours: { [key in SocialLink]: MantineColor } = {
  'github': 'gray',
  'twitter': 'blue'
}

type User = {
  name: string;
  username: string;
  banner?: string;
  avatar: string;
  bio?: string;
  location?: string;
  ring?: {
    id: string,
    rotation: number,
  },
  pronouns: string[];
  links: { [key in SocialLink]: string };
}

const data: User = {
  name: 'flora :3',
  username: 'flora',
  bio: 'i like to code and make things',
  banner: 'https://images.unsplash.com/photo-1649841432772-a6ce266a5019?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  avatar: 'https://avatars.githubusercontent.com/u/35181375?v=4',
  pronouns: [],
  location: 'earth',
  links: {
    twitter: 'tascord',
    github: 'tascord',
  },
  ring: {
    id: 'nonbinary_2014',
    rotation: 45,
  }
}

export default function Index() {
  return (
    <Container fluid>
      <Stack justify="center" align="center" sx={{ height: '100vh' }}>
        <Card withBorder radius="md" p="md" sx={{ width: '40rem', maxWidth: '85vw' }}>
          <Card.Section sx={{ position: 'relative' }}>
            <Image src={data.banner} height={180} />
            <Group px="md" sx={{ position: 'absolute', marginTop: '-2.5rem', width: '100%' }} position="apart">
              <Box id="AV" sx={{ width: '5rem', height: '5rem', borderRadius: 1000, background: data.ring && `url('https://pride.dev/api/flags/${data.ring.id}/SVG')`, padding: data.ring ? 5 : 0, transform: data.ring && `rotate(${data.ring.rotation}deg)` }}>
                <Avatar src={data.avatar} color="orange" radius={1000} sx={{ width: '100%', height: '100%', transform: data.ring && `rotate(-${data.ring.rotation}deg)` }} />
              </Box>
              <Group>
                {
                  Object.entries(data.links).map(([type, link]) => (
                    <a href={SocialURLs[type as SocialLink].replace('%s', link)} target="_blank">
                      <ThemeIcon variant="light" radius="xl" size="lg" color={SocialColours[type as SocialLink]} children={SocialIcons[type as SocialLink]({ size: 16, stroke: 2 })} />
                    </a>
                  ))
                }
              </Group>
            </Group>
          </Card.Section>

          <Card.Section mt="xl" p="md" pt="xl" sx={{ position: 'relative' }}>

            <Text size="lg" weight={500} children={data.name} />
            <Text size="lg" weight={500} children={data.username} />
          </Card.Section>
        </Card>
      </Stack>
    </Container>
  );
}
