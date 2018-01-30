var master  = require('./master.js');
var express = require('express');
var ether   = require('ethers');
var app = express();

	app.get('/', function(req, res) {
		wallet = master.createWallet()
		res.send(wallet);
	});

	app.get('/get-add/:key', function(req, res){
		wallet = master.get_info(req.params.key)
				res.json(wallet)
	});

	app.get('/ether-balance/:add', function(req, res){
		var address = req.params.add
		var provider = ether.providers.getDefaultProvider()
		balnce = provider.getBalance(address);
		
		balnce.then(function(balance) {
			etherString = ether.utils.formatEther(balance);
			res.json(etherString);
		});

		balnce.catch(function(error){
			obj = JSON.parse(error.responseText)
			res.send(obj.error.message);
		})
	})

	app.get('/send-ether/:prvKey/:amount/:add', function(req, res){
		var key = req.params.prvKey, amount = ether.utils.parseEther(req.params.amount), address = req.params.add;
		var wallet = new ether.Wallet(key);
		wallet.provider = ether.providers.getDefaultProvider();
		option = {
			gasLimit: 21000,
    		gasPrice: ether.utils.bigNumberify("20000000000")
		}
		var trans = wallet.send(address, amount, option);
		trans.then(function(hash){
			 res.json(hash)
		});

		trans.catch(function(error){
			obj = JSON.parse(error.responseText)
			res.send(obj.error.message);
		})
	})
	
	app.get('/ether-tranx/:add', function(req, res){
		transaction = master.getAddressTransactionCount(req.params.add);
		transaction.then(function(transactionCount){
			res.json(transactionCount)
		})
	});

	app.get('/getTransaction/:transHash', function(req, res){
		transaction = master.getTransaction(req.params.transHash);
		
		transaction.then(function(tranx) {
    		res.json(tranx);
		});

		transaction.catch(function(error){
			res.send(error)
		});
	});

	app.get('/getTransactionReceipt/:hash', function(req, res){
		receipt = master.getReceipt(req.params.hash);

		receipt.then(function(tranxReceipt){
			res.json(tranxReceipt);
		});

		receipt.catch(function(error){
			res.send(error)
		});
	});

	app.get('/send-token/', function(req, res){
		var abi = require('./abi.json'), add = '0x28abc25b4d4530720b99e051e79899642c3291e3', provider = ether.providers.getDefaultProvider();

		var contract = new ether.Contract(add, abi, provider);
		var callPromise = contract.functions.transfer("0x06Ae947Db37C62F545dedF844D3c91721c38613A", "5000");
		callPromise.then(function(obj){
			res.send(obj)
		})

		callPromise.catch(function(error){
			res.send(error)
		});
	});

	app.listen(3000, function() {
	  console.log('listening on port 3000!');
	})

function error_in_connection(res){
	res.send('Error in Connection');
}