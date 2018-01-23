var master  = require('./master.js');
var express = require('express');
var ether   = require('ethers');
var app = express();

	app.get('/', function(req, res) {
		var data = ether.Wallet.createRandom('extraEntropy')
		res.send(data)
	});
	app.get('/get-add/:key', function(req, res){
		const 	key = req.params.key,
				wallet = new ether.Wallet(key)
				res.json(wallet)
	});

	app.get('/ether-balance/:add', function(req, res){
		var address = req.params.add
		var provider = ether.providers.getDefaultProvider()
		provider.getBalance(address).then(
			function(balance) {
			etherString = ether.utils.formatEther(balance);
			res.send(etherString)
		}, error_in_connection(res))
	})
	
	app.get('/ether-tranx/:add', function(req, res){
		res.send(master.getTransaction());
	});

	app.get('/send-ether/:prvKey/:amount/:add', function(req, res){
		var key = req.params.prvKey, amount = ether.utils.parseEther(req.params.amount), address = req.params.add;
		var wallet = new ether.Wallet(key);
		wallet.provider = ether.providers.getDefaultProvider();
		var trans = wallet.send(address, amount)
		trans.catch(function(error){
			obj = JSON.parse(error.responseText)
			res.send(obj.error.message);
		})
	})

	app.get('/send-token', function(req, res){
		
	});

	app.listen(3000, function() {
	  console.log('listening on port 3000!');
	})

function error_in_connection(res){
	res.send('Error in Connection');
}