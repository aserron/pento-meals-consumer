const consoleStyles = {
    info: [
        'color:lightblue',
        'font-weight: bold',
        'font-size: larger'
    ],
    use: [
        'color:lightgreen',
        'font-weight: bold',
        'font-size: larger',
        "line-height   : 3em",
                "text-align    : center",
                "vertical-align: middle",
                "height        : fit-content",
    ],
    extra: [
        "line-height   : 3em",
        "text-align    : center",
        "vertical-align: middle",
        "height        : fit-content",
    ]
}

export type ConsoleStyles = { [k in keyof typeof consoleStyles]?: string };

type P = keyof ConsoleStyles;

interface K extends Partial<ConsoleStyles>{};
const mod: K = {};

Object.getOwnPropertyNames(consoleStyles)
    .forEach((prop: string) => {
        const idx = prop as P;
        mod[idx] = consoleStyles[idx].join(';');
    })
export default mod;
