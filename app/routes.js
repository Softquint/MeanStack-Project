// grab the nerd model we just created
var Nerd = require('../app/models/nerd');
var jwt             = require('jsonwebtoken'); // used to create, sign, and verify tokens
var crypto = require('crypto-extra');
    
module.exports = function(app) {

        // server routes ===========================================================
        // handle things like api calls
        // authentication routes
        // sample api route
        app.get('/api/nerds', function(req, res) {
            // use mongoose to get all nerds in the database
            Nerd.find(function(err, nerds) {
                if (err)                // if there is an error retrieving, send the error.
                    res.send(err);      // nothing after res.send(err) will execute
                res.json(nerds);        // return all nerds in JSON format
            });
        });

        // route to handle creating goes here (app.post)
        app.post('/api/nerds', function(req, res) {
        var nerd = new Nerd();          // create a new instance of the Nerd model

        /** Hasing the Passord **/
        var encrypted = crypto.encrypt(req.body.password, 'this-is-my-first-hasing');
        //var hashedPassword = passwordHash.generate(req.body.password);
        nerd.fname = req.body.fname;
        nerd.lname = req.body.lname;
        nerd.email = req.body.email;
        nerd.userid = req.body.userid;
        nerd.password = encrypted;
        nerd.cnfpassword = encrypted;
        nerd.shortname = req.body.shortname;  // set the bears name (comes from the request)
            nerd.save(function(err) {   // save the bear and check for errors
                if (err)
                    res.send(err);
                res.send(nerd);
            });
        });
        // route to handle delete goes here (app.delete)
        app.delete('/api/nerds/:nerd_id', function(req, res) {
            Nerd.remove({
                _id: req.params.nerd_id
            }, function(err, nerd) {
                if (err)
                    res.send(err);
                res.json({ message: 'Successfully deleted' });
            });
        });

        // route to handle update goes here (app.put)
        app.put('/api/nerds/:nerd_id', function(req, res) {
            // use our bear model to find the bear we want
            Nerd.findById(req.params.nerd_id, function(err, nerd) {
                if (err)
                    res.send(err);
                nerd.fname = req.body.fname;
                nerd.lname = req.body.lname;
                nerd.email = req.body.email;
                nerd.userid = req.body.userid;
                    nerd.shortname = req.body.shortname;  // update the bears info
                    // save the bear
                    nerd.save(function(err) {
                        if (err)
                            res.send(err);
                        res.json({ message: 'Nerd updated!' });
                    });

                });
        });

        // route to authenticate a user (POST http://localhost:8080/api/authenticate)
        app.post('/api/login', function(req, res) {
            // find the user
            Nerd.findOne({
                email : req.body.email
            }, function(err, nerd) {
                if (err) throw err;
                    if (!nerd) {
                        res.json({ success: false, message: 'Authentication failed. nerd not found.' });
                    } else if (nerd) {
                        // check if password matches
                        var encrypted = crypto.encrypt(req.body.password, 'this-is-my-first-hasing');
                        console.log(encrypted);
                        if (nerd.password != encrypted) {
                            res.json({ success: false, message: 'Authentication failed. Wrong password.' });
                        } else {
                            // if nerd is found and password is right
                            // create a token
                            var token = jwt.sign(nerd, app.get('superSecret'), {
                                expiresInMinutes: 1440 // expires in 24 hours
                            });
                        // return the information including token as JSON
                        res.json({
                            success: true,
                            message: 'Enjoy your token!',
                            token: token,
                            email : nerd.email,
                            fname : nerd.fname,
                            lname : nerd.lname,
                            shortname : nerd.shortname
                        });
                    }  
                }

            });
        });

        // frontend routes =========================================================
        // route to handle all angular requests
        app.get('*', function(req, res) {
            res.sendfile('./public/index.html'); // load our public/index.html file
        });
        
        app.get('*', function(req, res) {
            res.sendfile('./public/views/login.html'); // load our public/index.html file
        });
    };
