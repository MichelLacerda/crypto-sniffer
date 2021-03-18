const stringfyModel = (symbol, last, volume, high, low, priceChange, variation) => `${symbol};${last};${volume};${high};${low};${priceChange};${variation}`;
const stringfy = (data) =>
    data.map((e) => {
        return stringfyModel(e.symbol, e.last, e.volume, e.high, e.low, e.priceChange, e.variation);
    });

const unstringfy = (values) =>
    values.map((e) => {
        var row = e.split(";");
        return {
            symbol: row[0],
            last: parseFloat(row[1]),
            volume: parseFloat(row[2]),
            high: parseFloat(row[3]),
            low: parseFloat(row[4]),
            priceChange: parseFloat(row[5]),
            variation: parseFloat(row[6]),
        };
    });

const prettify = (data) =>
    data.map((e) => {
        return {
            symbol: e.symbol,
            high: parseFloat(e.highPrice),
            low: parseFloat(e.lowPrice),
            last: parseFloat(e.lastPrice),
            priceChange: parseFloat(e.priceChange),
            variation: parseFloat(e.priceChangePercent),
            volume: parseFloat(e.volume),
        };
    });

const serialize = (values) => stringfy(prettify(values)).join("|");

const parser = (stringed) => unstringfy(stringed.split("|"));

/* 

    Experimento para compactar dados

*/

var binanceResponse = [
    {
        symbol: "OMGBUSD",
        priceChange: "-0.09010000",
        priceChangePercent: "-1.703",
        weightedAvgPrice: "5.26759448",
        prevClosePrice: "5.30120000",
        lastPrice: "5.20000000",
        lastQty: "90.00000000",
        bidPrice: "5.16700000",
        bidQty: "86.14000000",
        askPrice: "5.20190000",
        askQty: "932.65000000",
        openPrice: "5.29010000",
        highPrice: "5.42670000",
        lowPrice: "5.10000000",
        volume: "60210.88000000",
        quoteVolume: "317166.49926900",
        openTime: 1615664558548,
        closeTime: 1615750958548,
        firstId: 37032,
        lastId: 38812,
        count: 1781,
    },
];

var serialized = serialize(binanceResponse); // return OMGBUSD;5.2;60210.88;5.4267;5.1;-0.0901;-1.703

var parsed = parser(serialized); // [{"symbol": "OMGBUSD","last": 5.2,"volume": 60210.88,"high": 5.4267,"low": 5.1,"priceChange": -0.0901,"variation": -1.703}]

console.log(serialized);
console.log(parsed);
