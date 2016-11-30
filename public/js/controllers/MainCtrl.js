angular.module('MainCtrl', ['ngAnimate', 'ui.bootstrap', 'ngMaterial', 'ngMessages', 'ngResource'])
    .config(function ($mdThemingProvider) {
        $mdThemingProvider.theme('docs-dark', 'default')
            .primaryPalette('yellow')
            .dark();
    })

    .controller('MainController', function ($scope, $http, $resource, $mdDialog, $uibModal) {

        $scope.ff = function () {
            console.log('cccccccccccccc');
            $resource("http://​104.197.128.152:8000/v1/genres").get().$promise.then(function (value) {
                console.log('asdasdasdasd',value)

                $scope.allGenres11 = value.results;
                console.log('!!!!!!!!!',JSON.stringify($scope.allGenres11));
                $scope.totalGenres11 = value.count;
                $scope.nextPageGenre11 = value.next;
                $scope.previousPageGenre11 = value.previous;
            });

            $scope.getAllGenres11 = function (param) {

                $resource(param).get().$promise.then(function (value) {
                    $scope.allGenres11 = value.results;
                    $scope.totalGenres11 = value.count;
                    $scope.nextPageGenre11 = value.next;
                    $scope.previousPageGenre11 = value.previous;
                });
            };

            $scope.callNextGenre11 = function () {
                $scope.getAllGenres11($scope.nextPageGenre11);
            };

            $scope.callPrevGenre11 = function () {
                $scope.getAllGenres11($scope.previousPageGenre11);
            };
        }


        $scope.trackToUpdate = {
            Id: null,
            Title: '',
            Rating: null,
            Genres: []
        };
        $scope.openEditTrack = function (val) {
            console.log('--',val);

            var modalInstance = $uibModal.open({
                //ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'myModalContent.html',
                controller: 'MainController'
            });


            $scope.trackToUpdate.Id = val.id;
            $scope.trackToUpdate.Title = val.title;
            $scope.trackToUpdate.Rating = parseFloat(val.rating);

            angular.forEach(val.genres, function(g) {
                if($scope.trackToUpdate.Genres.indexOf(g.id) === -1) {
                    $scope.trackToUpdate.Genres.push(g.id);
                }
            });
            console.log('>>>>***********',JSON.stringify($scope.trackToUpdate.Genres));

            $scope.selected1 = $scope.trackToUpdate.Genres;

            $scope.nextPageGenre11 = "";
            $scope.previousPageGenre11 = "";




            $scope.toggle11 = function (item, list) {
                console.log(item,list);
                var idx = list.indexOf(item);
                if (idx > -1) {
                    list.splice(idx, 1);
                }
                else {
                    list.push(item);
                }
            };

            $scope.existsss = function (item, list) {
                console.log(item,list);
                return list.indexOf(item) > -1;
            };

            //$scope.isIndeterminate = function () {
            //    return ($scope.selected.length !== 0 &&
            //    $scope.selected.length !== $scope.itemss.length);
            //};
            //
            //$scope.isChecked = function () {
            //    return $scope.selected.length === $scope.itemss.length;
            //};
            //
            //$scope.toggleAll = function () {
            //    if ($scope.selected.length === $scope.itemss.length) {
            //        $scope.selected = [];
            //    } else if ($scope.selected.length === 0 || $scope.selected.length > 0) {
            //        $scope.selected = $scope.itemss.slice(0);
            //    }
            //};

            $scope.hide = function () {
                $mdDialog.hide();
            };

            $scope.cancel = function () {
                $mdDialog.cancel();
            };

            //$scope.saveNewTrack = function () {
            //    console.log("answer save");
            //    $resource('http://104.197.128.152:8000/v1/tracks').save({'title': $scope.newTrack.Title,'rating': parseFloat($scope.newTrack.Rating), 'genres': $scope.selected}, function () {
            //    });
            //    $mdDialog.hide();
            //};
        };


        //Get all tracks and pagination/////////////////////////////////////////////////////////////////////////////done

        $scope.firstCallTrack = "http://​104.197.128.152:8000/v1/tracks";
        $scope.nextPageTrack = "";
        $scope.previousPageTrack = "";

        $scope.getAllTracks = function (param) {
            $resource(param).get().$promise.then(function (value) {
                console.log("---", JSON.stringify(value));

                $scope.allTracks = value.results;
                $scope.totalTracks = value.count;
                $scope.nextPageTrack = value.next;
                $scope.previousPageTrack = value.previous;
            });
        };

        $scope.callNextTrack = function () {
            console.log('next ;;;;',JSON.stringify($scope.nextPageTrack));
            $scope.getAllTracks($scope.nextPageTrack);
        };

        $scope.callPrevTrack = function () {
            console.log('next ;;;;',JSON.stringify($scope.previousPageTrack));
            $scope.getAllTracks($scope.previousPageTrack);
        };


        //Search track by title/////////////////////////////////////////////////////////////////////////////done

        $scope.searchQuery = '';
        $scope.search = function (qry) {
            console.log(qry);
            $resource("http://​104.197.128.152:8000/v1/tracks").get({'title':qry}).$promise.then(function (value) {
                console.log('searching found',value);

                $scope.allTracks = value.results;
                $scope.totalTracks = value.count;
                $scope.nextPageTrack = value.next;
                $scope.previousPageTrack = value.previous;
            });
        };

        $scope.clearSearch = function () {
            $scope.searchQuery = '';
            $scope.getAllTracks($scope.firstCallTrack);
        };


        //Get all genres and pagination///////////////////////////////////////////////////////////////////////done

        $scope.firstCallGenre = "http://​104.197.128.152:8000/v1/genres";
        $scope.nextPageGenre = "";
        $scope.prevPageGenre = "";

        $scope.getAllGenres = function (param) {
            console.log('getAllGenres');

            $resource(param).get().$promise.then(function (value) {
                console.log("---", JSON.stringify(value));

                $scope.allGenres = value.results;
                $scope.totalGenres = value.count;
                $scope.nextPageGenre = value.next;
                $scope.previousPageGenre = value.previous;
            });
        };

        $scope.callNextGenre = function () {
            $scope.getAllGenres($scope.nextPageGenre);
        };

        $scope.callPrevGenre = function () {
            $scope.getAllGenres($scope.previousPageGenre);
        };


        //Add new track//////////////////////////////////////////////////////////////////////done

        $scope.newTrack = {
            Title: '',
            Rating: null,
            Genres: []
        };
        $scope.addNewTrack = function (ev) {

            $mdDialog.show({
                    controller: DialogController,
                    templateUrl: 'dialog1.tmpl.html',
                    parent: angular.element(document.body),
                    targetEvennt: ev,
                    clickOutsideToClose: true
                })
                .then(function () {
                    console.log('ok');
                }, function () {
                    console.log('cancelled add new track');
                });

        };

        function DialogController($scope, $mdDialog) {

            $scope.nextPageGenre1 = "";
            $scope.previousPageGenre1 = "";

            $resource("http://​104.197.128.152:8000/v1/genres").get().$promise.then(function (value) {

                $scope.allGenres1 = value.results;
                $scope.totalGenres1 = value.count;
                $scope.nextPageGenre1 = value.next;
                $scope.previousPageGenre1 = value.previous;
            });

            $scope.getAllGenres1 = function (param) {

            $resource(param).get().$promise.then(function (value) {
                    $scope.allGenres1 = value.results;
                    $scope.totalGenres1 = value.count;
                    $scope.nextPageGenre1 = value.next;
                    $scope.previousPageGenre1 = value.previous;
                });
            };

            $scope.callNextGenre1 = function () {
                $scope.getAllGenres1($scope.nextPageGenre1);
            };

            $scope.callPrevGenre1 = function () {
                $scope.getAllGenres1($scope.previousPageGenre1);
            };

            $scope.selected = [];

            $scope.toggle1 = function (item, list) {
                var idx = list.indexOf(item);
                if (idx > -1) {
                    list.splice(idx, 1);
                }
                else {
                    list.push(item);
                }
            };

            $scope.existss = function (item, list) {
                return list.indexOf(item) > -1;
            };

            //$scope.isIndeterminate = function () {
            //    return ($scope.selected.length !== 0 &&
            //    $scope.selected.length !== $scope.itemss.length);
            //};
            //
            //$scope.isChecked = function () {
            //    return $scope.selected.length === $scope.itemss.length;
            //};
            //
            //$scope.toggleAll = function () {
            //    if ($scope.selected.length === $scope.itemss.length) {
            //        $scope.selected = [];
            //    } else if ($scope.selected.length === 0 || $scope.selected.length > 0) {
            //        $scope.selected = $scope.itemss.slice(0);
            //    }
            //};

            $scope.hide = function () {
                $mdDialog.hide();
            };

            $scope.cancel = function () {
                $mdDialog.cancel();
            };

            $scope.saveNewTrack = function () {
                console.log("answer save");
                $resource('http://104.197.128.152:8000/v1/tracks').save({'title': $scope.newTrack.Title,'rating': parseFloat($scope.newTrack.Rating), 'genres': $scope.selected}, function () {
                });
                $mdDialog.hide();
            };

        }


        //Add new genre/////////////////////////////////////////////////////////////////////////////done

        $scope.newGenreName = '';
        $scope.addNewGenre = function (ev) {
            $mdDialog.show({
                    controller: DialogController2,
                    templateUrl: 'dialog2.tmpl.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true
                })
                .then(function (answer) {
                    console.log('You said the information was "' + answer + '".');
                }, function () {
                    console.log('You cancelled the dialog.');
                });
        };

        function DialogController2($scope, $mdDialog) {
            $scope.hide = function () {
                $mdDialog.hide();
            };

            $scope.cancel = function () {
                $mdDialog.cancel();
            };

            $scope.answer = function (answer) {
                console.log("answer save", JSON.stringify(answer));
                $resource('http://104.197.128.152:8000/v1/genres').save({'name': $scope.newGenreName}, function () {
                });
                $mdDialog.hide();
            };
        }


        //Update track/////////////////////////////////////////////////////////////////////////////done

        $scope.showPromptEditTrackTitle = function (track, ev) {

            $scope.eachTrackGenreIds = [];
            angular.forEach(track.genres, function(g) {
                if($scope.eachTrackGenreIds.indexOf(g.id) === -1) {
                    $scope.eachTrackGenreIds.push(g.id);
                }
            });
            console.log('***********',$scope.eachTrackGenreIds);

            $scope.updatedTrackId = track.id;
            $scope.updatedTrackName = track.title;
            $scope.updatedTrackRating = parseFloat(track.rating);

            var confirm = $mdDialog.prompt()
                .title('Edit Track Title')
                .placeholder('Rename Track Title')
                //.textContent('Rename track.')
                .ariaLabel('Updated Track title')
                .initialValue(track.title)
                .targetEvent(ev)
                .ok('Update')
                .cancel('Cancel');

            $mdDialog.show(confirm).then(function (result) {
                console.log('ok',result);

                $scope.data = {
                    id: $scope.updatedTrackId,
                    title: result,
                    rating: $scope.updatedTrackRating,
                    genres: $scope.eachTrackGenreIds
                };

                $http({
                    method: 'POST',
                    url: 'http://104.197.128.152:8000/v1/tracks/' + $scope.updatedTrackId,
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    data: $scope.data
                }).then(
                    function (successCb) {
                        console.log('SUCCESS::', JSON.stringify(successCb));
                        $scope.getAllTracks($scope.firstCallTrack);
                    },
                    function (failureCb) {
                        console.log('FAILED::', JSON.stringify(failureCb));
                    }
                );
            }, function () {
                console.log('cancel edit track title');
            });
        };

        $scope.showPromptEditTrackRating = function (track, ev) {

            $scope.eachTrackGenreIds = [];
            angular.forEach(track.genres, function(g) {
                if($scope.eachTrackGenreIds.indexOf(g.id) === -1) {
                    $scope.eachTrackGenreIds.push(g.id);
                }
            });
            console.log('***********',$scope.eachTrackGenreIds);

            $scope.updatedTrackId = track.id;
            $scope.updatedTrackName = track.title;
            $scope.updatedTrackRating = parseFloat(track.rating);

            var confirm = $mdDialog.prompt()
                .title('Edit Track Rating')
                .placeholder('Rename Track Rating')
                .ariaLabel('Updated Track Rating')
                .initialValue(parseFloat(track.rating))
                .targetEvent(ev)
                .ok('Update')
                .cancel('Cancel');

            $mdDialog.show(confirm).then(function (result) {
                console.log('ok',result);

                $scope.data = {
                    id: $scope.updatedTrackId,
                    title: $scope.updatedTrackName,
                    rating: result,
                    genres: $scope.eachTrackGenreIds
                };

                $http({
                    method: 'POST',
                    url: 'http://104.197.128.152:8000/v1/tracks/' + $scope.updatedTrackId,
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    data: $scope.data
                }).then(
                    function (successCb) {
                        console.log('SUCCESS::', JSON.stringify(successCb));
                        $scope.getAllTracks($scope.firstCallTrack);
                    },
                    function (failureCb) {
                        console.log('FAILED::', JSON.stringify(failureCb));
                    }
                );
            }, function () {
                console.log('cancel edit track title');
            });
        };

        $scope.showPromptEditTrackGenre = function (track, ev) {
            console.log('--',track);

            $scope.eachTrackGenreIds = [];
            angular.forEach(track.genres, function(g) {
                if($scope.eachTrackGenreIds.indexOf(g.id) === -1) {
                    $scope.eachTrackGenreIds.push(g.id);
                }
            });
            console.log('***********',$scope.eachTrackGenreIds);

            $scope.updatedTrackId = track.id;
            $scope.updatedTrackName = track.title;
            $scope.updatedTrackRating = parseFloat(track.rating);

            var modalInstance = $uibModal.open({
                //ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'myModalContent.html'
            });




////////////////
            $scope.selected1 = $scope.trackToUpdate.Genres;

            $scope.nextPageGenre11 = "";
            $scope.previousPageGenre11 = "";

            $resource("http://​104.197.128.152:8000/v1/genres").get().$promise.then(function (value) {

                $scope.allGenres11 = value.results;
                console.log('!!!!!!!!!',JSON.stringify($scope.allGenres11));
                $scope.totalGenres11 = value.count;
                $scope.nextPageGenre11 = value.next;
                $scope.previousPageGenre11 = value.previous;
            });

            $scope.getAllGenres11 = function (param) {

                $resource(param).get().$promise.then(function (value) {
                    $scope.allGenres11 = value.results;
                    $scope.totalGenres11 = value.count;
                    $scope.nextPageGenre11 = value.next;
                    $scope.previousPageGenre11 = value.previous;
                });
            };

            $scope.callNextGenre11 = function () {
                $scope.getAllGenres11($scope.nextPageGenre11);
            };

            $scope.callPrevGenre11 = function () {
                $scope.getAllGenres11($scope.previousPageGenre11);
            };


            $scope.toggle11 = function (item, list) {
                console.log(item,list);
                var idx = list.indexOf(item);
                if (idx > -1) {
                    list.splice(idx, 1);
                }
                else {
                    list.push(item);
                }
            };

            $scope.existsss = function (item, list) {
                console.log(item,list);
                return list.indexOf(item) > -1;
            };

            //$scope.isIndeterminate = function () {
            //    return ($scope.selected.length !== 0 &&
            //    $scope.selected.length !== $scope.itemss.length);
            //};
            //
            //$scope.isChecked = function () {
            //    return $scope.selected.length === $scope.itemss.length;
            //};
            //
            //$scope.toggleAll = function () {
            //    if ($scope.selected.length === $scope.itemss.length) {
            //        $scope.selected = [];
            //    } else if ($scope.selected.length === 0 || $scope.selected.length > 0) {
            //        $scope.selected = $scope.itemss.slice(0);
            //    }
            //};

            $scope.hide = function () {
                $mdDialog.hide();
            };

            $scope.cancel = function () {
                $mdDialog.cancel();
            };

            //$scope.saveNewTrack = function () {
            //    console.log("answer save");
            //    $resource('http://104.197.128.152:8000/v1/tracks').save({'title': $scope.newTrack.Title,'rating': parseFloat($scope.newTrack.Rating), 'genres': $scope.selected}, function () {
            //    });
            //    $mdDialog.hide();
            //};
        };




        //Update genre/////////////////////////////////////////////////////////////////////////////done

        $scope.updatedGenreId = null;
        $scope.updatedGenreName = '';
        $scope.showPromptEditGenre = function (genreId, genreName, ev) {

            $scope.updatedGenreId = genreId;
            $scope.updatedGenreName = genreName;

            var confirm = $mdDialog.prompt()
                .title('Edit Genre Name')
                //.textContent('Rename genre.')
                .placeholder('Rename Genre')
                .ariaLabel('Updated Genre name')
                .initialValue(genreName)
                .targetEvent(ev)
                .ok('Update')
                .cancel('Cancel');

            $mdDialog.show(confirm).then(function (result) {
                //console.log('ok',result);

                $scope.data = {
                    id: $scope.updatedGenreId,
                    name: result
                };

                $http({
                    method: 'POST',
                    url: 'http://104.197.128.152:8000/v1/genres/' + $scope.updatedGenreId,
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    data: $scope.data
                }).then(
                    function (successCb) {
                        console.log('SUCCESS::', JSON.stringify(successCb));
                        $scope.getAllGenres($scope.firstCallGenre);
                    },
                    function (failureCb) {
                        console.log('FAILED::', JSON.stringify(failureCb));
                    }
                );
            }, function () {
                console.log('cancel edit genre');
            });
        };


        ///////////////////////////////////////////////////////////////////////////////

        
        //$scope.Mahesh = {};
        //$scope.Mahesh.name = "Mahesh Parashar";
        //$scope.Mahesh.rollno = 1;
        //
        //$scope.Piyush = {};
        //$scope.Piyush.name = "Piyush Parashar";
        //$scope.Piyush.rollno = 2;


    });

    //.directive('student', function () {
    //    var directive1 = {};
    //    directive1.restrict = 'E';
    //    directive1.template = "Student: <b>{{student.name}}</b> , Roll No: <b>{{student.rollno}}</b>";
    //
    //    directive1.scope = {
    //        student: "=name"
    //    };
    //
    //    directive1.compile = function (element, attributes) {
    //        element.css("border", "1px solid #cccc00");
    //
    //        var linkFunction = function ($scope, element, attributes) {
    //            element.html("Student: <b>" + $scope.student.name + "</b> , Roll No: <b>" + $scope.student.rollno + "</b><br/>");
    //            element.css("background-color", "#ff00ff");
    //        };
    //        return linkFunction;
    //    };
    //
    //    return directive1;
    //});

