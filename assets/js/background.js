const ONE_MINUTE_IN_MS = 60000;
const RED = [220, 53, 69, 255];
const GREEN = [40, 167, 69, 255];
const makeId = () =>
    Math.random()
        .toString(36)
        .substring(7);
const validTickers = [
    "BTCUSDT",
    "ETHUSDT",
    "BNBUSDT",
    "BCCUSDT",
    "NEOUSDT",
    "LTCUSDT",
    "QTUMUSDT",
    "ADAUSDT",
    "XRPUSDT",
    "EOSUSDT",
    "TUSDUSDT",
    "IOTAUSDT",
    "XLMUSDT",
    "ONTUSDT",
    "TRXUSDT",
    "ETCUSDT",
    "ICXUSDT",
    "VENUSDT",
    "NULSUSDT",
    "VETUSDT",
    "PAXUSDT",
    "BCHABCUSDT",
    "BCHSVUSDT",
    "USDCUSDT",
    "LINKUSDT",
    "WAVESUSDT",
    "BTTUSDT",
    "USDSUSDT",
    "ONGUSDT",
    "HOTUSDT",
    "ZILUSDT",
    "ZRXUSDT",
    "FETUSDT",
    "BATUSDT",
    "XMRUSDT",
    "ZECUSDT",
    "IOSTUSDT",
    "CELRUSDT",
    "DASHUSDT",
    "NANOUSDT",
    "OMGUSDT",
    "THETAUSDT",
    "ENJUSDT",
    "MITHUSDT",
    "MATICUSDT",
    "ATOMUSDT",
    "TFUELUSDT",
    "ONEUSDT",
    "FTMUSDT",
    "ALGOUSDT",
    "USDSBUSDT",
    "GTOUSDT",
    "ERDUSDT",
    "DOGEUSDT",
    "DUSKUSDT",
    "ANKRUSDT",
    "WINUSDT",
    "COSUSDT",
    "NPXSUSDT",
    "COCOSUSDT",
    "MTLUSDT",
    "TOMOUSDT",
    "PERLUSDT",
    "DENTUSDT",
    "MFTUSDT",
    "KEYUSDT",
    "STORMUSDT",
    "DOCKUSDT",
    "WANUSDT",
    "FUNUSDT",
    "CVCUSDT",
    "CHZUSDT",
    "BANDUSDT",
    "BUSDUSDT",
    "BEAMUSDT",
    "XTZUSDT",
    "RENUSDT",
    "RVNUSDT",
    "HCUSDT",
    "HBARUSDT",
    "NKNUSDT",
    "STXUSDT",
    "KAVAUSDT",
    "ARPAUSDT",
    "IOTXUSDT",
    "RLCUSDT",
    "MCOUSDT",
    "CTXCUSDT",
    "BCHUSDT",
    "TROYUSDT",
    "VITEUSDT",
    "FTTUSDT",
    "EURUSDT",
    "OGNUSDT",
    "DREPUSDT",
    "BULLUSDT",
    "BEARUSDT",
    "ETHBULLUSDT",
    "ETHBEARUSDT",
    "TCTUSDT",
    "WRXUSDT",
    "BTSUSDT",
    "LSKUSDT",
    "BNTUSDT",
    "LTOUSDT",
    "EOSBULLUSDT",
    "EOSBEARUSDT",
    "XRPBULLUSDT",
    "XRPBEARUSDT",
    "STRATUSDT",
    "AIONUSDT",
    "MBLUSDT",
    "COTIUSDT",
    "BNBBULLUSDT",
    "BNBBEARUSDT",
    "STPTUSDT",
    "WTCUSDT",
    "DATAUSDT",
    "XZCUSDT",
    "SOLUSDT",
    "CTSIUSDT",
    "HIVEUSDT",
    "CHRUSDT",
    "BTCUPUSDT",
    "BTCDOWNUSDT",
    "GXSUSDT",
    "ARDRUSDT",
    "LENDUSDT",
    "MDTUSDT",
    "STMXUSDT",
    "KNCUSDT",
    "REPUSDT",
    "LRCUSDT",
    "PNTUSDT",
    "COMPUSDT",
    "BKRWUSDT",
    "SCUSDT",
    "ZENUSDT",
    "SNXUSDT",
    "ETHUPUSDT",
    "ETHDOWNUSDT",
    "ADAUPUSDT",
    "ADADOWNUSDT",
    "LINKUPUSDT",
    "LINKDOWNUSDT",
    "VTHOUSDT",
    "DGBUSDT",
    "GBPUSDT",
    "SXPUSDT",
    "MKRUSDT",
    "DAIUSDT",
    "DCRUSDT",
    "STORJUSDT",
    "BNBUPUSDT",
    "BNBDOWNUSDT",
    "XTZUPUSDT",
    "XTZDOWNUSDT",
    "MANAUSDT",
    "AUDUSDT",
    "YFIUSDT",
    "BALUSDT",
    "BLZUSDT",
    "IRISUSDT",
    "KMDUSDT",
    "JSTUSDT",
    "SRMUSDT",
    "ANTUSDT",
    "CRVUSDT",
    "SANDUSDT",
    "OCEANUSDT",
    "NMRUSDT",
    "DOTUSDT",
    "LUNAUSDT",
    "RSRUSDT",
    "PAXGUSDT",
    "WNXMUSDT",
    "TRBUSDT",
    "BZRXUSDT",
    "SUSHIUSDT",
    "YFIIUSDT",
    "KSMUSDT",
    "EGLDUSDT",
    "DIAUSDT",
    "RUNEUSDT",
    "FIOUSDT",
    "UMAUSDT",
    "EOSUPUSDT",
    "EOSDOWNUSDT",
    "TRXUPUSDT",
    "TRXDOWNUSDT",
    "XRPUPUSDT",
    "XRPDOWNUSDT",
    "DOTUPUSDT",
    "DOTDOWNUSDT",
    "BELUSDT",
    "WINGUSDT",
    "LTCUPUSDT",
    "LTCDOWNUSDT",
    "UNIUSDT",
    "NBSUSDT",
    "OXTUSDT",
    "SUNUSDT",
    "AVAXUSDT",
    "HNTUSDT",
    "FLMUSDT",
    "UNIUPUSDT",
    "UNIDOWNUSDT",
    "ORNUSDT",
    "UTKUSDT",
    "XVSUSDT",
    "ALPHAUSDT",
    "AAVEUSDT",
    "NEARUSDT",
    "SXPUPUSDT",
    "SXPDOWNUSDT",
    "FILUSDT",
    "FILUPUSDT",
    "FILDOWNUSDT",
    "YFIUPUSDT",
    "YFIDOWNUSDT",
    "INJUSDT",
    "AUDIOUSDT",
    "CTKUSDT",
    "BCHUPUSDT",
    "BCHDOWNUSDT",
    "AKROUSDT",
    "AXSUSDT",
    "HARDUSDT",
    "DNTUSDT",
    "STRAXUSDT",
    "UNFIUSDT",
    "ROSEUSDT",
    "AVAUSDT",
    "XEMUSDT",
    "AAVEUPUSDT",
    "AAVEDOWNUSDT",
    "SKLUSDT",
    "SUSDUSDT",
    "SUSHIUPUSDT",
    "SUSHIDOWNUSDT",
    "XLMUPUSDT",
    "XLMDOWNUSDT",
    "GRTUSDT",
    "JUVUSDT",
    "PSGUSDT",
    "1INCHUSDT",
    "REEFUSDT",
    "OGUSDT",
    "ATMUSDT",
    "ASRUSDT",
    "CELOUSDT",
    "RIFUSDT",
    "BTCSTUSDT",
    "TRUUSDT",
    "CKBUSDT",
    "TWTUSDT",
    "FIROUSDT",
    "LITUSDT",
    "SFPUSDT",
    "DODOUSDT",
    "CAKEUSDT",
    "ACMUSDT",
    "BADGERUSDT",
    "FISUSDT",
    "OMUSDT",
    "PONDUSDT",
    "DEGOUSDT",
];

