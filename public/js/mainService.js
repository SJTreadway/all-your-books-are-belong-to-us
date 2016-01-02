(function() {
	angular.module('storeApp').service('mainService', function($http, $q, $rootScope) {

		var user;

		this.getMovies = function(title) {
			var query;
			if(!title) {
				query = '';
			} else {
				query = '?title=' + title;
			}
			return $http({
				method: 'GET',
				url: '/api/movies' + query, 
				}).then(function(res) {
					return res.data.products;
				}, function(err) {
					console.log(err);
			});
		};

		this.addUser = function(newUser){
			console.log(newUser)
			if (!newUser) {
				alert('Please sign up.');
			}
		    return $http({
		      method: 'POST',
		      url: '/api/user',
		      data: newUser
		    }).then(function(res) {
		    	return res.data;
		    });
		};

		this.addItem = function(userId, item) {
			return $http({
				method: 'POST',
				url: '/api/cart/' + userId,
				data: {
					product: item
				}
			}).then(function(res) {
				return res.data;
			})
		};

		this.loginUser = function(user){
		    return $http({
		      method: 'POST',
		      url: '/api/login',
		      data: user
		    }).then(function(res){
		      console.log('Result from user login', res)
		      return res.data;
		    }, function(err) {
		    	if (err) {
		    		console.log(err);
			    	return;
		    	}
		    });
		  };

		this.logoutUser = function() {
			return $http({
				method: 'GET',
				url: '/api/logout'
			});
		};

	});
})();