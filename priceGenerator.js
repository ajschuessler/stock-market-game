
var Stock = function(name, ticker, price) {
	this.name = name;
	this.ticker = ticker;
	this.price = price;
} 

var portfolioAsset = function(tickerSelected, sharesPurchased) {
	this.asset = tickerSelected;
	this.shares = Number(sharesPurchased);
	this.price = stocks[this.asset].price;
	this.marketValue = this.shares * this.price;
} 


var stocks = {
	ENR: new Stock('Enron', 'ENR', 52),
	BB: new Stock('Best Buy', 'BB', 43),
	URI: new Stock('United Rentals', 'URI', 99)
}

var userPortfolio = {
	cash: {
		asset: 'cash',
		shares: 0,
		price: '',
		marketValue: 100000
	}
}

var totalPortfolioValue = function() {
    var sumTotal = 0;
    for (asset in userPortfolio) {
      sumTotal += userPortfolio[asset].marketValue;
    }
    return sumTotal;
}

var changePrices = function() {
	for (stock in stocks) {
		var priceFactor = Math.random() + Math.random();
		stocks[stock].price = Math.floor((stocks[stock].price + priceFactor));
	}
	for (asset in userPortfolio) {
		if (asset !== 'cash') {
		    userPortfolio[asset].price = stocks[asset].price;
		    userPortfolio[asset].marketValue = userPortfolio[asset].price * userPortfolio[asset].shares;	
		}
	}
}



var userBuysStock = function(tickerSelected, sharesPurchased) {
	userPortfolio.cash.marketValue -= (stocks[tickerSelected].price * sharesPurchased);
	
	if (!userPortfolio.hasOwnProperty(tickerSelected)) {
		userPortfolio[tickerSelected] = new portfolioAsset(tickerSelected, sharesPurchased);
	} else {
		userPortfolio[tickerSelected].shares += Number(sharesPurchased);
		userPortfolio[tickerSelected].marketValue = userPortfolio[tickerSelected].shares * stocks[tickerSelected].price;
	}
}

var userSellsStock = function(tickerSelected, sharesSold) {
	userPortfolio.cash.marketValue += (userPortfolio[tickerSelected].price * sharesSold);

	userPortfolio[tickerSelected].shares -= Number(sharesSold);
	userPortfolio[tickerSelected].marketValue = userPortfolio[tickerSelected].shares * stocks[tickerSelected].price;
}



