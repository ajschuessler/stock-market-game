$(document).ready(function(){

    // stock market

	var $stockList = $('.stockList');

	

	var populateStockList = function() {

		$stockList.html('');
		
		var $tableHeaderRow = $('<tr></tr>');
		$tableHeaderRow.addClass('tableHeaderRow');
	    $tableHeaderRow.appendTo($stockList);


		var $stockNameHeader = $('<th></th>');
	    $stockNameHeader.text('Company Name');
	    $stockNameHeader.appendTo($tableHeaderRow);

	    var $stockTickerHeader = $('<th></th>');
	    $stockTickerHeader.text('Ticker');
	    $stockTickerHeader.appendTo($tableHeaderRow);

	    var $stockPriceHeader = $('<th></th>');
	    $stockPriceHeader.text('Stock Price');
	    $stockPriceHeader.appendTo($tableHeaderRow);

	    var $shareCountHeader = $('<th></th>');
	    $shareCountHeader.text('# Shares');
	    $shareCountHeader.appendTo($tableHeaderRow);

	    var $BuyHeader = $('<th></th>');
	    $BuyHeader.text('Action');
	    $BuyHeader.appendTo($tableHeaderRow);

	    

	    
	    for (stock in stocks) {

	    	var $tableStockRow = $('<tr></tr>');
	    	$tableStockRow.addClass(stocks[stock].ticker);
	    	$tableStockRow.appendTo($stockList);

	    	var $stockName = $('<td></td>');
	    	$stockName.text(stocks[stock].name);
	        $stockName.appendTo($tableStockRow);

	        var $stockTicker = $('<td></td>');
	    	$stockTicker.text(stocks[stock].ticker);
	        $stockTicker.appendTo($tableStockRow);

	        var $stockPrice = $('<td></td>');
	    	$stockPrice.text(stocks[stock].price);
	        $stockPrice.appendTo($tableStockRow);

	        var $shareCount = $('<input type="number">');
	        $shareCount.attr('id', stocks[stock].ticker + 'sharesPurchased');
	        $shareCount.appendTo($tableStockRow);

	        var $buy = $('<button></button');
	        $buy.addClass('buy');
	        $buy.text('Buy');
	        $buy.appendTo($tableStockRow);

	    }

	    var buyButtons = document.getElementsByClassName('buy');
	
	    for (var i = 0; i < buyButtons.length; i++) {
		    buyButtons[i].onclick = function() {
			    var clickedElementParentClass = window.event.srcElement.parentElement.className;
			    var userSharesPurchased = document.getElementById(clickedElementParentClass + 'sharesPurchased').value;
			    userBuysStock(clickedElementParentClass, userSharesPurchased);
			    populatePortfolio();
			    populateTotalPortfolioValue();
		    }
	    }
	}


    // default home load
    populateStockList();





	// portfolio

    var $userPortfolio = $('.userPortfolio')

    var populatePortfolio = function() {
    	
    	$userPortfolio.html('');

    	var $tableHeaderRow = $('<tr></tr>');
		$tableHeaderRow.addClass('tableHeaderRow');
	    $tableHeaderRow.appendTo($userPortfolio);

		var $assetNameHeader = $('<th></th>');
	    $assetNameHeader.text('Asset');
	    $assetNameHeader.appendTo($tableHeaderRow);

	    var $sharesHeader = $('<th></th>');
	    $sharesHeader.text('Shares Owned');
	    $sharesHeader.appendTo($tableHeaderRow);

	    var $stockPriceHeader = $('<th></th>');
	    $stockPriceHeader.text('Stock Price');
	    $stockPriceHeader.appendTo($tableHeaderRow);

	    var $marketValueHeader = $('<th></th>');
	    $marketValueHeader.text('Market Value');
	    $marketValueHeader.appendTo($tableHeaderRow);

	    var $shareToSellHeader = $('<th></th>');
	    $shareToSellHeader.text('# Shares');
	    $shareToSellHeader.appendTo($tableHeaderRow);

	    var $sellHeader = $('<th></th');
	    $sellHeader.text('Action');
	    $sellHeader.appendTo($tableHeaderRow);

	    

    	for (asset in userPortfolio) {
    		
    		var $tablePortfolioRow = $('<tr></tr>');
    		$tablePortfolioRow.addClass(userPortfolio[asset].asset);
	    	$tablePortfolioRow.appendTo($userPortfolio);

    		var $asset = $('<td></td');
    		$asset.text(asset);
    		$asset.appendTo($tablePortfolioRow);

    		var $sharesOwned = $('<td></td');
    		$sharesOwned.text(userPortfolio[asset].shares);
    		$sharesOwned.appendTo($tablePortfolioRow);

    		var $stockPrice = $('<td></td');
    		$stockPrice.text(userPortfolio[asset].price);
    		$stockPrice.appendTo($tablePortfolioRow);

    		var $marketValue = $('<td></td');
    		$marketValue.text(userPortfolio[asset].marketValue);
    		$marketValue.appendTo($tablePortfolioRow);

    		var $sharesToSell = $('<input type="number">');
    		$sharesToSell.attr('id', userPortfolio[asset].asset + 'sharesSold')
	        $sharesToSell.appendTo($tablePortfolioRow);

    		var $sell = $('<button></button');
    		$sell.addClass('sell');
	        $sell.text('Sell');
	        $sell.appendTo($tablePortfolioRow);

    	}

    	

	    var sellButtons = document.getElementsByClassName('sell');

	    for (var i = 0; i < sellButtons.length; i++) {
	        sellButtons[i].onclick = function() {
	    	    var clickedElementParentClass = window.event.srcElement.parentElement.className;
	    	    var sharesSold = document.getElementById(clickedElementParentClass + 'sharesSold').value;
	    	    userSellsStock(clickedElementParentClass, sharesSold);
	    	    populatePortfolio();
	    	    populateTotalPortfolioValue();
	        }	
	    }

	    
    }
    
    //default home load
    populatePortfolio();


    
    var populateTotalPortfolioValue = function() {
        $totalPortfolioValue = $('#totalPortfolioValue');
        $totalPortfolioValue.text(totalPortfolioValue());	
    }

    populateTotalPortfolioValue();
    




    //user interation

	
    var updatePricingIntervalSteps = function() {
    	changePrices();
		populateStockList();
		populatePortfolio();
		populateTotalPortfolioValue();
    }

    
	


	var updatePricingButton = document.getElementById("updatePricngButton");
	
	updatePricingButton.onclick = function() {
		var updatePricingInterval = setInterval(updatePricingIntervalSteps, 3000);
	}


	



	






});