const minutesToMilliseconds = (minutes) => {
    return ONE_MINUTE_IN_MS * minutes;
};

let updateInterval = minutesToMilliseconds(15);

const priceToKilo = (value, fixed = 1) => {
    return (value / 1000).toFixed(fixed);
};

const priceToString = (value) => {
    return `${value}K`;
};

const BTCHighlight = (ticker) => {
    var price = parseFloat(ticker.lastPrice);
    var variation = parseFloat(ticker.priceChangePercent);
    chrome.browserAction.setBadgeText({ text: priceToString(priceToKilo(price)) });
    chrome.browserAction.setBadgeBackgroundColor({ color: variation >= 0 ? GREEN : RED });
};

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set(
        {
            tickers: [],
            monitoring: ["BTCUSDT", "ETHUSDT", "BNBUSDT", "FILUSDT"],
            highlights: ["BTCUSDT", "FILUSDT"],
            updateInterval: 15,
            notifications: true,
            validTickers: validTickers,
            sniffers: [{ symbol: "BTCUSDT", op: ">=", value: 1 }],
        },
        () => {
            console.log("Installed and set default Storage.");
        }
    );

    chrome.browserAction.setBadgeText({ text: "..." });
    chrome.browserAction.setBadgeBackgroundColor({ color: [40, 167, 69, 255] });
});

