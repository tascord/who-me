import { LoaderFunction } from "@remix-run/node";
import { existsSync, readFileSync } from "fs";
import { join } from "path";
import { parse } from "csv-parse";

export const loader: LoaderFunction = ({ params }) => new Promise((resolve) => {
    const { locale } = params;

    let location = join(__dirname, '../translations/out/' + locale + '.csv');
    if (!existsSync(location)) location = join(__dirname, '../translations/source.csv');

    return parse(readFileSync(location, 'utf-8'), (e, d) => {
        if (e) throw e;
        resolve(
            d.slice(1, d.length)
                .map(([key, translation]: [string, string]) => ({ key, translation }))
        );
    });
})