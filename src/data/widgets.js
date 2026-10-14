// Symbol lists and embed URLs used by the live site's market widgets.

export const marketDataSectors = [
  { sectionName: "Indices", symbols: ["FOREXCOM:SPXUSD", "FOREXCOM:NSXUSD", "FOREXCOM:DJI", "INDEX:NKY", "INDEX:DEU40", "FOREXCOM:UKXGBP"] },
  { sectionName: "Futures", symbols: ["BMFBOVESPA:ISP1!", "BMFBOVESPA:EUR1!", "CMCMARKETS:GOLD", "TVC:USOIL", "BMFBOVESPA:CCM1!"] },
  { sectionName: "Bonds", symbols: ["EUREX:FGBL1!", "EUREX:FBTP1!", "EUREX:FGBM1!"] },
  { sectionName: "Forex", symbols: ["FX:EURUSD", "FX:GBPUSD", "FX:USDJPY", "FX:USDCHF", "FX:AUDUSD", "FX:USDCAD"] },
];

export const marketOverviewSectors = [
  { sectionName: "Indices", symbols: ["FOREXCOM:SPXUSD", "FOREXCOM:NSXUSD", "FOREXCOM:DJI", "FOREXCOM:UKXGBP"] },
  {
    sectionName: "Crypto",
    symbols: ["VANTAGE:BTCUSD", "VANTAGE:ETHUSD", "VANTAGE:BTCETH", "VANTAGE:SOLUSD", "VANTAGE:BTCXAU", "VANTAGE:XRPUSD", "VANTAGE:BTCJPY", "VANTAGE:ZECUSD", "VANTAGE:LTCUSD", "VANTAGE:BNBUSD", "VANTAGE:XRPJPY", "VANTAGE:SOLJPY", "VANTAGE:SHBUSD", "VANTAGE:TRXUSD", "VANTAGE:USDTJPY", "VANTAGE:LTCJPY", "VANTAGE:ETHBCH", "VANTAGE:HYPEUSD", "VANTAGE:OKBUSD", "VANTAGE:ETHEUR", "VANTAGE:TRUMPUSD"],
  },
  {
    sectionName: "Commodities",
    symbols: ["VANTAGE:XAUUSD", "VANTAGE:XAGUSD", "VANTAGE:XAUAUD", "VANTAGE:XAUJPY", "VANTAGE:XAUEUR", "VANTAGE:COPPER", "VANTAGE:XAGAUD", "VANTAGE:XPDUSD", "FOREXCOM:USOIL", "VANTAGE:USOUSD", "VANTAGE:UKOUSD", "CAPITALCOM:NATURALGAS", "FXPRO:XNGUSD"],
  },
  {
    sectionName: "Stocks",
    symbols: ["NASDAQ:NVDA", "NASDAQ:AAPL", "NASDAQ:TSLA", "NASDAQ:MU", "NASDAQ:MSFT", "NASDAQ:AMZN", "NASDAQ:PLTR", "NASDAQ:META", "NASDAQ:MSTR", "NASDAQ:AMD", "NASDAQ:NFLX", "NASDAQ:GOOGL", "NYSE:ORCL", "NASDAQ:AVGO", "NASDAQ:COIN", "NYSE:LLY", "NYSE:BABA", "NYSE:DELL"],
  },
];

export const investing = {
  topCrypto: "https://www.widgets.investing.com/top-cryptocurrencies?theme=lightTheme",
  technicalSummary:
    "https://ssltsw.investing.com?lang=1&forex=1,2,3,5,7,9,10&commodities=8830,8836,8831,8849,8833,8862,8832&indices=175,166,172,27,179,170,174&stocks=345,346,347,348,349,350,352&tabs=3,2,1,4",
  calendar:
    "https://sslecal2.investing.com?columns=exc_flags,exc_currency,exc_importance,exc_actual,exc_forecast,exc_previous&features=datepicker,timezone,timeselector,filters&countries=25,32,6,37,72,22,17,39,14,10,35,43,56,36,110,11,26,12,4,5&calType=week&timeZone=8&lang=1",
};
