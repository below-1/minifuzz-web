const CONS = [0, 1, 2, 3, 4, 5];
export function Triangle(a, b, c) {
    return (x) => {
        if (x <= a || x >= c)
            return 0;
        if (x > a && x <= b)
            return (x - a) / (b - a);
        if (x >= b && x < c)
            return (b - x) / (c - b);
        throw new Error(`x is not covered: ${x}, (${a}, ${b}, ${c})`);
    };
}
export function ConsTriangle(a, b, c) {
    return {
        f: (x) => {
            if (x <= a || x >= c)
                return 0;
            if (x > a && x < b)
                return (x - a) / (b - a);
            if (x >= b && x < c)
                return (b - x) / (c - b);
            throw new Error(`x is not covered: ${x}, (${a}, ${b}, ${c})`);
        },
        _f: (y) => {
            const result = [(y * (b - a)) + a,
                 b - (y * (c - b))]
            return result
        },
        _percentage: (x) => {
            return (x - a) * 1.0 / (b - a);
        }
    };
}
export function ConsLeftTrap(a, b) {
    return {
        f: (x) => {
            if (x >= b)
                return 0;
            if (x > a && x < b)
                return (b - x) / (b - a);
            if (x <= a)
                return 1;
            throw new Error(`x is not covered: ${x}`);
        },
        _f: (y) => {
            return [
                -1 * ((y * (b - a)) - b)
            ];
        }
    };
}
export function ConstRightTrap(a, b) {
    return {
        f: (x) => {
            if (x <= a)
                return 0;
            if (x > a && x < b)
                return (x - a) / (b - a);
            if (x >= b)
                return 1;
            throw new Error(`x is not covered: ${x}`);
        },
        _f: (y) => {
            return [
                (y * (b - a)) + a
            ];
        }
    };
}
export function LeftTrap(a, b) {
    return (x) => {
        if (x >= b)
            return 0;
        if (x > a && x < b)
            return (b - x) / (b - a);
        if (x <= a)
            return 1;
        throw new Error(`x is not covered: ${x}`);
    };
}
export function RightTrap(a, b) {
    return (x) => {
        if (x <= a)
            return 0;
        if (x > a && x < b)
            return (x - a) / (b - a);
        if (x >= b)
            return 1;
        throw new Error(`x is not covered: ${x}`);
    };
}
function mapCrisp(mems, x) {
    return [
        mems[0](x),
        mems[1](x),
        mems[2](x)
    ];
}
export const meta = [
    [
        LeftTrap(5, 15),
        Triangle(10, 20, 30),
        RightTrap(25, 35)
    ],
    [
        LeftTrap(1, 4),
        Triangle(2, 5, 8),
        RightTrap(6, 9)
    ],
    [
        LeftTrap(1, 5),
        Triangle(3, 5, 7),
        RightTrap(5, 9)
    ],
    [
        LeftTrap(3, 5),
        Triangle(3, 6, 9),
        RightTrap(7, 9)
    ],
    [
        LeftTrap(3, 5),
        Triangle(3, 6, 9),
        RightTrap(7, 9)
    ],
    [
        LeftTrap(3, 5),
        Triangle(3, 6, 9),
        RightTrap(7, 9)
    ],
    [
        LeftTrap(1, 5),
        Triangle(3, 5, 7),
        RightTrap(5, 9)
    ],
    [
        Triangle(10000, 100000, 200000),
        Triangle(100000, 350000, 600000),
        RightTrap(500000, 900000)
    ]
];
export const consMeta = [
    ConsTriangle(9, 21, 28),
    ConsTriangle(21, 35, 42),
    ConsTriangle(35, 49, 56),
    ConsTriangle(49, 63, 70),
    ConsTriangle(63, 77, 84),
    ConstRightTrap(77, 87)
];
export function buildFuzzier(meta) {
    return function (xs) {
        if (xs.length != meta.length) {
            throw new Error(`length do not match: xs.length=${xs.length}, meta.length=${meta.length}`);
        }
        return xs.map((x, index) => {
            const mem = meta[index];
            const fuzzVal = mapCrisp(mem, x);
            return fuzzVal;
        });
    };
}
export function ruleStrength(predicate, input) {
    if (predicate.length != input.length) {
        throw new Error('length not equal: rule.length=${rule.length}, input.length=${input.length}');
    }
    const vals = predicate.map((r, index) => {
        const result = input[index][r];
        // Fail hard upon INDEX_OUT_OF_BOUND
        if (result === undefined) {
            throw new Error(`INDEX_OUT_OF_BOUND: r=${r}`);
        }
        return result;
    });
    // possible INFINITY
    // return vals.filter(v => v > 0).reduce((a, b) => a + b) / vals.length
    return Math.min(...vals.filter(v => v > 0));
}
export function imply(rules, input) {
    let group = new Map();
    CONS.forEach(c => {
        group.set(c, null);
    });
    rules.forEach(r => {
        const vals = r.predicate.map((k, index) => {
            const result = input[index][k];
            // Fail hard upon INDEX_OUT_OF_BOUND
            if (result === undefined) {
                throw new Error(`INDEX_OUT_OF_BOUND: r=${r}`);
            }
            return result;
        })
        let strength = ruleStrength(r.predicate, input);
        console.log(`P(${r.predicate}), ${vals} -> ${strength}`)
        const ruleInfo = Object.assign(Object.assign({}, r), { strength });
        if (!isFinite(strength)) {
            return;
        }
        const oldMax = group.get(r.consequence);
        if (!oldMax || (ruleInfo.strength > oldMax.strength)) {
            group.set(ruleInfo.consequence, ruleInfo);
        }
    });
    console.log('group')
    console.log(group)
    const filtered = Array.from(group.entries())
        .map(pair => pair[1])
        .filter(ri => ri !== null);
    return filtered;
}
export function calcConfidence(ri, maxStrength) {
    const consequence = ri.consequence;
    const xs = consMeta[consequence]._f(maxStrength);
    // console.log(`consequence: ${ri.consequence}`)
    // console.log(xs)
    const midPoint = xs.reduce((a, b) => a + b, 0) / xs.length;
    // const conf = consMeta[consequence]._percentage(midPoint)
    // console.log('midPoint = ', midPoint)
    // console.log(midPoint)
    const result = consMeta[consequence].f(midPoint);
    console.log('result')
    console.log(result)
    return {
        confidence: result * 100,
        consequence
    };
}

export function defuzz(ruleInfos) {
    if (ruleInfos.length == 0) {
        throw new Error('EMPTY_RULE_INFOS');
    }
    const maxStrength = Math.max(...ruleInfos.map(ri => ri.strength));
    const rounded = parseFloat(maxStrength.toPrecision(2))
    return ruleInfos.map(ruleInfo => calcConfidence(ruleInfo, rounded));
}
