	var ether   = require('ethers'); 
	
	var provider = ether.providers.getDefaultProvider();
	function error_in_connection(){
		return 'Error in Connection';
	}

module.exports = {
	 getAddressTransactionCount : function(add){
		tranx = provider.getTransactionCount(add);
		return tranx;
	},

	createWallet : function(){
		var data = ether.Wallet.createRandom('tube panic two appear jelly car involve start canvas notice maze panel')
		return data;
	}, 

	get_info : function(pvkey){
		const 	key = pvkey,
				wallet = new ether.Wallet(key)
				return wallet;
	}, 

	get_bal : function(add){
		balance = provider.getBalance(add).then(function(balance) {
					etherString = ether.utils.formatEther(balance);
					return etherString
		}, error_in_connection())
		return balance
	},

	getTransaction : function(hash){
		return provider.getTransaction(hash);
	},

	getReceipt	 : function(hash){
		return provider.getTransactionReceipt(hash);
	}
	
}
	

	