chrome.storage.sync.get(["settings"], function(result) {
    updateInterval = minutesToMilliseconds(result.settings.updateInterval);
});

const notification = (title, message, icon, priority = 1) => {
    var opt = {
        title: title,
        message: message,
        iconUrl: icon,
        priority: priority,
        type: "basic",
        requireInteraction: true,
    };
    chrome.notifications.create(makeId(), opt, function(notificationId) {
        console.log(notificationId);
    });
};
const snifferMessage = (sniffer) => `${sniffer.symbol} ${sniffer.op} ${sniffer.value}`;

const snifferOnTarget = (sniffer, tickers) => {
    let ticker = tickers.length ? tickers.filter((ticker) => ticker.symbol === sniffer.symbol) : [];
    if (!ticker.length) return false;
    ticker = ticker[0];

    if (sniffer.op === ">=") {
        return ticker.last >= sniffer.value;
    } else if (sniffer.op === "<=") {
        return ticker.last <= sniffer.value;
    }
};

const snifferAlert = () => {
    chrome.storage.sync.get(["sniffers", "tickers", "settings"], (storage) => {
        var snifferSended = [];
        storage.sniffers.map((sniffer) => {
            if (snifferOnTarget(sniffer, storage.tickers) && storage.settings.notifications) {
                notification(snifferMessage(sniffer), "On target", "images/notification.png");
                snifferSended.push(sniffer.symbol);
            }
        });
        if (snifferSended.length && storage.sniffers.length) {
            var newSniffers = storage.sniffers.filter((sniffer) => !snifferSended.includes(sniffer.symbol));
            chrome.storage.sync.set({ sniffers: newSniffers });
        }
    });
};

const fetchApi = () => {
    chrome.storage.sync.get(["monitoring", "sniffer"], (storage) => {
        fetch("https://api1.binance.com/api/v3/ticker/24hr").then((response) => {
            response.json().then((data) => {
                let prettifyTickers = data
                    .filter((e) => storage.monitoring.includes(e.symbol))
                    .map((ticker) => {
                        if (ticker.symbol === "BTCUSDT") {
                            BTCHighlight(ticker, storage.sniffers);
                        }

                        return {
                            symbol: ticker.symbol,
                            high: parseFloat(ticker.highPrice),
                            low: parseFloat(ticker.lowPrice),
                            last: parseFloat(ticker.lastPrice),
                            priceChange: parseFloat(ticker.priceChange),
                            variation: parseFloat(ticker.priceChangePercent),
                            volume: parseFloat(ticker.volume),
                        };
                    });
                chrome.storage.sync.set({ tickers: prettifyTickers }, () => {});
                snifferAlert();
            });
        });
    });
};

fetchApi();

let handleUpdateInterval = setInterval(fetchApi, updateInterval);

chrome.storage.onChanged.addListener((changes, namespace) => {
    console.log("Storage Changed", changes, namespace);
    if (namespace === "sync") {
        if (changes.settings) {
            updateInterval = changes.settings.updateInterval;
        }
        if (changes.monitoring) {
            fetchApi();
        }
        if (changes.notifications) {
            if (changes.notifications.newValue) {
                chrome.storage.sync.get(["updateInterval"], (storage) => {
                    handleUpdateInterval = setInterval(fetchApi, minutesToMilliseconds(storage.updateInterval));
                });
            } else {
                clearInterval(handleUpdateInterval);
            }
        }
        if (changes.updateInterval) {
            chrome.storage.sync.get(["updateInterval"], (storage) => {
                console.log("update interval", storage.updateInterval);
                clearInterval(handleUpdateInterval);
                handleUpdateInterval = setInterval(fetchApi, minutesToMilliseconds(storage.updateInterval));
            });
        }
    }
});
