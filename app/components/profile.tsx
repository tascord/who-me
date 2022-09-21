import { Card, Image, Group, Text, Avatar, ThemeIcon, MantineColor, Box, Divider, Textarea } from "@mantine/core";
import { IconBrandGithub, IconBrandTwitter, IconFlag, IconMapPin, IconPin, IconPinned, TablerIcon } from "@tabler/icons";
import { Translator } from "~/translation";
import type { SocialLink, VisibleUser } from "../backend/user.server";

export const bioProps = { readOnly: true, maxLength: 280, wrap: "hard", cols: 20 };

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

export default function Profile({ data }: { data: Omit<VisibleUser, 'id'> }) {
  return (
    <Card withBorder radius="md" p="md" sx={{ width: '40rem', maxWidth: '85vw' }}>
      <Card.Section sx={{ position: 'relative' }}>
        <Image src={data.banner} height={180} />
        <Group px="md" sx={{ position: 'absolute', marginTop: '-2.5rem', width: '100%' }} position="apart">
          <Box id="anc-user" title={Translator.get(data.ring ? 'user.avatar.ring' : 'user.avatar.default', data.username, data.ring?.id ?? '')} sx={{ width: '5rem', height: '5rem', borderRadius: 1000, background: data.ring && `url('https://pride.dev/api/flags/${data.ring.id}/SVG')`, padding: data.ring ? 5 : 0, transform: data.ring && `rotate(${data.ring.rotation}deg)` }}>
            <Avatar src={data.avatar} color="orange" radius={1000} sx={{ width: '100%', height: '100%', transform: data.ring && `rotate(-${data.ring.rotation}deg)` }} />
          </Box>
          <Group>
            {
              Object.entries(data.links).filter(([_, l]) => l !== undefined).map(([type, link]) => (
                <a key={type} href={SocialURLs[type as SocialLink].replace('%s', link!)} target="_blank">
                  <ThemeIcon variant="light" radius="xl" size="lg" color={SocialColours[type as SocialLink]} children={SocialIcons[type as SocialLink]({ size: 16, stroke: 2 })} />
                </a>
              ))
            }
          </Group>
        </Group>
      </Card.Section>

      <Card.Section mt="xl" p="md" pt="xl">
        <Text size="xl" weight={500} children={data.name} />
        <Text size="sm" color="dimmed" weight={500} children={'@' + data.username} />
      </Card.Section>

      <Divider mb={!data.bio ? 24 : 0} />

      {
        data.bio && (
          <Card.Section p="md">
            <Textarea {...bioProps} variant="unstyled" value={data.bio} />
          </Card.Section>
        )
      }

      <Group position="apart" sx={{ width: '100%' }}>
        {
          data.location && (
            <Group mb="sm">
              <Group sx={{ flexWrap: 'nowrap' }} title={Translator.get('user.location', data.location)}>
                <ThemeIcon variant="light" radius="xl" mr="-xs" children={<IconMapPin size={16} />} />
                <Image radius={4} src={`https://countryflagsapi.com/svg/${data.location}`} height={22} />
              </Group>
            </Group>
          )
        }

        {
          data.flags.length && (
            <Group mb="sm">
              <Group sx={{ flexWrap: 'nowrap' }}>
                {
                  data.flags.map(flag => (
                    <Image key={flag} radius={4} title={Translator.get('user.flags.flag', flag)} src={`https://pride.dev/api/flags/${flag}/SVG`} height={22} />
                  ))
                }
                <ThemeIcon variant="light" radius="xl" mr="-xs" title={Translator.get('user.flags')} children={<IconFlag size={16} style={{ transform: 'scaleX(-100%)' }} />} />
              </Group>
            </Group>
          )
        }
      </Group>

    </Card>
  );
}
