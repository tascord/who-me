class TranslationCache {
    private _cache: { key: string, translation: string }[] = [];

    public get(key: string, ...args: string[]): string {
        const translation = this._cache.find(k => k.key === key)?.translation;
        if (!translation) return key;
        return translation.replace(/%s/g, () => title(args.shift() ?? ''));
    }

    public set_locale(locale: string) {
        return new Promise<void>(resolve => {
            fetch(`/trans/${locale}`)
                .then(res => res.json())
                .then(data => this._cache = data)
                .catch(e => {
                    console.log(e);
                    alert('Unable to load translations.');
                })
                .finally(resolve);
        })
    }
}

export const Translator = new TranslationCache();
export default function Translate({ children, args }: { children: string, args?: string[] }) {
    return <>{Translator.get(children, ...args ?? [])}</>;
}

export const title = (text: string) => {
    return text.split(/[_\-. ]/g).map(word => word[0].toUpperCase() + word.slice(1)).join(' ');
}