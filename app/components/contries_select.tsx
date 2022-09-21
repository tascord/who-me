import { MultiSelectValueProps, Box, CloseButton, SelectItemProps, Image, Select, MultiSelect } from "@mantine/core";
import { forwardRef } from "react";
import { Translator } from "~/translation";

const flag = (flag: string) => <Image radius={4} title={Translator.get('user.flags.flag', flag)} src={`https://countryflagsapi.com/svg/${flag}`} height={22} width={22 * 1.45} />
function Value({ value, label, onRemove, classNames, ...others }: MultiSelectValueProps & { value: string }) {
    const Flag = flag(value);
    return (
        <div {...others}>
            <Box
                sx={(theme) => ({
                    display: 'flex',
                    cursor: 'default',
                    alignItems: 'center',
                    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
                    border: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[4]}`,
                    paddingLeft: 10,
                    borderRadius: 4,
                })}
            >
                <Box mr={10}>
                    {Flag}
                </Box>
                <Box sx={{ lineHeight: 1, fontSize: 12 }}>{label}</Box>
                <CloseButton
                    onMouseDown={onRemove}
                    variant="transparent"
                    size={22}
                    iconSize={14}
                    tabIndex={-1}
                />
            </Box>
        </div>
    );
}

const Item = forwardRef<HTMLDivElement, SelectItemProps>(({ label, value, ...others }, ref) => {
    const Flag = value ? flag(value) : <></>;
    return (
        <div ref={ref} {...others}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box mr={10}>
                    {Flag}
                </Box>
                <div>{label}</div>
            </Box>
        </div>
    );
});

export const SingleCountry = (opts: { countries: any[], [key: string]: any }) => <Select {...opts} itemComponent={Item} searchable clearable data={opts.countries.map(f => ({ label: Translator.get('user.flags.flag', f.name), value: f.id }))} />
export const MultiCountry = (opts: { countries: any[], [key: string]: any }) => <MultiSelect {...opts} itemComponent={Item} valueComponent={Value} searchable clearable data={opts.countries.map(f => ({ label: Translator.get('user.flags.flag', f.name), value: f.id }))} />