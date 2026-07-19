import { hexFromArgb, type TonalPalette } from "@material/material-color-utilities"
import { StringUtil } from "../utils/string-util"
import { DefaultPaletteTones, MaterialPalette } from "./material-palette.service"

type ThemeObject = Record<string, unknown>;

type ThemePaletteName =
    | "primaryPalette"
    | "secondaryPalette"
    | "tertiaryPalette"
    | "errorPalette"
    | "neutralPalette"
    | "neutralVariantPalette";

export type PaletteSelectorFamilyName = "primary" | "secondary" | "tertiary" | "error" | "neutral" | "neutral-variant";

export type PaletteSelector = {
    family: PaletteSelectorFamilyName;
    tone?: number;
};

type ThemePalettes = Partial<Record<ThemePaletteName, Pick<TonalPalette, "tone">>>;

type ThemeEntry = {
    normalizedKey: string;
    cssKey: string;
    lightValue: string;
    darkValue: string;
};

type PaletteEntry = {
    normalizedKey: string;
    cssKey: string;
    value: string;
};

const DefaultCssPrefix = "--md-sys-color-";
const DefaultCssPalettePrefix = "--md-sys-ref-";

type PrefixConfig = {
    theme: { css: string };
    palette: { css: string };
};

function resolvePrefixConfig(varPrefix?: string, isCustomPalette?: boolean): PrefixConfig {
    if (varPrefix === undefined || varPrefix.length === 0) {
        return {
            theme: { css: DefaultCssPrefix },
            palette: { css: DefaultCssPalettePrefix },
        };
    }

    const normalized = varPrefix.replace(/^-+/u, "").replace(/-+$/u, "");
    const prefix = normalized.length > 0 ? `${normalized}-` : "";
    const cssDashPrefix = `--${prefix}`;

    if (isCustomPalette) {
        return {
            theme: { css: `${cssDashPrefix}color-` },
            palette: { css: cssDashPrefix },
        };
    }

    return {
        theme: { css: cssDashPrefix },
        palette: { css: cssDashPrefix },
    };
}

const ThemePaletteOrder: ThemePaletteName[] = [
	"primaryPalette",
	"secondaryPalette",
	"tertiaryPalette",
	"errorPalette",
	"neutralPalette",
	"neutralVariantPalette",
];

export class Serialization {
    private constructor() { }

    public static ToCSS(args: {
        lightObject       : ThemeObject;
        darkObject        : ThemeObject;
        includeTheme     ?: boolean;
        palettes         ?: ThemePalettes;
        paletteWhiteList ?: PaletteSelector[];
        paletteBlackList ?: PaletteSelector[];
        paletteTones     ?: number[];
        varPrefix        ?: string;
        customPaletteName?: string;
        isCustomPalette  ?: boolean;
    }) {
        const includeTheme = args.includeTheme !== false;
        const prefix = resolvePrefixConfig(args.varPrefix, args.isCustomPalette);
        const themeEntries = this.normalizeThemeEntries(args.lightObject, args.darkObject, prefix);
        const paletteEntries = this.normalizePaletteEntries(args.palettes, args.paletteTones, args.paletteWhiteList, args.paletteBlackList, prefix, args.customPaletteName);

        return this.toCss(themeEntries, paletteEntries, includeTheme);
    }

