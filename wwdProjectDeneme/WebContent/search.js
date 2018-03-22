
function searchViewModel(globe) {
            var self = this,
                wwd = globe.wwd;
            var coordinates = document.getElementById('').value;
            self.geocoder = new WorldWind.NominatimGeocoder();
            self.goToAnimator = new WorldWind.GoToAnimator(wwd);
            self.searchText = ko.observable('');
            self.onEnter = function (data, event) {
                if (event.keyCode === 13) {
                    self.performSearch();
                }
                return true;
            };
            self.performSearch = function () {
                var queryString = self.searchText();
                if (queryString) {
                    var latitude, longitude;
                    if (queryString.match(WorldWind.WWUtil.latLonRegex)) {
                        var tokens = queryString.split(",");
                        latitude = parseFloat(tokens[0]);
                        longitude = parseFloat(tokens[1]);
                        self.goToAnimator.goTo(new WorldWind.Location(latitude, longitude));
                    } else {
                        self.geocoder.lookup(queryString, function (geocoder, result) {
                            if (result.length > 0) {
                                latitude = parseFloat(result[0].lat);
                                longitude = parseFloat(result[0].lon);
                                self.goToAnimator.goTo(new WorldWind.Location(latitude, longitude));
                            }
                        });
                    }
                }
            };
            return SearchViewModel;
        }
   
    