    private static normalizeThemeEntries(lightObject: ThemeObject, darkObject: ThemeObject, prefix: PrefixConfig): ThemeEntry[] {
        const lightEntries = this.normalizeThemeObject(lightObject, "lightObject");
        const darkEntries = this.normalizeThemeObject(darkObject, "darkObject");

        if (lightEntries.size !== darkEntries.size) {
            throw new TypeError(this.buildKeyMismatchMessage(lightEntries, darkEntries));
        }

        const lightKeys = [...lightEntries.keys()];
        const darkKeys = new Set(darkEntries.keys());

        const missingInDark = lightKeys.filter((key) => !darkKeys.has(key));
        const missingInLight = [...darkEntries.keys()].filter((key) => !lightEntries.has(key));

        if (missingInDark.length > 0 || missingInLight.length > 0) {
            throw new TypeError(this.buildKeyMismatchMessage(lightEntries, darkEntries));
        }

        return lightKeys.map((normalizedKey) => {
            const lightValue = lightEntries.get(normalizedKey) as string;
            const darkValue = darkEntries.get(normalizedKey) as string;

            return {
                normalizedKey,
                cssKey: `${prefix.theme.css}${normalizedKey}`,
                lightValue,
                darkValue,
            };
        });
    }

    private static normalizePaletteEntries(palettes?: ThemePalettes, paletteTones?: number[], paletteWhiteList?: PaletteSelector[], paletteBlackList?: PaletteSelector[], prefix?: PrefixConfig, customPaletteName?: string) {
        if (palettes === undefined) {
            return [];
        }

        const tones = this.normalizePaletteTones(paletteTones);
        const whiteList = this.normalizePaletteSelectors(paletteWhiteList);
        const blackList = this.normalizePaletteSelectors(paletteBlackList);
        const paletteEntries: PaletteEntry[] = [];
        const palPrefix = prefix ?? resolvePrefixConfig();

        for (const paletteName of ThemePaletteOrder) {
            const palette = palettes[paletteName];

            if (palette === undefined) {
                continue;
            }

            const normalizedPaletteName = this.toPaletteTokenName(paletteName);

            for (const toneEntry of MaterialPalette.Create({ palette, tones })) {
                if (whiteList !== undefined && customPaletteName === undefined && !whiteList.some((selector) => this.matchesPaletteSelector(selector, normalizedPaletteName, toneEntry.tone))) {
                    continue;
                }

                if (blackList !== undefined && customPaletteName === undefined && blackList.some((selector) => this.matchesPaletteSelector(selector, normalizedPaletteName, toneEntry.tone))) {
                    continue;
                }

                const normalizedKey = customPaletteName !== undefined
                    ? `${String(toneEntry.tone)}`
                    : `${normalizedPaletteName}-${toneEntry.tone}`;
                const value = hexFromArgb(toneEntry.color);

                paletteEntries.push({
                    normalizedKey,
                    cssKey: `${palPrefix.palette.css}${normalizedKey}`,
                    value,
                });
            }
        }

        return paletteEntries;
    }

    private static normalizePaletteSelectors(values?: PaletteSelector[]) {
        if (values === undefined || values.length === 0) {
            return undefined;
        }

        return values.map((value) => this.normalizePaletteSelector(value));
    }

    private static normalizePaletteSelector(selector: PaletteSelector): PaletteSelector {
        const family = this.normalizePaletteSelectorFamily(selector.family);

        if (selector.tone === undefined) {
            return { family };
        }

        return {
            family,
            tone: this.normalizePaletteTone(selector.tone),
        };
    }

    private static normalizePaletteSelectorFamily(value: string) {
        const normalizedValue = StringUtil.ToKebabCase(value).replace(/^palette-/u, "");

        if (
            normalizedValue !== "primary" &&
            normalizedValue !== "secondary" &&
            normalizedValue !== "tertiary" &&
            normalizedValue !== "error" &&
            normalizedValue !== "neutral" &&
            normalizedValue !== "neutral-variant"
        ) {
            throw new TypeError(`Serialization: unsupported palette family "${value}".`);
        }

        return normalizedValue as PaletteSelectorFamilyName;
    }

    private static matchesPaletteSelector(selector: PaletteSelector, family: string, tone: number) {
        return selector.family === family && (selector.tone === undefined || selector.tone === tone);
    }

    private static normalizePaletteTones(tones?: number[]) {
        if (tones === undefined) {
            return [...DefaultPaletteTones];
        }

        if (tones.length === 0) {
            throw new TypeError("Serialization: paletteTones cannot be empty.");
        }

        const normalizedTones = [...new Set(tones.map((tone) => this.normalizePaletteTone(tone)))];

        return normalizedTones.sort((left, right) => left - right);
    }

    private static normalizePaletteTone(tone: number) {
        if (!Number.isFinite(tone) || !Number.isInteger(tone) || tone < 0 || tone > 100) {
            throw new TypeError("Serialization: paletteTones must be integers between 0 and 100.");
        }

        return tone;
    }

    private static normalizeThemeObject(object: ThemeObject, label: "lightObject" | "darkObject") {
        if (!this.isPlainObject(object)) {
            throw new TypeError(`Serialization: ${label} must be a plain object.`);
        }

        const symbolKeys = Object.getOwnPropertySymbols(object);

        if (symbolKeys.length > 0) {
            throw new TypeError(`Serialization: ${label} cannot contain symbol keys.`);
        }

        const normalized = new Map<string, string>();

        for (const [key, value] of Object.entries(object)) {
            const normalizedKey = StringUtil.ToKebabCase(key);

            if (!normalizedKey) {
                throw new TypeError(`Serialization: ${label} key "${key}" normalizes to an empty name.`);
            }

            if (normalized.has(normalizedKey)) {
                throw new TypeError(`Serialization: duplicate normalized key "${normalizedKey}".`);
            }

            normalized.set(normalizedKey, this.toColorValue(value, `${label} key "${key}"`));
        }

        return new Map([...normalized.entries()].sort(([left], [right]) => left.localeCompare(right)));
    }

    private static toPaletteTokenName(paletteName: ThemePaletteName) {
        return StringUtil.ToKebabCase(paletteName.replace(/Palette$/u, ""));
    }

    private static toColorValue(value: unknown, context: string) {
        if (typeof value === "number") {
            if (!Number.isFinite(value) || !Number.isInteger(value)) {
                throw new TypeError(`Serialization: ${context} must be an integer ARGB color value.`);
            }

            return hexFromArgb(value);
        }

        if (typeof value === "string") {
            const normalized = value.trim();

            if (normalized.length === 0) {
                throw new TypeError(`Serialization: ${context} cannot be an empty string.`);
            }

            return normalized;
        }

        throw new TypeError(`Serialization: ${context} must be a string or ARGB number.`);
    }

    private static isPlainObject(value: unknown): value is ThemeObject {
        if (value === null || typeof value !== "object" || Array.isArray(value)) {
            return false;
        }

        const prototype = Object.getPrototypeOf(value);

        return prototype === Object.prototype || prototype === null;
    }

    private static buildKeyMismatchMessage(lightEntries: Map<string, string>, darkEntries: Map<string, string>) {
        const missingInDark = [...lightEntries.keys()].filter((key) => !darkEntries.has(key));
        const missingInLight = [...darkEntries.keys()].filter((key) => !lightEntries.has(key));

        return `Serialization: lightObject and darkObject must contain the same normalized keys. Missing in darkObject: ${missingInDark.length > 0 ? missingInDark.join(", ") : "none"}; missing in lightObject: ${missingInLight.length > 0 ? missingInLight.join(", ") : "none"}.`;
    }

    private static toCss(themeEntries: ThemeEntry[], paletteEntries: PaletteEntry[], includeTheme: boolean) {
        if (includeTheme && themeEntries.length === 0 && paletteEntries.length === 0) {
            return `:root {\n}\n`;
        }

        const declarations = [
            ...(includeTheme ? themeEntries.map((entry) => `    ${entry.cssKey}: light-dark(${entry.lightValue}, ${entry.darkValue});`) : []),
            ...paletteEntries.map((entry) => `    ${entry.cssKey}: ${entry.value};`),
        ];

        if (declarations.length === 0) {
            return `:root {\n}\n`;
        }

        return `:root {\n${declarations.join("\n")}\n}\n`;
    }

}
