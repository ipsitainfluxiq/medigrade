var express = require('express');
var randomString = require('random-string');
var app = express();
var port = process.env.PORT || 3020;
var request = require('request');
var cheerio = require('cheerio');
var http = require('http').Server(app);
var mailer = require("nodemailer");
var bodyParser = require('body-parser');
app.use(bodyParser.json({ parameterLimit: 10000000,
    limit: '90mb'}));

var multer  = require('multer');
var datetimestamp='';
var filename='';
var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        //  cb(null, '../uploads/');
        // cb(null, '../src/assets/images/uploads/'); //for local
      //  cb(null, '/home/nexhealthtoday/public_html/assets/images/uploads/'); //for server
        cb(null, '../assets/images/uploads/'); //for server
    },
    filename: function (req, file, cb) {
        //console.log(cb);

        console.log(file.originalname);
        filename=file.originalname.split('.')[0].replace(/ /g,'') + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1];
        console.log(filename);
        cb(null, filename);
    }
});
var EventEmitter = require('events').EventEmitter;
const emitter = new EventEmitter()
//emitter.setMaxListeners(100)
// or 0 to turn off the limit
emitter.setMaxListeners(0)
var upload = multer({ //multer settings
    storage: storage
}).single('file');

app.use(bodyParser.json({type: 'application/vnd.api+json'}));

app.use(function(req, res, next) { //allow cross origin requests
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

/** API path that will upload the files */
app.get('/uploads', function(req, res) {
    datetimestamp = Date.now();
    upload(req,res,function(err){
        if(err){
            res.json({error_code:1,err_desc:err});
            return;
        }

        else{
            //  res.json(filename[filename.length-1]);
            //  setTimeout(function () {
            //console.log('-----');

            // console.log(filename[filename.length-1]);
            // console.log(filename.length);
            console.log(filename);
            //  filename=[];

            res.send(JSON.stringify(filename));
            return;
            //  },1500);
        }


    });
});

var mongodb = require('mongodb');
var db;
var url = 'mongodb://localhost:27017/nexhealthcare';

var MongoClient = mongodb.MongoClient;

MongoClient.connect(url, function (err, database) {
    if (err) {
        console.log(err);

    }else{
        db=database;
        console.log('connected');
    }});

/*-----------------------------------EXAMPLES_START------------------------------------------*/
app.get('/addexpertarea', function (req, resp) {
    value1 = {title: 'sdf',description: '5435', priority: 6,status: 0};
    var collection = db.collection('addexpertarea');
    collection.insert([value1], function (err, result) {
        if (err) {
            resp.send(err);
        } else {
            resp.send('Inserted %d documents into the "users" collection. The documents inserted with "_id" are:', result.length, result);
        }
    });
});
app.get('/testlist', function (req, resp) {
    var collection = db.collection('addexpertarea');
    collection.find().toArray(function(err, items) {
        resp.send(JSON.stringify(items));
    });
});
/*-----------------------------------EXAMPLES_END------------------------------------------*/
function randomnogenerate(){
    return randomString({
        length: 10,
        numeric: true,
        letters: false,
        special: false,
    });
}

/*app.post('/signup',function(req,resp){
    var signuptime = Date.now();
    var logintime = Date.now();
    var generatecode = randomnogenerate();
    var collection = db.collection('users');
    collection.find({uniqueid:generatecode}).toArray(function(err, items) {
        if(items.length>0){
            randomnogenerate();
        }
        else{
            collection.find({email:req.body.email}).toArray(function(err, items) {
                if(items.length>0){
                    console.log('already exists with same mail id');
                    resp.send(JSON.stringify({'status':'error','id':'-1'}));
                }
                else{
                    collection.find({username:req.body.username}).toArray(function(err, items) {
                        if(items.length>0){
                            console.log('already exists with same username');
                            resp.send(JSON.stringify({'status':'error','id':'-2'}));
                        }
                        else{
                            var crypto = require('crypto');
                            var secret = req.body.password;
                            var hash = crypto.createHmac('sha256', secret)
                                .update('password')
                                .digest('hex');
                            collection.insert([{
                                firstname: req.body.firstname,
                                lastname: req.body.lastname,
                                username: req.body.username,
                                email: req.body.email,
                                password: hash,
                                address: req.body.address,
                                address2: req.body.address2,
                                city: req.body.city,
                                state: req.body.state,
                                zip: req.body.zip,
                                gender: req.body.gender,
                                dob: req.body.dob,
                                phone: req.body.phone,
                                type: req.body.type,
                                signup_step: req.body.signup_step,
                                uniqueid:generatecode,
                                signuptime:signuptime,
                                logintime:logintime,
                                logintoken:generatecode,
                            }], function (err, result) {
                                if (err) {
                                    console.log('error'+err);
                                    resp.send(JSON.stringify({'status':'error','id':0}));
                                } else {
                                    console.log(result);
                                    console.log('============');
                                    console.log(result.ops[0]);
                                    //  resp.send(JSON.stringify({'status':'success','id':result.ops[0]._id}));
                                    var collection1 = db.collection('tags');
                                    collection1.find({tagname:'Employment Contract Pending'}).toArray(function(err1, items1) {
                                        if(items1.length>0){
                                            var collection2 = db.collection('usertags');
                                            collection2.insert([{
                                                userid: result.ops[0]._id,
                                                tagid: items1[0]._id,
                                            }], function (err2, result2) {
                                                if (err2) {
                                                    console.log('error2'+err2);
                                                    resp.send(JSON.stringify({'status':'error','id':0}));
                                                } else {
                                                   // console.log(result2);
                                                 //   result.ops[0].logintoken=generatecode;
                                                    resp.send(JSON.stringify({'status':'success','id':result.ops[0]}));
                                                }
                                            });
                                        }
                                    });


                                }
                            });
                        }
                    });
                }
            });
        }
    });

});*/

app.get('/signup',function(req,resp){
    req.body=req.query;
    console.log('?');
    //resp.send({'data':req.body});
    //return;
    var signuptime = Date.now();
    var logintime = Date.now();
    var generatecode = randomnogenerate();
    var collection = db.collection('users');
    //  collection.find({uniqueid:generatecode}).toArray(function(err, items) {
    collection.find({uniqueid:req.body.uniqueid}).toArray(function(err, items) {
        if(items.length>0){
            console.log('??');
            randomnogenerate();
        }
        else{
            var generatecodetring = callrandomstring();
            console.log('???');
            collection.find({logintoken:generatecodetring}).toArray(function(err, items) {
                if(items.length>0){
                    callrandomstring();
                    console.log('????');
                }
                else{
                    collection.find({email:req.body.email}).toArray(function(err, items) {
                        if(items.length>0){
                            console.log('already exists with same mail id');
                            resp.send(JSON.stringify({'status':'error','id':'-1'}));
                        }
                        else{
                            collection.find({username:req.body.username}).toArray(function(err, items) {
                                if(items.length>0){
                                    console.log('already exists with same username');
                                    resp.send(JSON.stringify({'status':'error','id':'-2'}));
                                }
                                else{
                                   // console.log('uniqueid--------');
                                   // console.log(generatecode);
                                    var crypto = require('crypto');
                                    var secret = req.body.password;
                                    var hash = crypto.createHmac('sha256', secret)
                                        .update('password')
                                        .digest('hex');
                                    if(req.body.mastergroupid.length>3)
                                    var o_mastergroupid = new mongodb.ObjectID(req.body.mastergroupid);
                                    else var o_mastergroupid=0;
                                    console.log('logintoken-----------');
                                    console.log(generatecodetring);
                                    collection.insert([{
                                        firstname: req.body.firstname,
                                        lastname: req.body.lastname,
                                        username: req.body.username,
                                        email: req.body.email,
                                        password: hash,
                                        address: req.body.address,
                                        address2: req.body.address2,
                                        city: req.body.city,
                                        state: req.body.state,
                                        zip: req.body.zip,
                                        gender: req.body.gender,
                                        dob: req.body.dob,
                                        phone: req.body.phone,
                                        type: req.body.type,
                                        agentexperience: req.body.agentexperience,
                                        olderclients: req.body.olderclients,
                                        noofplanBcard: req.body.noofplanBcard,
                                        webinarkey: req.body.webinarkey,
                                        signup_step: req.body.signup_step,
                                        // uniqueid:generatecode,
                                        uniqueid:req.body.uniqueid,
                                        signuptime:signuptime,
                                        logintime:logintime,
                                        nooflogin:1,
                                        logintoken:generatecodetring,
                                        cgxamountoflead:req.body.cgxamountoflead,
                                        pgxvalueoflead:req.body.pgxvalueoflead,
                                        addedby:req.body.addedby,
                                        iswebinarchekced :req.body.iswebinarchekced,
                                        mastergroupid :o_mastergroupid,
                                        istestuser :'',
                                    }], function (err, result) {
                                        if (err) {
                                            console.log('error'+err);
                                            resp.send(JSON.stringify({'status':'error','id':0}));
                                        } else {
                                            // console.log(result);
                                            console.log('============');
                                            console.log(result.ops[0]);
                                            //  resp.send(JSON.stringify({'status':'success','id':result.ops[0]._id}));
                                            var collection1 = db.collection('tags');
                                            collection1.find({tagname:'Employment Contract Pending'}).toArray(function(err1, items1) {
                                                if(items1.length>0){
                                                    var collection2 = db.collection('usertags');
                                                    collection2.insert([{
                                                        userid: result.ops[0]._id,
                                                        tagid: items1[0]._id,
                                                    }], function (err2, result2) {
                                                        if (err2) {
                                                            console.log('error2'+err2);
                                                            resp.send(JSON.stringify({'status':'error','id':0}));
                                                        } else {
                                                            // console.log(result2);
                                                            //   result.ops[0].logintoken=generatecode;
                                                            var smtpTransport = mailer.createTransport({
                                                                service: "Gmail",
                                                                auth: {
                                                                    user: "itplcc40@gmail.com",
                                                                    pass: "DevelP7@"
                                                                }
                                                            });

                                                            var mail = {
                                                                from: "Greenvalley Health Admin <support@greenvalley.com>",
                                                                to: req.body.email,
                                                                subject: 'Welcome to the Greenvalley Health family',
                                                                html: 'Thank you for signing up with Green Valley Health!<br/><br/>We are very excited to have you a part of the Green Valley family. You will be earning commissions and saving lives offering our Cancer Genomics with PGX supplemental to your current contacts!<br/>Please be sure to watch the required video for test administer process and CRM usage in our back office. You should have also received an email from Go2Webinar for the scheduled onboarding call. Once you have completed both you will be ready to get started with Greenvalley Health Group and offering this incredible test!<br/><br/>Login Page:<a href=https://greenvalleyportal.com/#/log-in>https://greenvalleyportal.com/#/log-in</a><br/>User Name: ' +req.body.username+'<br/>Password: '+req.body.password+'<br/><br/>'
                                                            }
                                                            smtpTransport.sendMail(mail, function (error, response) {
                                                                console.log('send');
                                                                smtpTransport.close();
                                                            });
                                                            resp.send(JSON.stringify({'status':'success','id':result.ops[0]}));
                                                        }
                                                    });
                                                }
                                            });


                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });

});

app.get('/login', function (req, resp) {
    var collection = db.collection('users');
    var generatecode = callrandomstring();
    req.body=req.query;
    collection.find({logintoken:generatecode}).toArray(function(err, items) {
        if(items.length>0){
            callrandomstring();
        }
        else {
            datetimestamp = Date.now();
            var crypto = require('crypto');
            var secret = req.body.password;
            var hash = crypto.createHmac('sha256', secret)
                .update('password')
                .digest('hex');

            collection.find({username: req.body.usernameoremail}).toArray(function (err, items) {
                //  console.log('items[0]');
                // console.log(items[0]);
                if (items.length == 0) {
                    collection.find({email: req.body.usernameoremail}).toArray(function (err, items) {
                        //  console.log('items[0]secnd');
                        //  console.log(items[0]);
                        if (items.length == 0) {
                            resp.send(JSON.stringify({'status': 'error', 'msg': 'Invalid Username/Email id...'}));
                            return;
                        }
                        if (items.length > 0 && items[0].password != hash) {
                            resp.send(JSON.stringify({'status': 'error', 'msg': 'Password Doesnot match'}));
                            return;
                        }
                        if (items.length > 0 && items[0].password == hash) {
                            var data={
                                logintime: datetimestamp,
                            }
                            collection.update(
                                {email: req.body.usernameoremail},
                                {
                                    $set: data,
                                    $inc: { "nooflogin": 1 }
                                    },
                                function (err, results) {
                                    if (err) {
                                        resp.send(JSON.stringify({'status': 'error', 'id': err}));
                                        throw err;
                                    }
                                    else {
                                       /* collection.update(
                                            {username: req.body.usernameoremail},
                                            { $inc: { "nooflogin": 1 } },
                                        )*/
                                        collection.update({email: req.body.usernameoremail}, {$set: {logintoken: generatecode}}, function (err, results) {
                                            if (err) {
                                                console.log('error'+err);
                                                resp.send(JSON.stringify({'status':'error','id':err}));
                                                return;
                                            } else {
                                                items[0].logintoken=generatecode;
                                                resp.send(JSON.stringify({'status': 'success', 'msg': items[0]}));
                                                return;
                                            }
                                        });
                                    }

                                });
                        }
                    });
                }
                if (items.length > 0 && items[0].password != hash) {
                    resp.send(JSON.stringify({'status': 'error', 'msg': 'Password Doesnot match'}));
                    return;
                }
                if (items.length > 0 && items[0].password == hash) {
                    var data={
                        logintime: datetimestamp,
                    }
                    console.log('datetimestamp======');
                    console.log(datetimestamp);
                    collection.update(
                        {username: req.body.usernameoremail},
                        //{$set: data},
                        {
                            $set: data,
                            $inc: { "nooflogin": 1 }
                        },
                      //  { $inc: { "nooflogin": 1 } },
                        function (err, results) {
                            if (err) {
                                resp.send(JSON.stringify({'status': 'error', 'id': err}));
                                throw err;
                            }
                            else {
                                /*collection.update(
                                    {username: req.body.usernameoremail},
                                    { $inc: { "nooflogin": 1 } },
                                )
*/
                                console.log('results;-------');
                                collection.update({username: req.body.usernameoremail}, {$set: {logintoken: generatecode}}, function (err, results) {
                                    if (err) {
                                        console.log('error'+err);
                                        resp.send(JSON.stringify({'status':'error','id':1}));
                                        return;
                                    } else {
                                        items[0].logintoken=generatecode;
                                        console.log('items[0]------');
                                        console.log(items[0]);
                                        resp.send(JSON.stringify({'status': 'success', 'msg': items[0]}));
                                        return;
                                    }
                                });
                            }
                        });
                }
            });
        }
    });
});

app.post('/addcompensation',function(req,resp){
    var collection = db.collection('compensations');
    var o_id = new mongodb.ObjectID(req.body.userid);
    var generatecode = callrandomstring();
    collection.find({token:generatecode}).toArray(function(err, items) {
        if(items.length>0){
            callrandomstring();
        }
        else{
            collection.insert([{
                userid: o_id,
                amount: req.body.amount,
                pgxvalue: req.body.pgxvalue,
                token:generatecode

            }], function (err, result) {
                if (err) {
                    console.log('error'+err);
                    resp.send(JSON.stringify({'status':'error','id':0}));
                } else {
                    console.log(result);
                    resp.send(JSON.stringify({'status':'success','id':result.ops[0]._id}));
                }
            });
        }
    });

});


app.get('/noteadd',function(req,resp){
    var collection = db.collection('patientnotes');
    req.body=req.query;
    var added_on = Date.now();
    var o_patient_id = new mongodb.ObjectID(req.body.patientid);
    var o_added_by_id = new mongodb.ObjectID(req.body.added_by);
    /* var note={
         added_by: o_added_by_id,
         note: req.body.note,
         added_on: added_on
     }*/
    collection.insert([{
        patientid: o_patient_id,
        added_by: o_added_by_id,
        note: req.body.note,
        added_on: added_on
    }], function (err, result) {
        if (err) {
            console.log('error' + err);
            resp.send(JSON.stringify({'status': 'error', 'id': 0}));
        } else {
            console.log(result);
            resp.send(JSON.stringify({'status': 'success', 'id': result.ops[0]._id}));
        }
    });
});

app.get('/noteupdate',function(req,resp){
  req.body=req.query;
    var collection = db.collection('patientnotes');
    var o_id = new mongodb.ObjectID(req.body._id);
    var data = {
        note: req.body.note,
    }
    collection.update({_id:o_id}, {$set: data}, true, true);
    resp.send(JSON.stringify({'id':'', 'status':'success'}));
});

app.get('/notedelete',function(req,resp){
  req.body=req.query;
    var collection = db.collection('patientnotes');
    var o_id = new mongodb.ObjectID(req.body._id);
    collection.deleteOne({_id: o_id}, function(err, result) {
        if (err){
            resp.send("failed");
            throw err;
        }
        else {
            resp.send(JSON.stringify({'status':'success'}));
        }
    });
});

app.get('/noteaddforusers',function(req,resp){
  req.body=req.query;
    var collection = db.collection('usernotes');
    var added_on = Date.now();
    var o_user_id = new mongodb.ObjectID(req.body.userid);
    var o_added_by_id = new mongodb.ObjectID(req.body.added_by);
    /* var note={
         added_by: o_added_by_id,
         note: req.body.note,
         added_on: added_on
     }*/
    collection.insert([{
        userid: o_user_id,
        added_by: o_added_by_id,
        note: req.body.note,
        added_on: added_on
    }], function (err, result) {
        if (err) {
            console.log('error' + err);
            resp.send(JSON.stringify({'status': 'error', 'id': 0}));
        } else {
            console.log(result);
            resp.send(JSON.stringify({'status': 'success', 'id': result.ops[0]._id}));
        }
    });
});

app.get('/noteupdateforusers',function(req,resp){
  req.body=req.query;
    var collection = db.collection('usernotes');
    var o_id = new mongodb.ObjectID(req.body._id);
    var data = {
        note: req.body.note,
    }

    collection.update({_id:o_id}, {$set: data}, true, true);
    resp.send(JSON.stringify({'id':'', 'status':'success'}));
});

app.get('/notedeleteforusers',function(req,resp){
  req.body=req.query;
    var collection = db.collection('usernotes');
    var o_id = new mongodb.ObjectID(req.body._id);
    collection.deleteOne({_id: o_id}, function(err, result) {
        if (err){
            resp.send("failed");
            throw err;
        }
        else {
            resp.send(JSON.stringify({'status':'success'}));
        }
    });
});

app.get('/repcontract',function(req,resp){
    req.body=req.query;
    console.log('repcontract');
    datetimestamp = Date.now();
    var o_id = new mongodb.ObjectID(req.body.addedby);
    //  console.log(o_id);
    var collection = db.collection('repcontract');
    collection.insert([{
        name: req.body.name,
        addedby: o_id,
        compensationgrade: req.body.compensationgrade,
        pgxvalue: req.body.pgxvalue,
        time: datetimestamp,
    }], function (err, result) {
        if (err) {
            console.log('error'+err);
            resp.send(JSON.stringify({'status':'error','id':0}));
        } else {
            //  console.log(result);
            var collection1 = db.collection('users');
            collection1.update({_id: o_id}, {$set: {signup_step:2}},function(err, results) {
                if (err){
                    resp.send(JSON.stringify({'status':'error','id':0}));
                    throw err;
                }
                else {
                    var collection2 = db.collection('tags');
                    // resp.send(JSON.stringify({'status':'success','id':result.ops[0]._id}));
                    collection2.find({tagname:'Employment Contract Pending'}).toArray(function(err2, items2) {
                        console.log('o_id '+ o_id);
                        console.log('tagid '+ items2[0]._id);
                        var collection5 = db.collection('usertags');
                        collection5.deleteOne({userid: o_id, tagid: items2[0]._id}, function(err3, result3) {
                            if (err3){
                                resp.send("failed");
                                throw err;
                            }
                            else {
                                console.log(result3);
                              //  collection2.find({tagname:'Training Pending'}).toArray(function(err4, items4) {
                                collection2.find({tagname:'Agreement Accepted'}).toArray(function(err4, items4) {
                                    if(items4.length>0){
                                        //  var collection5 = db.collection('usertags');
                                        collection5.insert([{
                                            userid: o_id,
                                            tagid: items4[0]._id,
                                        }], function (err2, result2) {
                                            if (err2) {
                                                console.log('error2'+err2);
                                                resp.send(JSON.stringify({'status':'error','id':0}));
                                            } else {
                                                console.log(result2);
                                                resp.send(JSON.stringify({'status':'success','id':result.ops[0]._id}));
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    });
                }
            });
            //  resp.send(JSON.stringify({'status':'success','id':result.ops[0]._id}));
        }
    });
});
app.get('/agreement',function(req,resp){
  req.body=req.query;
  console.log('agreement');
  datetimestamp = Date.now();
  var o_id = new mongodb.ObjectID(req.body.userid);
      var collection1 = db.collection('users');
      collection1.update({_id: o_id}, {$set: {signup_step:3}},function(err, results) {
        if (err){
          resp.send(JSON.stringify({'status':'error','id':0}));
          throw err;
        }
        else {
          var collection2 = db.collection('tags');
          collection2.find({tagname:'Agreement Accepted'}).toArray(function(err2, items2) {
            var collection5 = db.collection('usertags');
            collection5.deleteOne({userid: o_id, tagid: items2[0]._id}, function(err3, result3) {
              if (err3){
                resp.send("failed");
                throw err;
              }
              else {
                collection2.find({tagname:'Training Pending'}).toArray(function(err4, items4) {
                  if(items4.length>0){
                    collection5.insert([{
                      userid: o_id,
                      tagid: items4[0]._id,
                    }], function (err2, result2) {
                      if (err2) {
                        console.log('error2'+err2);
                        resp.send(JSON.stringify({'status':'error','id':0}));
                      } else {
                        console.log(result2);
                        resp.send(JSON.stringify({'status':'success','id':1}));
                      }
                    });
                  }
                });
              }
            });
          });
        }
      });
});
app.get('/markasdone',function(req,resp){
    req.body=req.query;
    var collection = db.collection('users');
    var data = {
      iswebinarchekced: 1,
    }
    var o_id = new mongodb.ObjectID(req.body.userid);

    collection.update({_id: o_id}, {$set: data},function(err, results) {
        if (err){
            resp.send(JSON.stringify({'status':'error','id':0}));
            throw err;
        }
        else {
            var collection2 = db.collection('tags');
            collection2.find({tagname:'Webinar Pending'}).toArray(function(err2, items2) {
                console.log('tagid '+ items2[0]._id);
                var collection5 = db.collection('usertags');
                collection5.deleteOne({userid: o_id, tagid: items2[0]._id}, function(err3, result3) {
                    if (err3){
                        resp.send("failed");
                        throw err;
                    }
                    else {
                        collection2.find({tagname:'CRM Access'}).toArray(function(err4, items4) {
                            if(items4.length>0){
                                collection5.insert([{
                                    userid: o_id,
                                    tagid: items4[0]._id,
                                }], function (err2, result2) {
                                    if (err2) {
                                        console.log('error2'+err2);
                                        resp.send(JSON.stringify({'status':'error','id':0}));
                                    } else {
                                        console.log(result2);
                                        resp.send(JSON.stringify({'status':'success','id':1}));
                                    }
                                });
                            }
                        });
                    }
                });
            });
        }
    });
});



/*app.post('/markasdone',function(req,resp){
    var collection = db.collection('users');
    var data = {
        iswebinarchekced: req.body.iswebinarchekced,
    }
    var o_id = new mongodb.ObjectID(req.body.userid);
    collection.update({_id:o_id}, {$set: data}, true, true);

    resp.send(JSON.stringify({'status':'success'}));
});*/
app.get('/addtag', function (req, resp) {
    var collection = db.collection('tags');
    collection.insert([{
        tagname: '',
    }], function (err, result) {
        if (err) {
            console.log('error'+err);
            resp.send(JSON.stringify({'status':'error','id':0}));
        } else {
            console.log(result);
            resp.send(JSON.stringify({'status':'success','id':result.ops[0]._id}));
        }
    });
});

app.post('/trainingvideostatus',function(req,resp){
    console.log('trainingvideostatus');
    var o_id = new mongodb.ObjectID(req.body.userid);
    console.log(o_id);
    var collection = db.collection('trainingvideostatusindex');
    collection.insert([{
            userid: o_id,
            timeindex: req.body.timeindex,
        }],
        function(err, result) {
            if (err){
                console.log('err');
                resp.send(JSON.stringify({'id':0, 'status':'Some error occured..!'}));
            }
            else {
                // resp.send(JSON.stringify({'id':result.ops[0]._id, 'status':'success'}));

                var collection2 = db.collection('tags');
                collection2.find({tagname: 'Training Pending'}).toArray(function (err2, items2) {
                    console.log('tagid ' + items2[0]._id);
                    var collection5 = db.collection('usertags');
                    collection5.deleteOne({userid: o_id, tagid: items2[0]._id}, function (err3, result3) {
                        if (err3) {
                            resp.send("failed");
                            throw err;
                        }
                        else {
                            console.log(result3);
                            collection2.find({tagname: 'Webinar Pending'}).toArray(function (err4, items4) {
                                if (items4.length > 0) {
                                    collection5.insert([{
                                        userid: o_id,
                                        tagid: items4[0]._id,
                                    }], function (err2, result2) {
                                        if (err2) {
                                            console.log('error2' + err2);
                                            resp.send(JSON.stringify({'status': 'error', 'id': 0}));
                                        } else {
                                            console.log(result2);
                                            resp.send(JSON.stringify({'status':'success','id':result.ops[0]._id}));
                                        }

                                    });
                                }
                            });
                        }
                    });
                });
            }
        });
});
app.get('/dashboardtrainingvideostatus',function(req,resp){
    req.body=req.query;
    console.log('trainingvideostatus');
    var o_id = new mongodb.ObjectID(req.body.userid);
    console.log(o_id);
    var collection = db.collection('trainingvideostatusindex');
    collection.insert([{
            userid: o_id,
            timeindex: req.body.timeindex,
        }],
        function(err, result) {
            if (err){
                console.log('err');
                resp.send(JSON.stringify({'id':0, 'status':'Some error occured..!'}));
            }
            else {
                // resp.send(JSON.stringify({'id':result.ops[0]._id, 'status':'success'}));
            //  var collection1 = db.collection('users');
             // collection1.update({_id: o_id}, {$set: {signup_step:4}},function(err, results) {});
                var collection2 = db.collection('tags');
                collection2.find({tagname: 'Training Pending'}).toArray(function (err2, items2) {
                    console.log('tagid ' + items2[0]._id);
                    var collection5 = db.collection('usertags');
                    collection5.deleteOne({userid: o_id, tagid: items2[0]._id}, function (err3, result3) {
                        if (err3) {
                            resp.send("failed");
                            throw err;
                        }
                        else {
                            console.log(result3);
                            collection2.find({tagname: 'Webinar Pending'}).toArray(function (err4, items4) {
                                if (items4.length > 0) {
                                    collection5.insert([{
                                        userid: o_id,
                                        tagid: items4[0]._id,
                                    }], function (err2, result2) {
                                        if (err2) {
                                            console.log('error2' + err2);
                                            resp.send(JSON.stringify({'status': 'error', 'id': 0}));
                                        } else {
                                            console.log(result2);
                                            //  resp.send(JSON.stringify({'status':'success','id':result.ops[0]._id}));
                                            var collection1 = db.collection('users');
                                            collection1.update({_id: o_id}, {$set: {signup_step: 4}}, function (err, results) {
                                                if (err) {
                                                    resp.send(JSON.stringify({'status': 'error', 'id': 0}));
                                                    throw err;
                                                }
                                                else {
                                                    resp.send(JSON.stringify({
                                                        'status': 'success',
                                                        'id': result.ops[0]._id
                                                    }));
                                                }

                                            });
                                        }

                                    });
                                }
                            });
                        }
                    });
                });
            }
            /*    collection.find({userid:req.body.userid}).toArray(function(err, items){
                    console.log(items[0]);
                    if(items.length==0){
                        collection.insert([{
                                userid: req.body.userid,
                                timeindex: req.body.timeindex,
                            }],
                            function(err, result) {
                                if (err){
                                    console.log('err');
                                    resp.send(JSON.stringify({'id':0, 'status':'Some error occured..!'}));
                                }
                                else{
                                    resp.send(JSON.stringify({'id':result.ops[0]._id, 'status':'success'}));
                                }
                            });
                    }
                    if(items.length>0){
                        var data = {
                            timeindex: req.body.timeindex,
                        }
                        collection.update({userid:req.body.userid}, {$set: data}, true, true);
                        resp.send(JSON.stringify({'id':items[0]._id, 'status':'success'}));
                    }
                });*/
        });
});

app.get('/trainingvideostatusforreplay',function(req,resp){
    req.body=req.query;
    var o_id = new mongodb.ObjectID(req.body.userid);
    console.log(o_id);
    var collection = db.collection('trainingvideostatusindex');
    collection.insert([{
            userid: o_id,
            timeindex: req.body.timeindex,
        }],
        function(err, result) {
            if (err){
                console.log('err');
                resp.send(JSON.stringify({'id':0, 'status':'Some error occured..!'}));
            }
            else{
                resp.send(JSON.stringify({'id':result.ops[0]._id, 'status':'success'}));
            }
        });
});

app.get('/gettrainingvideostatusindex',function (req,resp) {
    req.body=req.query;
    var collection = db.collection('trainingvideostatusindex');
    var o_id = new mongodb.ObjectID(req.body.userid);
    collection.find({userid:o_id}).toArray(function(err, items) {
        console.log(items.length);
        var len=items.length;
        console.log('len'+len);
        /*      if (err) {
                  console.log(err);
                  resp.send(JSON.stringify({'status':'error'}));
              } else {
                  resp.send(JSON.stringify({items[len-1]}));
              }*/
        if (err){
            resp.send(JSON.stringify({'status':0}));
        }
        else{
            resp.send(JSON.stringify({'status':items[len-1]}));
        }
    });
});

app.get('/getuserdetails',function (req,resp) {
    req.body=req.query;
    var collection = db.collection('users');
    var o_id = new mongodb.ObjectID(req.body.userid);
    collection.find({_id:o_id}).toArray(function(err, items) {
        if (err){
            resp.send(JSON.stringify({'id':0, 'status':'Some error occured..!'}));
        }
        else{
            console.log(items);
            // var hash = crypto.createHmac('sha256', secret).update('password').digest('hex');
            //  var hi = crypto.createDecipher('sha256', secret).update(string).final("ascii");
            resp.send(JSON.stringify({'id':items[0], 'status':'success'}));
        }
    });
});

app.get('/getcontractdetailsforpdf',function(req,resp){
    var resitem = {};
    var collection = db.collection('repcontract');
    var o_id = new mongodb.ObjectID(req.query.id);
    collection.find({addedby:o_id}).toArray(function(err, items) {
        if (err) {
            resp.send(JSON.stringify({'status':'error','id':0}));
        } else {
            resitem = items[0];
            resp.send(JSON.stringify({'status':'success','item':resitem}));
        }
    });
});
app.get('/getuserdetailsforpdf',function (req,resp) {
    var collection = db.collection('users');
    var o_id = new mongodb.ObjectID(req.query.id);
    collection.find({_id:o_id}).toArray(function(err, items) {
        if (err){
            resp.send(JSON.stringify({'id':0, 'status':'Some error occured..!'}));
        }
        else{
            console.log(items);
            // var hash = crypto.createHmac('sha256', secret).update('password').digest('hex');
            //  var hi = crypto.createDecipher('sha256', secret).update(string).final("ascii");
            resp.send(JSON.stringify({'item':items[0], 'status':'success'}));
        }
    });
});

app.get('/getuserdetailsbyuserid',function (req,resp) {
    req.body=req.query;
    var collection = db.collection('users');
    collection.find({username:req.body.username}).toArray(function(err, items) {
        if (err){
            resp.send(JSON.stringify({'id':0, 'status':'Some error occured..!'}));
        }
        else{
            console.log(items);
            resp.send(JSON.stringify({'id':items[0], 'status':'success'}));
        }
    });
});


app.get('/patientdetail',function(req,resp){
    req.body=req.query;
    var generatecode = randomnogenerate();
    var collection = db.collection('patients');
    var added_on = Date.now();
    var o_addedbyid = new mongodb.ObjectID(req.body.addedby);
    //  collection.find({uniqueid:generatecode}).toArray(function(err, items) {
    collection.find({uniqueid:req.body.uniqueid}).toArray(function(err, items) {
        if(items.length>0){
            randomnogenerate();
        }
        else{
            collection.insert([{
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                address: req.body.address,
                city: req.body.city,
                state: req.body.state,
                zip: req.body.zip,
                gender: req.body.gender,
                dob: req.body.dob,
                phone: req.body.phone,
                heightwidth: req.body.heightwidth,
                allergies: req.body.allergies,
                medicareclaim: req.body.medicareclaim,
                raceethnicity: req.body.raceethnicity,
                trackingno: req.body.trackingno,
                medicarecard: req.body.medicarecard,
                iscancer: req.body.iscancer,
                cancertypes: req.body.cancertypes,
                relation: req.body.relation,
                approxage: req.body.approxage,
                // uniqueid:generatecode,
                uniqueid:req.body.uniqueid,
                addedby:o_addedbyid,
                added_on:added_on,
                hit_map_value:''
            }], function (err, result) {
                if (err) {
                    console.log('error'+err);
                    resp.send(JSON.stringify({'status':'error','id':0}));
                } else {
                    /*  console.log('================');
                       console.log(result.ops[0]._id);
                       console.log(result);*/
                    // resp.send(JSON.stringify({'status':'success','id':result.ops[0]._id}));
                    var collection1 = db.collection('tags');
                    collection1.find({tagname:'Lead'}).toArray(function(err1, items1) {
                        if(items1.length>0){
                            var collection2 = db.collection('usertags');
                            collection2.insert([{
                                userid: result.ops[0]._id,
                                tagid: items1[0]._id,
                            }], function (err2, result2) {
                                if (err2) {
                                    console.log('error2'+err2);
                                    resp.send(JSON.stringify({'status':'error','id':0}));
                                } else {
                                    console.log(result2);
                                    resp.send(JSON.stringify({'status':'success','id':result.ops[0]._id}));
                                }
                            });
                        }
                    });
                }
            });
        }
    });

});
app.get('/getpatientdetailsbypatientid',function (req,resp) {
    req.body=req.query;
    var collection = db.collection('patientrecord');
    var o_id = new mongodb.ObjectID(req.body.patientid);
    collection.find({patientid: o_id }).toArray(function(err, items) {
        if (err){
            resp.send(JSON.stringify({'id':0, 'status':'Some error occured..!'}));
        }
        else{
            console.log(items);
            resp.send(JSON.stringify({'id':items[0], 'status':'success'}));
        }
    });
});
app.get('/getcommoncancersymptomsbypatientid',function (req,resp) {
    req.body=req.query;
    var collection = db.collection('commoncancersymptomsrecord');
    var o_id = new mongodb.ObjectID(req.body.patientid);
    collection.find({patientid: o_id }).toArray(function(err, items) {
        if (err){
            resp.send(JSON.stringify({'id':0, 'status':'Some error occured..!'}));
        }
        else{
            console.log(items);
            resp.send(JSON.stringify({'id':items[0], 'status':'success'}));
        }
    });
});

app.get('/getpgxbypatientid',function (req,resp) {
    req.body=req.query;
    var collection = db.collection('medicationpgxrecord');
    var o_id = new mongodb.ObjectID(req.body.patientid);
    collection.find({patientid: o_id }).toArray(function(err, items) {
        if (err){
            resp.send(JSON.stringify({'id':0, 'status':'Some error occured..!'}));
        }
        else{
            console.log(items);
            resp.send(JSON.stringify({'id':items[0], 'status':'success'}));
        }
    });
});


app.get('/patientapprove',function (req,resp) {
    req.body=req.query;
    var o_patientid = new mongodb.ObjectID(req.body.patientid);
    console.log(o_patientid);
    var collection2 = db.collection('usertags');
    collection2.find({userid: o_patientid}).toArray(function (err1, items1) {
        if (items1.length > 0) {
            var collection1 = db.collection('tags');
            collection1.find({tagname: 'PPS Accepted'}).toArray(function (err2, items2) {
                var data={
                    tagid: items2[0]._id
                }
                collection2.update({userid: o_patientid}, {$set: data}, function (err, result) {
                    if (err) {
                        resp.send(JSON.stringify({'status': 'error', 'id': 0}));
                        throw err;
                    }
                    else {
                        resp.send(JSON.stringify({'status': 'success'}));
                    }
                });
            });
        }
    });

});
app.get('/patientdecline',function (req,resp) {
    req.body=req.query;
    console.log('call');
    var o_patientid = new mongodb.ObjectID(req.body.patientid);
    console.log(o_patientid);
    var collection2 = db.collection('usertags');
    collection2.find({userid: o_patientid}).toArray(function (err1, items1) {
        if (items1.length > 0) {
            var collection1 = db.collection('tags');
            collection1.find({tagname: 'PPS Declined'}).toArray(function (err2, items2) {
                var data={
                    tagid: items2[0]._id
                }
                // console.log(data);
                collection2.update({userid: o_patientid}, {$set: data}, function (err, result) {
                    if (err) {
                        resp.send(JSON.stringify({'status': 'error', 'id': 0}));
                        throw err;
                    }
                    else {
                        resp.send(JSON.stringify({'status': 'success'}));
                    }
                });
            });
        }
    });
});
/*app.post('/patientapprove',function (req,resp) {
    var o_patientid = new mongodb.ObjectID(req.body.patientid);
    var collection1 = db.collection('tags');
    collection1.find({tagname: 'PPS Submitted'}).toArray(function (err1, items1) {
        if (items1.length > 0) {
            var collection2 = db.collection('usertags');
            collection2.find({tagid: items1[0]._id,userid: o_patientid}).toArray(function (err1, items1) {
                if (items1.length > 0) {
                    var collection2 = db.collection('usertags');
                    collection1.find({tagname: 'PPS Accepted'}).toArray(function (err2, items2) {
                        let data={
                            tagid: items2[0]._id
                        }
                        collection2.update({userid: o_patientid}, {$set: data}, function (err, result) {
                            if (err) {
                                resp.send(JSON.stringify({'status': 'error', 'id': 0}));
                                throw err;
                            }
                            else {
                                resp.send(JSON.stringify({'status': 'success'}));
                            }
                        });
                    });
                }
            });
        }
    });
});

app.post('/patientdecline',function (req,resp) {
    var o_patientid = new mongodb.ObjectID(req.body.patientid);
    var collection1 = db.collection('tags');
    collection1.find({tagname: 'PPS Submitted'}).toArray(function (err1, items1) {
        if (items1.length > 0) {
            var collection2 = db.collection('usertags');
            collection2.find({tagid: items1[0]._id,userid: o_patientid}).toArray(function (err1, items1) {
                if (items1.length > 0) {
                    var collection2 = db.collection('usertags');
                    collection1.find({tagname: 'PPS Declined'}).toArray(function (err2, items2) {
                        let data={
                            tagid: items2[0]._id
                        }
                        collection2.update({userid: o_patientid}, {$set: data}, function (err, result) {
                            if (err) {
                                resp.send(JSON.stringify({'status': 'error', 'id': 0}));
                                throw err;
                            }
                            else {
                                resp.send(JSON.stringify({'status': 'success'}));
                            }
                        });
                    });
                }
            });
        }
    });
});
*/
app.get('/getuniquerepid',function (req,resp) {
    var uniquenumber = randomString({
        length: 4,
        numeric: true,
        letters: false,
        special: false,
    });
    resp.send(JSON.stringify({'status':'success','id':uniquenumber}));
});
/*app.post('/patientrecord',function(req,resp){
    var o_patientid = new mongodb.ObjectID(req.body.patientid);
    var collection = db.collection('patientrpatientdetailecord');
            collection.insert([{
                patientid: o_patientid,
                cgx: req.body.cgx1,
                pgxval: req.body.pgxval,
                firstname: req.body.firstname1,
                lastname: req.body.lastname1,
                phone: req.body.phone1,
                address: req.body.address1,
                city: req.body.city1,
                state: req.body.state1,
                zip: req.body.zip1,
                dob: req.body.dob1,
                gender: req.body.gender1,
                race: req.body.race1,
                height: req.body.height1,
                width: req.body.width1,
                allergies: req.body.allergies1,
                medicareclaim: req.body.medicareclaim1,
                notes1: req.body.notes1,
                notes2: req.body.notes2,
                notes3: req.body.notes3,
                notes4: req.body.notes4,
                pharmacyinsurancename: req.body.pharmacyinsurancename,
                pharmacyid: req.body.pharmacyid,
                pharmacybin: req.body.pharmacybin,
                pharmacypcn: req.body.pharmacypcn,
                pharmacygroup: req.body.pharmacygroup,
                pharmacyhistory: req.body.pharmacyhistory,
                pharmacyissue: req.body.pharmacyissue,
                pharmacytreatment: req.body.pharmacytreatment,
                topicalpain: req.body.topicalpain,
                oralpain: req.body.oralpain,
                derma: req.body.derma,
                migrane: req.body.migrane,
                phtype1: req.body.phtype1,
                phtype2: req.body.phtype2,
                phage: req.body.phage,
                motype1: req.body.motype1,
                motype2: req.body.motype2,
                moage: req.body.moage,
                modead: req.body.modead,
                fatype2: req.body.fatype2,
                faage: req.body.faage,
                fadead: req.body.fadead,
                dautype1: req.body.dautype1,
                dautype2: req.body.dautype2,
                dauage: req.body.dauage,
                daudead: req.body.daudead,
                sontype1: req.body.sontype1,
                sontype2: req.body.sontype2,
                sonage: req.body.sonage,
                sondead: req.body.sondead,
                brotype1: req.body.brotype1,
                brotype2: req.body.brotype2,
                broage: req.body.broage,
                brodead: req.body.brodead,
                sistype1: req.body.sistype1,
                sistype2: req.body.sistype2,
                sisage: req.body.sisage,
                sisdead: req.body.sisdead,
                neptype1: req.body.neptype1,
                neptype2: req.body.neptype2,
                nepage: req.body.nepage,
                nepdead: req.body.nepdead,
                niecetype1: req.body.niecetype1,
                niecetype2: req.body.niecetype2,
                nieceage: req.body.nieceage,
                niecedead: req.body.niecedead,
                unctype1: req.body.unctype1,
                unctype2: req.body.unctype2,
                uncage: req.body.uncage,
                uncdead: req.body.uncdead,
                autntype1: req.body.autntype1,
                autntype2: req.body.autntype2,
                autnage: req.body.autnage,
                autndead: req.body.autndead,
                moftype1: req.body.moftype1,
                moftype2: req.body.moftype2,
                mofage: req.body.mofage,
                mofdead: req.body.mofdead,
                momotype1: req.body.momotype1,
                momotype2: req.body.momotype2,
                momoage: req.body.momoage,
                momodead: req.body.momodead,
                daftype1: req.body.daftype1,
                daftype2: req.body.daftype2,
                dafage: req.body.dafage,
                dafdead: req.body.dafdead,
                damtype1: req.body.damtype1,
                damtype2: req.body.damtype2,
                damage: req.body.damage,
                damdead: req.body.damdead,
                oth1type1: req.body.oth1type1,
                oth1type2: req.body.oth1type2,
                oth1age: req.body.oth1age,
                oth1dead: req.body.oth1dead,
                oth2type1: req.body.oth2type1,
                oth2type2: req.body.oth2type2,
                oth2age: req.body.oth2age,
                oth2dead: req.body.oth2dead,
                oth3type1: req.body.oth3type1,
                oth3type2: req.body.oth3type2,
                oth3age: req.body.oth3age,
                oth3dead: req.body.oth3dead,
                pgx1: req.body.pgx1,
                pgx2: req.body.pgx2,
                pgx3: req.body.pgx3,
                pgx4: req.body.pgx4,
                pgx5: req.body.pgx5,
                pgx6: req.body.pgx6,
                pgx7: req.body.pgx7,
                pgx8: req.body.pgx8,
                pgx9: req.body.pgx9,
                pgx10: req.body.pgx10,
                pgx11: req.body.pgx11,
                pgx12: req.body.pgx12,
                pgx13: req.body.pgx13,
                pgx14: req.body.pgx14,
                pgx15: req.body.pgx15,
                pgx16: req.body.pgx16,
                pgx17: req.body.pgx17,
                pgx18: req.body.pgx18,
                pgx19: req.body.pgx19,
                iscompleted: req.body.iscompleted,
            }], function (err, result) {
                if (err) {
                    console.log('error'+err);
                    resp.send(JSON.stringify({'status':'error','id':0}));
                } else {
                    console.log(result);
                    if(req.body.iscompleted==1){
                        var collection1 = db.collection('tags');
                        collection1.find({tagname:'PPS Submitted'}).toArray(function(err1, items1) {
                            if(items1.length>0){
                                var collection2 = db.collection('usertags');
                                collection2.insert([{
                                    userid: o_patientid,
                                    tagid: items1[0]._id,
                                }], function (err2, result2) {
                                    if (err2) {
                                        console.log('error2'+err2);
                                        resp.send(JSON.stringify({'status':'error','id':0}));
                                    } else {
                                        console.log(result2);
                                        resp.send(JSON.stringify({'status':'success','id':result.ops[0]._id}));
                                    }
                                });
                            }
                        });
                    }
                    else{
                        resp.send(JSON.stringify({'status':'success','id':result.ops[0]._id}));
                    }

                }
            });
});*/
app.get('/patientrecordold',function(req,resp) {
    req.body=req.query;
    var o_patientid = new mongodb.ObjectID(req.body.patientid);
    var collection = db.collection('patientrecord');
    collection.find({patientid: o_patientid}).toArray(function (err, items) {
        if (items.length == 0) {
            collection.insert([{
                patientid: o_patientid,
                cgx: req.body.cgx1,
                pgxval: req.body.pgxval,
                firstname: req.body.firstname1,
                lastname: req.body.lastname1,
                phone: req.body.phone1,
                address: req.body.address1,
                city: req.body.city1,
                state: req.body.state1,
                zip: req.body.zip1,
                dob: req.body.dob1,
                gender: req.body.gender1,
                race: req.body.race1,
                height: req.body.height1,
                width: req.body.width1,
              weight: req.body.weight1,
                allergies: req.body.allergies1,
                medicareclaim: req.body.medicareclaim1,
                notes1: req.body.notes1,
                notes2: req.body.notes2,
                notes3: req.body.notes3,
                notes4: req.body.notes4,
                pharmacyinsurancename: req.body.pharmacyinsurancename,
                pharmacyid: req.body.pharmacyid,
                pharmacybin: req.body.pharmacybin,
                pharmacypcn: req.body.pharmacypcn,
                pharmacygroup: req.body.pharmacygroup,
                pharmacyhistory: req.body.pharmacyhistory,
                pharmacyissue: req.body.pharmacyissue,
                pharmacytreatment: req.body.pharmacytreatment,
                topicalpain: req.body.topicalpain,
                oralpain: req.body.oralpain,
                derma: req.body.derma,
                migrane: req.body.migrane,
                phtype1: req.body.phtype1,
                phtype2: req.body.phtype2,
                phage: req.body.phage,
                phdead: req.body.phdead,
                motype1: req.body.motype1,
                motype2: req.body.motype2,
                moage: req.body.moage,
                modead: req.body.modead,
                fatype2: req.body.fatype2,
                faage: req.body.faage,
                fadead: req.body.fadead,
                dautype1: req.body.dautype1,
                dautype2: req.body.dautype2,
                dauage: req.body.dauage,
                daudead: req.body.daudead,
                sontype1: req.body.sontype1,
                sontype2: req.body.sontype2,
                sonage: req.body.sonage,
                sondead: req.body.sondead,
                brotype1: req.body.brotype1,
                brotype2: req.body.brotype2,
                broage: req.body.broage,
                brodead: req.body.brodead,
                sistype1: req.body.sistype1,
                sistype2: req.body.sistype2,
                sisage: req.body.sisage,
                sisdead: req.body.sisdead,
                neptype1: req.body.neptype1,
                neptype2: req.body.neptype2,
                nepage: req.body.nepage,
                nepdead: req.body.nepdead,
                niecetype1: req.body.niecetype1,
                niecetype2: req.body.niecetype2,
                nieceage: req.body.nieceage,
                niecedead: req.body.niecedead,
                unctype1: req.body.unctype1,
                unctype2: req.body.unctype2,
                uncage: req.body.uncage,
                uncdead: req.body.uncdead,
                autntype1: req.body.autntype1,
                autntype2: req.body.autntype2,
                autnage: req.body.autnage,
                autndead: req.body.autndead,
                moftype1: req.body.moftype1,
                moftype2: req.body.moftype2,
                mofage: req.body.mofage,
                mofdead: req.body.mofdead,
                momotype1: req.body.momotype1,
                momotype2: req.body.momotype2,
                momoage: req.body.momoage,
                momodead: req.body.momodead,
                daftype1: req.body.daftype1,
                daftype2: req.body.daftype2,
                dafage: req.body.dafage,
                dafdead: req.body.dafdead,
                damtype1: req.body.damtype1,
                damtype2: req.body.damtype2,
                damage: req.body.damage,
                damdead: req.body.damdead,
                oth1type1: req.body.oth1type1,
                oth1type2: req.body.oth1type2,
                oth1age: req.body.oth1age,
                oth1dead: req.body.oth1dead,
                oth2type1: req.body.oth2type1,
                oth2type2: req.body.oth2type2,
                oth2age: req.body.oth2age,
                oth2dead: req.body.oth2dead,
                oth3type1: req.body.oth3type1,
                oth3type2: req.body.oth3type2,
                oth3age: req.body.oth3age,
                oth3dead: req.body.oth3dead,
                pgx1: req.body.pgx1,
                pgx2: req.body.pgx2,
                pgx3: req.body.pgx3,
                pgx4: req.body.pgx4,
                pgx5: req.body.pgx5,
                pgx6: req.body.pgx6,
                pgx7: req.body.pgx7,
                pgx8: req.body.pgx8,
                pgx9: req.body.pgx9,
                pgx10: req.body.pgx10,
                pgx11: req.body.pgx11,
                pgx12: req.body.pgx12,
                pgx13: req.body.pgx13,
                pgx14: req.body.pgx14,
                pgx15: req.body.pgx15,
                pgx16: req.body.pgx16,
                pgx17: req.body.pgx17,
                pgx18: req.body.pgx18,
                /* pgx19: req.body.pgx19,*/
                iscompleted: req.body.iscompleted,
            }], function (err, result) {
                if (err) {
                    console.log('error' + err);
                    resp.send(JSON.stringify({'status': 'error', 'id': 0}));
                } else {
                    console.log(result);
                    if (req.body.iscompleted == 1) {
                        var collection1 = db.collection('tags');
                        collection1.find({tagname: 'PPS Submitted'}).toArray(function (err1, items1) {
                            if (items1.length > 0) {
                                // deleting lead for this same userid from usertags table , adding pps submit .
                                var collection2 = db.collection('usertags');
                                //  collection2.deleteOne({userid: o_patientid, tagid: '5b0cda8121eaaa0244d52b9e'}, function(err3, result3) {
                                // can't delete if i add tagid, so removed it
                                collection2.deleteOne({userid: o_patientid}, function(err3, result3) {
                                    if (err3){
                                        resp.send("failed");
                                        throw err;
                                    }
                                    else {
                                        collection2.insert([{
                                            userid: o_patientid,
                                            tagid: items1[0]._id,
                                        }], function (err2, result2) {
                                            if (err2) {
                                                console.log('error2' + err2);
                                                resp.send(JSON.stringify({'status': 'error', 'id': 0}));
                                            } else {
                                                console.log(result2);
                                                resp.send(JSON.stringify({'status': 'success', 'id': result.ops[0]._id}));
                                            }
                                        });
                                    }
                                });

                            }
                        });
                    }
                    else {
                        resp.send(JSON.stringify({'status': 'success', 'id': result.ops[0]._id}));
                    }

                }
            });
        }
        if (items.length > 0 ) {
            var data = {
                cgx: req.body.cgx1,
                pgxval: req.body.pgxval,
                firstname: req.body.firstname1,
                lastname: req.body.lastname1,
                phone: req.body.phone1,
                address: req.body.address1,
                city: req.body.city1,
                state: req.body.state1,
                zip: req.body.zip1,
                dob: req.body.dob1,
                gender: req.body.gender1,
                race: req.body.race1,
                height: req.body.height1,
              weight: req.body.weight1,
                width: req.body.width1,
                allergies: req.body.allergies1,
                medicareclaim: req.body.medicareclaim1,
                notes1: req.body.notes1,
                notes2: req.body.notes2,
                notes3: req.body.notes3,
                notes4: req.body.notes4,
                pharmacyinsurancename: req.body.pharmacyinsurancename,
                pharmacyid: req.body.pharmacyid,
                pharmacybin: req.body.pharmacybin,
                pharmacypcn: req.body.pharmacypcn,
                pharmacygroup: req.body.pharmacygroup,
                pharmacyhistory: req.body.pharmacyhistory,
                pharmacyissue: req.body.pharmacyissue,
                pharmacytreatment: req.body.pharmacytreatment,
                topicalpain: req.body.topicalpain,
                oralpain: req.body.oralpain,
                derma: req.body.derma,
                migrane: req.body.migrane,
                phtype1: req.body.phtype1,
                phtype2: req.body.phtype2,
                phage: req.body.phage,
                phdead: req.body.phdead,
                motype1: req.body.motype1,
                motype2: req.body.motype2,
                moage: req.body.moage,
                modead: req.body.modead,
                fatype2: req.body.fatype2,
                faage: req.body.faage,
                fadead: req.body.fadead,
                dautype1: req.body.dautype1,
                dautype2: req.body.dautype2,
                dauage: req.body.dauage,
                daudead: req.body.daudead,
                sontype1: req.body.sontype1,
                sontype2: req.body.sontype2,
                sonage: req.body.sonage,
                sondead: req.body.sondead,
                brotype1: req.body.brotype1,
                brotype2: req.body.brotype2,
                broage: req.body.broage,
                brodead: req.body.brodead,
                sistype1: req.body.sistype1,
                sistype2: req.body.sistype2,
                sisage: req.body.sisage,
                sisdead: req.body.sisdead,
                neptype1: req.body.neptype1,
                neptype2: req.body.neptype2,
                nepage: req.body.nepage,
                nepdead: req.body.nepdead,
                niecetype1: req.body.niecetype1,
                niecetype2: req.body.niecetype2,
                nieceage: req.body.nieceage,
                niecedead: req.body.niecedead,
                unctype1: req.body.unctype1,
                unctype2: req.body.unctype2,
                uncage: req.body.uncage,
                uncdead: req.body.uncdead,
                autntype1: req.body.autntype1,
                autntype2: req.body.autntype2,
                autnage: req.body.autnage,
                autndead: req.body.autndead,
                moftype1: req.body.moftype1,
                moftype2: req.body.moftype2,
                mofage: req.body.mofage,
                mofdead: req.body.mofdead,
                momotype1: req.body.momotype1,
                momotype2: req.body.momotype2,
                momoage: req.body.momoage,
                momodead: req.body.momodead,
                daftype1: req.body.daftype1,
                daftype2: req.body.daftype2,
                dafage: req.body.dafage,
                dafdead: req.body.dafdead,
                damtype1: req.body.damtype1,
                damtype2: req.body.damtype2,
                damage: req.body.damage,
                damdead: req.body.damdead,
                oth1type1: req.body.oth1type1,
                oth1type2: req.body.oth1type2,
                oth1age: req.body.oth1age,
                oth1dead: req.body.oth1dead,
                oth2type1: req.body.oth2type1,
                oth2type2: req.body.oth2type2,
                oth2age: req.body.oth2age,
                oth2dead: req.body.oth2dead,
                oth3type1: req.body.oth3type1,
                oth3type2: req.body.oth3type2,
                oth3age: req.body.oth3age,
                oth3dead: req.body.oth3dead,
                pgx1: req.body.pgx1,
                pgx2: req.body.pgx2,
                pgx3: req.body.pgx3,
                pgx4: req.body.pgx4,
                pgx5: req.body.pgx5,
                pgx6: req.body.pgx6,
                pgx7: req.body.pgx7,
                pgx8: req.body.pgx8,
                pgx9: req.body.pgx9,
                pgx10: req.body.pgx10,
                pgx11: req.body.pgx11,
                pgx12: req.body.pgx12,
                pgx13: req.body.pgx13,
                pgx14: req.body.pgx14,
                pgx15: req.body.pgx15,
                pgx16: req.body.pgx16,
                pgx17: req.body.pgx17,
                pgx18: req.body.pgx18,
                /* pgx19: req.body.pgx19,*/
                iscompleted: req.body.iscompleted,
            }
            collection.update({patientid: o_patientid}, {$set: data}, function (err, result) {
                if (err) {
                    resp.send(JSON.stringify({'status': 'error', 'id': 0}));
                    throw err;
                }
                else {
                    if (req.body.iscompleted == 1) {
                        var collection1 = db.collection('tags');
                        collection1.find({tagname: 'PPS Submitted'}).toArray(function (err1, items1) {
                            if (items1.length > 0) {
                                var collection2 = db.collection('usertags');
                                collection2.insert([{
                                    userid: o_patientid,
                                    tagid: items1[0]._id,
                                }], function (err2, result2) {
                                    if (err2) {
                                        console.log('error2' + err2);
                                        resp.send(JSON.stringify({'status': 'error', 'id': 0}));
                                    } else {
                                        console.log(result2);
                                        resp.send(JSON.stringify({'status': 'success'}));
                                    }
                                });
                            }
                        });
                    }
                    else {
                        resp.send(JSON.stringify({'status': 'success'}));
                    }
                    /*    collection.update({email: req.body.usernameoremail}, {$set: data}, function (err, results) {
                        if (err) {
                            console.log('error'+err);
                            resp.send(JSON.stringify({'status':'error','id':1}));
                            return;
                        } else {
                            resp.send(JSON.stringify({'status': 'success', 'msg': items[0]}));
                            return;
                        }
                    });*/
                }
            });
        }
    });
});


/*app.post('/patientrecord',function(req,resp) {
    console.log('working prop?');
    var o_patientid = new mongodb.ObjectID(req.body.patientid);
    var helpdeskmailid = req.body.helpdeskmailid;
    console.log('...... '+helpdeskmailid);
    console.log('...... '+req.body.image);
    var collection = db.collection('patientrecord');
    collection.find({patientid: o_patientid}).toArray(function (err, items) {
        if (items.length == 0) {
            collection.insert([{
                patientid: o_patientid,
                cgx: req.body.cgx1,
                pgxval: req.body.pgxval,
                firstname: req.body.firstname1,
                lastname: req.body.lastname1,
                phone: req.body.phone1,
                address: req.body.address1,
                city: req.body.city1,
                state: req.body.state1,
                zip: req.body.zip1,
                dob: req.body.dob1,
                gender: req.body.gender1,
                race: req.body.race1,
                height: req.body.height1,
                width: req.body.width1,
                allergies: req.body.allergies1,
                medicareclaim: req.body.medicareclaim1,
                notes1: req.body.notes1,
                notes2: req.body.notes2,
                notes3: req.body.notes3,
                notes4: req.body.notes4,
                pharmacyinsurancename: req.body.pharmacyinsurancename,
                pharmacyid: req.body.pharmacyid,
                pharmacybin: req.body.pharmacybin,
                pharmacypcn: req.body.pharmacypcn,
                pharmacygroup: req.body.pharmacygroup,
                pharmacyhistory: req.body.pharmacyhistory,
                pharmacyissue: req.body.pharmacyissue,
                pharmacytreatment: req.body.pharmacytreatment,
                topicalpain: req.body.topicalpain,
                oralpain: req.body.oralpain,
                derma: req.body.derma,
                migrane: req.body.migrane,
                insurance1: req.body.insurance1,
                insurance2: req.body.insurance2,
                insurance3: req.body.insurance3,
                insurance4: req.body.insurance4,
                planbcard: req.body.planbcard,
                medicarepolicyno: req.body.medicarepolicyno,
                mediprimarypolicy: req.body.mediprimarypolicy,
                comprimarypolicy: req.body.comprimarypolicy,
                phtype1: req.body.phtype1,
                /!*   phtype2: req.body.phtype2,*!/
                phage: req.body.phage,
                motype1: req.body.motype1,
                /!* motype2: req.body.motype2,*!/
                moage: req.body.moage,
                modead: req.body.modead,
                /!* fatype2: req.body.fatype2,*!/
                faage: req.body.faage,
                fadead: req.body.fadead,
                dautype1: req.body.dautype1,
                /!* dautype2: req.body.dautype2,*!/
                dauage: req.body.dauage,
                daudead: req.body.daudead,
                sontype1: req.body.sontype1,
                /!* sontype2: req.body.sontype2,*!/
                sonage: req.body.sonage,
                sondead: req.body.sondead,
                brotype1: req.body.brotype1,
                /!* brotype2: req.body.brotype2,*!/
                broage: req.body.broage,
                brodead: req.body.brodead,
                sistype1: req.body.sistype1,
                /!*sistype2: req.body.sistype2,*!/
                sisage: req.body.sisage,
                sisdead: req.body.sisdead,
                neptype1: req.body.neptype1,
                /!*neptype2: req.body.neptype2,*!/
                nepage: req.body.nepage,
                nepdead: req.body.nepdead,
                niecetype1: req.body.niecetype1,
                /!* niecetype2: req.body.niecetype2,*!/
                nieceage: req.body.nieceage,
                niecedead: req.body.niecedead,
                unctype1: req.body.unctype1,
                /!* unctype2: req.body.unctype2,*!/
                uncage: req.body.uncage,
                uncdead: req.body.uncdead,
                autntype1: req.body.autntype1,
                /!*autntype2: req.body.autntype2,*!/
                autnage: req.body.autnage,
                autndead: req.body.autndead,
                moftype1: req.body.moftype1,
                /!* moftype2: req.body.moftype2,*!/
                mofage: req.body.mofage,
                mofdead: req.body.mofdead,
                momotype1: req.body.momotype1,
                /!* momotype2: req.body.momotype2,*!/
                momoage: req.body.momoage,
                momodead: req.body.momodead,
                daftype1: req.body.daftype1,
                /!* daftype2: req.body.daftype2,*!/
                dafage: req.body.dafage,
                dafdead: req.body.dafdead,
                damtype1: req.body.damtype1,
                /!* damtype2: req.body.damtype2,*!/
                damage: req.body.damage,
                damdead: req.body.damdead,
                oth1type1: req.body.oth1type1,
                /!*oth1type2: req.body.oth1type2,*!/
                oth1age: req.body.oth1age,
                oth1dead: req.body.oth1dead,
                oth2type1: req.body.oth2type1,
                /!* oth2type2: req.body.oth2type2,*!/
                oth2age: req.body.oth2age,
                oth2dead: req.body.oth2dead,
                oth3type1: req.body.oth3type1,
                /!* oth3type2: req.body.oth3type2,*!/
                oth3age: req.body.oth3age,
                oth3dead: req.body.oth3dead,
                pgx1: req.body.pgx1,
                pgx2: req.body.pgx2,
                pgx3: req.body.pgx3,
                pgx4: req.body.pgx4,
                pgx5: req.body.pgx5,
                pgx6: req.body.pgx6,
                pgx7: req.body.pgx7,
                pgx8: req.body.pgx8,
                pgx9: req.body.pgx9,
                pgx10: req.body.pgx10,
                pgx11: req.body.pgx11,
                pgx12: req.body.pgx12,
                pgx13: req.body.pgx13,
                pgx14: req.body.pgx14,
                pgx15: req.body.pgx15,
                pgx16: req.body.pgx16,
                pgx17: req.body.pgx17,
                pgx18: req.body.pgx18,
                carrier: req.body.carrier,
                carrierplan: req.body.carrierplan,
                carrierpolicyno: req.body.carrierpolicyno,
                cancer_sup: req.body.cancer_sup,
                catheters_sup: req.body.catheters_sup,
                allergies_sup: req.body.allergies_sup,
                scooter_sup: req.body.scooter_sup,
                walker_sup: req.body.walker_sup,
                braces_sup: req.body.braces_sup,
                topical_sup: req.body.topical_sup,
                pain_sup: req.body.pain_sup,
                wound_sup: req.body.wound_sup,
                diabetic_sup: req.body.diabetic_sup,
                familyrelation1: req.body.familyrelation1,
                familyrelation2: req.body.familyrelation2,
                familyrelation3: req.body.familyrelation3,
                familyrelation4: req.body.familyrelation4,
                familyrelation5: req.body.familyrelation5,
                familyrelation6: req.body.familyrelation6,
                familyrelation7: req.body.familyrelation7,
                familyrelation8: req.body.familyrelation8,
                familyrelation9: req.body.familyrelation9,
                familyrelation10: req.body.familyrelation10,
                familyrelation11: req.body.familyrelation11,
                familyrelation12: req.body.familyrelation12,
                familyrelation13: req.body.familyrelation13,
                familyrelation14: req.body.familyrelation14,
                familyrelation15: req.body.familyrelation15,
                familyrelation16: req.body.familyrelation16,
                familyrelation17: req.body.familyrelation17,
                relation1: req.body.relation1,
                relation2: req.body.relation2,
                relation3: req.body.relation3,
                relation4: req.body.relation4,
                relation5: req.body.relation5,
                relation6: req.body.relation6,
                relation7: req.body.relation7,
                relation8: req.body.relation8,
                relation9: req.body.relation9,
                relation10: req.body.relation10,
                relation11: req.body.relation11,
                relation12: req.body.relation12,
                relation13: req.body.relation13,
                relation14: req.body.relation14,
                relation15: req.body.relation15,
                relation16: req.body.relation16,
                relation17: req.body.relation17,
                relation18: req.body.relation18,
                degree1: req.body.degree1,
                degree2: req.body.degree2 ,
                degree3: req.body.degree3 ,
                degree4: req.body.degree4 ,
                degree5: req.body.degree5 ,
                degree6: req.body.degree6 ,
                degree7: req.body.degree7 ,
                degree8: req.body.degree8 ,
                degree9: req.body.degree9 ,
                degree10: req.body.degree10 ,
                degree11: req.body.degree11 ,
                degree12: req.body.degree12 ,
                degree13: req.body.degree13 ,
                degree14: req.body.degree14 ,
                degree15: req.body.degree15 ,
                degree16: req.body.degree16 ,
                degree17: req.body.degree17 ,
                degree18: req.body.degree18,
                hit_map_value: req.body.hit_map_value,
                phname: req.body.phname,
                familyrelation1name: req.body.familyrelation1name,
                familyrelation2name: req.body.familyrelation2name,
                familyrelation3name: req.body.familyrelation3name,
                familyrelation4name: req.body.familyrelation4name,
                familyrelation5name: req.body.familyrelation5name,
                familyrelation6name: req.body.familyrelation6name,
                familyrelation7name: req.body.familyrelation7name,
                familyrelation8name: req.body.familyrelation8name,
                familyrelation9name: req.body.familyrelation9name,
                familyrelation10name: req.body.familyrelation10name,
                familyrelation11name: req.body.familyrelation11name,
                familyrelation12name: req.body.familyrelation12name,
                familyrelation13name: req.body.familyrelation13name,
                familyrelation14name: req.body.familyrelation14name,
                familyrelation15name: req.body.familyrelation15name,
                familyrelation16name: req.body.familyrelation16name,
                familyrelation17name: req.body.familyrelation17name,
                iscompleted: req.body.iscompleted,
            }], function (err, result) {
                if (err) {
                    console.log('error' + err);
                    resp.send(JSON.stringify({'status': 'error', 'id': 0}));
                } else {
                    // console.log(result);
                    if (req.body.iscompleted == 1) {
                        var collection1 = db.collection('tags');
                        collection1.find({tagname: 'PPS Submitted'}).toArray(function (err1, items1) {
                            if (items1.length > 0) {
                                // deleting lead for this same userid from usertags table , adding pps submit .
                                var collection2 = db.collection('usertags');
                                //  collection2.deleteOne({userid: o_patientid, tagid: '5b0cda8121eaaa0244d52b9e'}, function(err3, result3) {
                                // can't delete if i add tagid, so removed it
                                collection2.deleteOne({userid: o_patientid}, function(err3, result3) {
                                    if (err3){
                                        resp.send("failed");
                                        throw err;
                                    }
                                    else {
                                        collection2.insert([{
                                            userid: o_patientid,
                                            tagid: items1[0]._id,
                                        }], function (err2, result2) {
                                            if (err2) {
                                                console.log('error2' + err2);
                                                resp.send(JSON.stringify({'status': 'error', 'id': 0}));
                                            } else {
                                                console.log(result2);
                                                var maillist = [
                                                    'merry@yopmail.com',
                                                    helpdeskmailid
                                                ];
                                                var smtpTransport = mailer.createTransport({
                                                    service: "Gmail",
                                                    auth: {
                                                        user: "itplcc40@gmail.com",
                                                        pass: "DevelP7@"
                                                    }
                                                });
                                                var mail = {
                                                    from: "Altushealth Admin <support@altushealth.com>",
                                                    to: maillist,
                                                    subject: 'New patient profile sheet submitted.',
                                                    html: req.body.firstname1+' '+req.body.lastname1+' patient has been added under '+req.body.addedbyrepdetailname+' rep.<br/><br/>Patient Id: '+req.body.uniqueid+'<br/><br/>Hit Map Value : '+req.body.hit_map_value+'.'

                                                }
                                                smtpTransport.sendMail(mail, function (error, response) {
                                                    console.log('send');
                                                    smtpTransport.close();
                                                });




                                                resp.send(JSON.stringify({'status': 'success', 'id': result.ops[0]._id}));
                                            }
                                        });
                                    }
                                });

                            }
                        });
                    }
                    else {
                        resp.send(JSON.stringify({'status': 'success', 'id': result.ops[0]._id}));
                    }

                }
            });
            if (items.length > 0 ) {
                var data = {
                    cgx: req.body.cgx1,
                    pgxval: req.body.pgxval,
                    firstname: req.body.firstname1,
                    lastname: req.body.lastname1,
                    phone: req.body.phone1,
                    address: req.body.address1,
                    city: req.body.city1,
                    state: req.body.state1,
                    zip: req.body.zip1,
                    dob: req.body.dob1,
                    gender: req.body.gender1,
                    race: req.body.race1,
                    height: req.body.height1,
                    width: req.body.width1,
                    allergies: req.body.allergies1,
                    medicareclaim: req.body.medicareclaim1,
                    notes1: req.body.notes1,
                    notes2: req.body.notes2,
                    notes3: req.body.notes3,
                    notes4: req.body.notes4,
                    pharmacyinsurancename: req.body.pharmacyinsurancename,
                    pharmacyid: req.body.pharmacyid,
                    pharmacybin: req.body.pharmacybin,
                    pharmacypcn: req.body.pharmacypcn,
                    pharmacygroup: req.body.pharmacygroup,
                    pharmacyhistory: req.body.pharmacyhistory,
                    pharmacyissue: req.body.pharmacyissue,
                    pharmacytreatment: req.body.pharmacytreatment,
                    topicalpain: req.body.topicalpain,
                    oralpain: req.body.oralpain,
                    derma: req.body.derma,
                    migrane: req.body.migrane,
                    insurance1: req.body.insurance1,
                    insurance2: req.body.insurance2,
                    insurance3: req.body.insurance3,
                    insurance4: req.body.insurance4,
                    planbcard: req.body.planbcard,
                    medicarepolicyno: req.body.medicarepolicyno,
                    mediprimarypolicy: req.body.mediprimarypolicy,
                    comprimarypolicy: req.body.comprimarypolicy,
                    phtype1: req.body.phtype1,
                    /!*   phtype2: req.body.phtype2,*!/
                    phage: req.body.phage,
                    motype1: req.body.motype1,
                    /!* motype2: req.body.motype2,*!/
                    moage: req.body.moage,
                    modead: req.body.modead,
                    /!* fatype2: req.body.fatype2,*!/
                    faage: req.body.faage,
                    fadead: req.body.fadead,
                    dautype1: req.body.dautype1,
                    /!* dautype2: req.body.dautype2,*!/
                    dauage: req.body.dauage,
                    daudead: req.body.daudead,
                    sontype1: req.body.sontype1,
                    /!* sontype2: req.body.sontype2,*!/
                    sonage: req.body.sonage,
                    sondead: req.body.sondead,
                    brotype1: req.body.brotype1,
                    /!* brotype2: req.body.brotype2,*!/
                    broage: req.body.broage,
                    brodead: req.body.brodead,
                    sistype1: req.body.sistype1,
                    /!*sistype2: req.body.sistype2,*!/
                    sisage: req.body.sisage,
                    sisdead: req.body.sisdead,
                    neptype1: req.body.neptype1,
                    /!*neptype2: req.body.neptype2,*!/
                    nepage: req.body.nepage,
                    nepdead: req.body.nepdead,
                    niecetype1: req.body.niecetype1,
                    /!* niecetype2: req.body.niecetype2,*!/
                    nieceage: req.body.nieceage,
                    niecedead: req.body.niecedead,
                    unctype1: req.body.unctype1,
                    /!* unctype2: req.body.unctype2,*!/
                    uncage: req.body.uncage,
                    uncdead: req.body.uncdead,
                    autntype1: req.body.autntype1,
                    /!*autntype2: req.body.autntype2,*!/
                    autnage: req.body.autnage,
                    autndead: req.body.autndead,
                    moftype1: req.body.moftype1,
                    /!* moftype2: req.body.moftype2,*!/
                    mofage: req.body.mofage,
                    mofdead: req.body.mofdead,
                    momotype1: req.body.momotype1,
                    /!* momotype2: req.body.momotype2,*!/
                    momoage: req.body.momoage,
                    momodead: req.body.momodead,
                    daftype1: req.body.daftype1,
                    /!* daftype2: req.body.daftype2,*!/
                    dafage: req.body.dafage,
                    dafdead: req.body.dafdead,
                    damtype1: req.body.damtype1,
                    /!* damtype2: req.body.damtype2,*!/
                    damage: req.body.damage,
                    damdead: req.body.damdead,
                    oth1type1: req.body.oth1type1,
                    /!*oth1type2: req.body.oth1type2,*!/
                    oth1age: req.body.oth1age,
                    oth1dead: req.body.oth1dead,
                    oth2type1: req.body.oth2type1,
                    /!* oth2type2: req.body.oth2type2,*!/
                    oth2age: req.body.oth2age,
                    oth2dead: req.body.oth2dead,
                    oth3type1: req.body.oth3type1,
                    /!* oth3type2: req.body.oth3type2,*!/
                    oth3age: req.body.oth3age,
                    oth3dead: req.body.oth3dead,
                    pgx1: req.body.pgx1,
                    pgx2: req.body.pgx2,
                    pgx3: req.body.pgx3,
                    pgx4: req.body.pgx4,
                    pgx5: req.body.pgx5,
                    pgx6: req.body.pgx6,
                    pgx7: req.body.pgx7,
                    pgx8: req.body.pgx8,
                    pgx9: req.body.pgx9,
                    pgx10: req.body.pgx10,
                    pgx11: req.body.pgx11,
                    pgx12: req.body.pgx12,
                    pgx13: req.body.pgx13,
                    pgx14: req.body.pgx14,
                    pgx15: req.body.pgx15,
                    pgx16: req.body.pgx16,
                    pgx17: req.body.pgx17,
                    pgx18: req.body.pgx18,
                    carrier: req.body.carrier,
                    carrierplan: req.body.carrierplan,
                    carrierpolicyno: req.body.carrierpolicyno,
                    cancer_sup: req.body.cancer_sup,
                    catheters_sup: req.body.catheters_sup,
                    allergies_sup: req.body.allergies_sup,
                    scooter_sup: req.body.scooter_sup,
                    walker_sup: req.body.walker_sup,
                    braces_sup: req.body.braces_sup,
                    topical_sup: req.body.topical_sup,
                    pain_sup: req.body.pain_sup,
                    wound_sup: req.body.wound_sup,
                    diabetic_sup: req.body.diabetic_sup,
                    familyrelation1: req.body.familyrelation1,
                    familyrelation2: req.body.familyrelation2,
                    familyrelation3: req.body.familyrelation3,
                    familyrelation4: req.body.familyrelation4,
                    familyrelation5: req.body.familyrelation5,
                    familyrelation6: req.body.familyrelation6,
                    familyrelation7: req.body.familyrelation7,
                    familyrelation8: req.body.familyrelation8,
                    familyrelation9: req.body.familyrelation9,
                    familyrelation10: req.body.familyrelation10,
                    familyrelation11: req.body.familyrelation11,
                    familyrelation12: req.body.familyrelation12,
                    familyrelation13: req.body.familyrelation13,
                    familyrelation14: req.body.familyrelation14,
                    familyrelation15: req.body.familyrelation15,
                    familyrelation16: req.body.familyrelation16,
                    familyrelation17: req.body.familyrelation17,
                    relation1: req.body.relation1,
                    relation2: req.body.relation2,
                    relation3: req.body.relation3,
                    relation4: req.body.relation4,
                    relation5: req.body.relation5,
                    relation6: req.body.relation6,
                    relation7: req.body.relation7,
                    relation8: req.body.relation8,
                    relation9: req.body.relation9,
                    relation10: req.body.relation10,
                    relation11: req.body.relation11,
                    relation12: req.body.relation12,
                    relation13: req.body.relation13,
                    relation14: req.body.relation14,
                    relation15: req.body.relation15,
                    relation16: req.body.relation16,
                    relation17: req.body.relation17,
                    relation18: req.body.relation18,
                    degree1: req.body.degree1,
                    degree2: req.body.degree2 ,
                    degree3: req.body.degree3 ,
                    degree4: req.body.degree4 ,
                    degree5: req.body.degree5 ,
                    degree6: req.body.degree6 ,
                    degree7: req.body.degree7 ,
                    degree8: req.body.degree8 ,
                    degree9: req.body.degree9 ,
                    degree10: req.body.degree10 ,
                    degree11: req.body.degree11 ,
                    degree12: req.body.degree12 ,
                    degree13: req.body.degree13 ,
                    degree14: req.body.degree14 ,
                    degree15: req.body.degree15 ,
                    degree16: req.body.degree16 ,
                    degree17: req.body.degree17 ,
                    degree18: req.body.degree18,
                    hit_map_value: req.body.hit_map_value,
                    phname: req.body.phname,
                    familyrelation1name: req.body.familyrelation1name,
                    familyrelation2name: req.body.familyrelation2name,
                    familyrelation3name: req.body.familyrelation3name,
                    familyrelation4name: req.body.familyrelation4name,
                    familyrelation5name: req.body.familyrelation5name,
                    familyrelation6name: req.body.familyrelation6name,
                    familyrelation7name: req.body.familyrelation7name,
                    familyrelation8name: req.body.familyrelation8name,
                    familyrelation9name: req.body.familyrelation9name,
                    familyrelation10name: req.body.familyrelation10name,
                    familyrelation11name: req.body.familyrelation11name,
                    familyrelation12name: req.body.familyrelation12name,
                    familyrelation13name: req.body.familyrelation13name,
                    familyrelation14name: req.body.familyrelation14name,
                    familyrelation15name: req.body.familyrelation15name,
                    familyrelation16name: req.body.familyrelation16name,
                    familyrelation17name: req.body.familyrelation17name,
                    iscompleted: req.body.iscompleted,
                }
                collection.update({patientid: o_patientid}, {$set: data}, function (err, result) {
                    if (err) {
                        resp.send(JSON.stringify({'status': 'error', 'id': 0}));
                        throw err;
                    }
                    else {
                        if (req.body.iscompleted == 1) {
                            var collection1 = db.collection('tags');
                            collection1.find({tagname: 'PPS Submitted'}).toArray(function (err1, items1) {
                                if (items1.length > 0) {
                                    var collection2 = db.collection('usertags');
                                    collection2.deleteOne({userid: o_patientid}, function(err3, result3) {
                                        if (err3){
                                            resp.send("failed");
                                            throw err;
                                        }
                                        else {
                                            collection2.insert([{
                                                userid: o_patientid,
                                                tagid: items1[0]._id,
                                            }], function (err2, result2) {
                                                if (err2) {
                                                    console.log('error2' + err2);
                                                    resp.send(JSON.stringify({'status': 'error', 'id': 0}));
                                                } else {
                                                    console.log(result2);
                                                    var maillist = [
                                                        'merry@yopmail.com',
                                                        helpdeskmailid
                                                    ];
                                                    var smtpTransport = mailer.createTransport({
                                                        service: "Gmail",
                                                        auth: {
                                                            user: "itplcc40@gmail.com",
                                                            pass: "DevelP7@"
                                                        }
                                                    });
                                                    var mail = {
                                                        from: "Altushealth Admin <support@altushealth.com>",
                                                        to: maillist,
                                                        subject: 'New patient profile sheet submitted.',
                                                        html: req.body.firstname1+' '+req.body.lastname1+' patient has been added under '+req.body.addedbyrepdetailname+' rep.<br/><br/>Patient Id: '+req.body.uniqueid+'<br/><br/>Hit Map Value : '+req.body.hit_map_value+'.'

                                                    }
                                                    smtpTransport.sendMail(mail, function (error, response) {
                                                        console.log('send');
                                                        smtpTransport.close();
                                                    });
                                                    resp.send(JSON.stringify({'status': 'success'}));
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                        else {
                            resp.send(JSON.stringify({'status': 'success'}));
                        }
                        /!*    collection.update({email: req.body.usernameoremail}, {$set: data}, function (err, results) {
                            if (err) {
                                console.log('error'+err);
                                resp.send(JSON.stringify({'status':'error','id':1}));
                                return;
                            } else {
                                resp.send(JSON.stringify({'status': 'success', 'msg': items[0]}));
                                return;
                            }
                        });*!/
                    }
                });
            }
        }
    });
});*/



app.get('/patientrecord',function(req,resp) {
    req.body=req.query;
  //  console.log('working prop?');
    var helpdeskmailid = req.body.helpdeskmailid;
    var added_on = Date.now();
  var o_patientid = new mongodb.ObjectID(req.body.patientid);
  var o_added_by_id = new mongodb.ObjectID(req.body.added_by);

    var collection = db.collection('patientrecord');
    collection.find({patientid: o_patientid}).toArray(function (err, items) {
        if (items.length == 0) {
            collection.insert([{
                patientid: o_patientid,
                cgx: Number(req.body.cgx1),
                pgxval: Number(req.body.pgxval),
                firstname: req.body.firstname1,
                lastname: req.body.lastname1,
                phone: req.body.phone1,
                address: req.body.address1,
                city: req.body.city1,
                state: req.body.state1,
                zip: req.body.zip1,
                dob: req.body.dob1,
                gender: req.body.gender1,
                race: req.body.race1,
                height: req.body.height1,
                width: req.body.width1,
              weight: req.body.weight1,
                allergies: req.body.allergies1,
                medicareclaim: req.body.medicareclaim1,
                notes1: req.body.notes1,
                notes2: req.body.notes2,
                notes3: req.body.notes3,
                notes4: req.body.notes4,
                pharmacyinsurancename: req.body.pharmacyinsurancename,
                pharmacyid: req.body.pharmacyid,
                pharmacybin: req.body.pharmacybin,
                pharmacypcn: req.body.pharmacypcn,
                pharmacygroup: req.body.pharmacygroup,
                pharmacyhistory: req.body.pharmacyhistory,
                pharmacyissue: req.body.pharmacyissue,
                pharmacytreatment: req.body.pharmacytreatment,
                topicalpain: Number(req.body.topicalpain),
                oralpain: Number(req.body.oralpain),
                derma: Number(req.body.derma),
                migrane: Number(req.body.migrane),
                insurance1: Number(req.body.insurance1),
                insurance2: Number(req.body.insurance2),
                insurance3: Number(req.body.insurance3),
                insurance4: Number(req.body.insurance4),
                planbcard: Number(req.body.planbcard),
                medicarepolicyno: req.body.medicarepolicyno,
                mediprimarypolicy: Number(req.body.mediprimarypolicy),
                comprimarypolicy: Number(req.body.comprimarypolicy),
                medadvantageprimarypolicy: Number(req.body.medadvantageprimarypolicy),
                medadvantageplan: req.body.medadvantageplan,
                medadvantagepolicyno: req.body.medadvantagepolicyno,
                phtype1: req.body.phtype1,
                /*   phtype2: req.body.phtype2,*/
                phage: req.body.phage,
                phdead: req.body.phdead,
                motype1: req.body.motype1,
                /* motype2: req.body.motype2,*/
                moage: req.body.moage,
                modead: req.body.modead,
                fatype1: req.body.fatype1,
                /* fatype2: req.body.fatype2,*/
                faage: req.body.faage,
                fadead: req.body.fadead,
                dautype1: req.body.dautype1,
                /* dautype2: req.body.dautype2,*/
                dauage: req.body.dauage,
                daudead: req.body.daudead,
                sontype1: req.body.sontype1,
                /* sontype2: req.body.sontype2,*/
                sonage: req.body.sonage,
                sondead: req.body.sondead,
                brotype1: req.body.brotype1,
                /* brotype2: req.body.brotype2,*/
                broage: req.body.broage,
                brodead: req.body.brodead,
                sistype1: req.body.sistype1,
                /*sistype2: req.body.sistype2,*/
                sisage: req.body.sisage,
                sisdead: req.body.sisdead,
                neptype1: req.body.neptype1,
                /*neptype2: req.body.neptype2,*/
                nepage: req.body.nepage,
                nepdead: req.body.nepdead,
                niecetype1: req.body.niecetype1,
                /* niecetype2: req.body.niecetype2,*/
                nieceage: req.body.nieceage,
                niecedead: req.body.niecedead,
                unctype1: req.body.unctype1,
                /* unctype2: req.body.unctype2,*/
                uncage: req.body.uncage,
                uncdead: req.body.uncdead,
                autntype1: req.body.autntype1,
                /*autntype2: req.body.autntype2,*/
                autnage: req.body.autnage,
                autndead: req.body.autndead,
                moftype1: req.body.moftype1,
                /* moftype2: req.body.moftype2,*/
                mofage: req.body.mofage,
                mofdead: req.body.mofdead,
                momotype1: req.body.momotype1,
                /* momotype2: req.body.momotype2,*/
                momoage: req.body.momoage,
                momodead: req.body.momodead,
                daftype1: req.body.daftype1,
                /* daftype2: req.body.daftype2,*/
                dafage: req.body.dafage,
                dafdead: req.body.dafdead,
                damtype1: req.body.damtype1,
                /* damtype2: req.body.damtype2,*/
                damage: req.body.damage,
                damdead: req.body.damdead,
                oth1type1: req.body.oth1type1,
                /*oth1type2: req.body.oth1type2,*/
                oth1age: req.body.oth1age,
                oth1dead: req.body.oth1dead,
                oth2type1: req.body.oth2type1,
                /* oth2type2: req.body.oth2type2,*/
                oth2age: req.body.oth2age,
                oth2dead: req.body.oth2dead,
                oth3type1: req.body.oth3type1,
                /* oth3type2: req.body.oth3type2,*/
                oth3age: req.body.oth3age,
                oth3dead: req.body.oth3dead,
                pgx1: req.body.pgx1,
                pgx2: req.body.pgx2,
                pgx3: req.body.pgx3,
                pgx4: req.body.pgx4,
                pgx5: req.body.pgx5,
                pgx6: req.body.pgx6,
                pgx7: req.body.pgx7,
                pgx8: req.body.pgx8,
                pgx9: req.body.pgx9,
                pgx10: req.body.pgx10,
                pgx11: req.body.pgx11,
                pgx12: req.body.pgx12,
                pgx13: req.body.pgx13,
                pgx14: req.body.pgx14,
                pgx15: req.body.pgx15,
                pgx16: req.body.pgx16,
                pgx17: req.body.pgx17,
                pgx18: req.body.pgx18,
                carrier: req.body.carrier,
                carrierplan: req.body.carrierplan,
                carrierpolicyno: req.body.carrierpolicyno,
                cancer_sup: Number(req.body.cancer_sup),
                catheters_sup: Number(req.body.catheters_sup),
                allergies_sup: Number(req.body.allergies_sup),
                scooter_sup: Number(req.body.scooter_sup),
                walker_sup: Number(req.body.walker_sup),
                braces_sup: Number(req.body.braces_sup),
                topical_sup: Number(req.body.topical_sup),
                pain_sup: Number(req.body.pain_sup),
                wound_sup: Number(req.body.wound_sup),
                diabetic_sup: Number(req.body.diabetic_sup),
              triedbraces: req.body.triedbraces,
              lastbrace: req.body.lastbrace,
                familyrelation0: req.body.familyrelation0,
                familyrelation1: req.body.familyrelation1,
                familyrelation2: req.body.familyrelation2,
                familyrelation3: req.body.familyrelation3,
                familyrelation4: req.body.familyrelation4,
                familyrelation5: req.body.familyrelation5,
                familyrelation6: req.body.familyrelation6,
                familyrelation7: req.body.familyrelation7,
                familyrelation8: req.body.familyrelation8,
                familyrelation9: req.body.familyrelation9,
                familyrelation10: req.body.familyrelation10,
                familyrelation11: req.body.familyrelation11,
                familyrelation12: req.body.familyrelation12,
                familyrelation13: req.body.familyrelation13,
                familyrelation14: req.body.familyrelation14,
                familyrelation15: req.body.familyrelation15,
                familyrelation16: req.body.familyrelation16,
                familyrelation17: req.body.familyrelation17,
                relation1: req.body.relation1,
                relation2: req.body.relation2,
                relation3: req.body.relation3,
                relation4: req.body.relation4,
                relation5: req.body.relation5,
                relation6: req.body.relation6,
                relation7: req.body.relation7,
                relation8: req.body.relation8,
                relation9: req.body.relation9,
                relation10: req.body.relation10,
                relation11: req.body.relation11,
                relation12: req.body.relation12,
                relation13: req.body.relation13,
                relation14: req.body.relation14,
                relation15: req.body.relation15,
                relation16: req.body.relation16,
                relation17: req.body.relation17,
                relation18: req.body.relation18,
                degree1: req.body.degree1,
                degree2: req.body.degree2,
                degree3: req.body.degree3,
                degree4: req.body.degree4,
                degree5: req.body.degree5,
                degree6: req.body.degree6,
                degree7: req.body.degree7,
                degree8: req.body.degree8,
                degree9: req.body.degree9,
                degree10: req.body.degree10,
                degree11: req.body.degree11,
                degree12: req.body.degree12,
                degree13: req.body.degree13,
                degree14: req.body.degree14,
                degree15: req.body.degree15,
                degree16: req.body.degree16,
                degree17: req.body.degree17,
                degree18: req.body.degree18,
                hit_map_value: req.body.hit_map_value,
                phname: req.body.phname,
                familyrelation1name: req.body.familyrelation1name,
                familyrelation2name: req.body.familyrelation2name,
                familyrelation3name: req.body.familyrelation3name,
                familyrelation4name: req.body.familyrelation4name,
                familyrelation5name: req.body.familyrelation5name,
                familyrelation6name: req.body.familyrelation6name,
                familyrelation7name: req.body.familyrelation7name,
                familyrelation8name: req.body.familyrelation8name,
                familyrelation9name: req.body.familyrelation9name,
                familyrelation10name: req.body.familyrelation10name,
                familyrelation11name: req.body.familyrelation11name,
                familyrelation12name: req.body.familyrelation12name,
                familyrelation13name: req.body.familyrelation13name,
                familyrelation14name: req.body.familyrelation14name,
                familyrelation15name: req.body.familyrelation15name,
                familyrelation16name: req.body.familyrelation16name,
                familyrelation17name: req.body.familyrelation17name,
                iscompleted: Number(req.body.iscompleted),

                insurance1_1: Number(req.body.insurance1_1),
                insurance2_1: Number(req.body.insurance2_1),
                insurance3_1: Number(req.body.insurance3_1),
                insurance4_1: Number(req.body.insurance4_1),
                planbcard_1: Number(req.body.planbcard_1),
                medicarepolicyno_1: req.body.medicarepolicyno_1,
                mediprimarypolicy_1: Number(req.body.mediprimarypolicy_1),
                comprimarypolicy_1: Number(req.body.comprimarypolicy_1),
                medadvantageprimarypolicy_1: Number(req.body.medadvantageprimarypolicy_1),
                medadvantageplan_1: req.body.medadvantageplan_1,
                medadvantagepolicyno_1: req.body.medadvantagepolicyno_1,
                carrier_1: req.body.carrier_1,
                carrierplan_1: req.body.carrierplan_1,
                carrierpolicyno_1: req.body.carrierpolicyno_1,
                insurance1_2: Number(req.body.insurance1_2),
                insurance2_2: Number(req.body.insurance2_2),
                insurance3_2: Number(req.body.insurance3_2),
                insurance4_2: Number(req.body.insurance4_2),
                planbcard_2: Number(req.body.planbcard_2),
                medicarepolicyno_2: req.body.medicarepolicyno_2,
                mediprimarypolicy_2: Number(req.body.mediprimarypolicy_2),
                comprimarypolicy_2: Number(req.body.comprimarypolicy_2),
                medadvantageprimarypolicy_2: Number(req.body.medadvantageprimarypolicy_2),
                medadvantageplan_2: req.body.medadvantageplan_2,
                medadvantagepolicyno_2: req.body.medadvantagepolicyno_2,
                carrier_2: req.body.carrier_2,
                carrierplan_2: req.body.carrierplan_2,
                carrierpolicyno_2: req.body.carrierpolicyno_2,
                insurance1_3: Number(req.body.insurance1_3),
                insurance2_3: Number(req.body.insurance2_3),
                insurance3_3: Number(req.body.insurance3_3),
                insurance4_3: Number(req.body.insurance4_3),
                planbcard_3: Number(req.body.planbcard_3),
                medicarepolicyno_3: req.body.medicarepolicyno_3,
                mediprimarypolicy_3: Number(req.body.mediprimarypolicy_3),
                comprimarypolicy_3: Number(req.body.comprimarypolicy_3),
                medadvantageprimarypolicy_3: Number(req.body.medadvantageprimarypolicy_3),
                medadvantageplan_3: req.body.medadvantageplan_3,
                medadvantagepolicyno_3: req.body.medadvantagepolicyno_3,
                carrier_3: req.body.carrier_3,
                carrierplan_3: req.body.carrierplan_3,
                carrierpolicyno_3: req.body.carrierpolicyno_3,
                insurance1_4: Number(req.body.insurance1_4),
                insurance2_4: Number(req.body.insurance2_4),
                insurance3_4: Number(req.body.insurance3_4),
                insurance4_4: Number(req.body.insurance4_4),
                planbcard_4: Number(req.body.planbcard_4),
                medicarepolicyno_4: req.body.medicarepolicyno_4,
                mediprimarypolicy_4: Number(req.body.mediprimarypolicy_4),
                comprimarypolicy_4: Number(req.body.comprimarypolicy_4),
                medadvantageprimarypolicy_4: Number(req.body.medadvantageprimarypolicy_4),
                medadvantageplan_4: req.body.medadvantageplan_4,
                medadvantagepolicyno_4: req.body.medadvantagepolicyno_4,
                carrier_4: req.body.carrier_4,
                carrierplan_4: req.body.carrierplan_4,
                carrierpolicyno_4: req.body.carrierpolicyno_4,
                insurance1_5: Number(req.body.insurance1_5),
                insurance2_5: Number(req.body.insurance2_5),
                insurance3_5: Number(req.body.insurance3_5),
                insurance4_5: Number(req.body.insurance4_5),
                planbcard_5: Number(req.body.planbcard_5),
                medicarepolicyno_5: req.body.medicarepolicyno_5,
                mediprimarypolicy_5: Number(req.body.mediprimarypolicy_5),
                comprimarypolicy_5: Number(req.body.comprimarypolicy_5),
                medadvantageprimarypolicy_5: Number(req.body.medadvantageprimarypolicy_5),
                medadvantageplan_5: req.body.medadvantageplan_5,
                medadvantagepolicyno_5: req.body.medadvantagepolicyno_5,
                carrier_5: req.body.carrier_5,
                carrierplan_5: req.body.carrierplan_5,
                carrierpolicyno_5: req.body.carrierpolicyno_5,
                insurance1_6: Number(req.body.insurance1_6),
                insurance2_6: Number(req.body.insurance2_6),
                insurance3_6: Number(req.body.insurance3_6),
                insurance4_6: Number(req.body.insurance4_6),
                planbcard_6: Number(req.body.planbcard_6),
                medicarepolicyno_6: req.body.medicarepolicyno_6,
                mediprimarypolicy_6: Number(req.body.mediprimarypolicy_6),
                comprimarypolicy_6: Number(req.body.comprimarypolicy_6),
                medadvantageprimarypolicy_6: Number(req.body.medadvantageprimarypolicy_6),
                medadvantageplan_6: req.body.medadvantageplan_6,
                medadvantagepolicyno_6: req.body.medadvantagepolicyno_6,
                carrier_6: req.body.carrier_6,
                carrierplan_6: req.body.carrierplan_6,
                carrierpolicyno_6: req.body.carrierpolicyno_6,
                breastcancercount: Number(req.body.breastcancercount),
                ovariantcancercount: Number(req.body.ovariantcancercount),
                digestivecancercount: Number(req.body.digestivecancercount)
            }], function (err, result) {
                if (err) {
                    console.log('error' + err);
                    resp.send(JSON.stringify({'status': 'error', 'id': 0}));
                } else {
                    if (req.body.iscompleted == 1) {
                        var collection1 = db.collection('tags');
                        collection1.find({tagname: 'PPS Submitted'}).toArray(function (err1, items1) {
                            if (items1.length > 0) {
                                // deleting lead for this same userid from usertags table , adding pps submit .
                                var collection2 = db.collection('usertags');
                                //  collection2.deleteOne({userid: o_patientid, tagid: '5b0cda8121eaaa0244d52b9e'}, function(err3, result3) {
                                // can't delete if i add tagid, so removed it
                                collection2.deleteOne({userid: o_patientid}, function (err3, result3) {
                                    if (err3) {
                                        resp.send("failed");
                                        throw err;
                                    }
                                    else {
                                        collection2.insert([{
                                            userid: o_patientid,
                                            tagid: items1[0]._id,
                                        }], function (err2, result2) {
                                            if (err2) {
                                                console.log('error2' + err2);
                                                resp.send(JSON.stringify({'status': 'error', 'id': 0}));
                                            } else {
                                                if (helpdeskmailid != null) {
                                                    console.log(result2);
                                                    var maillist = [
                                                        'merry@yopmail.com',
                                                        helpdeskmailid
                                                    ];
                                                    var smtpTransport = mailer.createTransport({
                                                        service: "Gmail",
                                                        auth: {
                                                            user: "itplcc40@gmail.com",
                                                            pass: "DevelP7@"
                                                        }
                                                    });

                                                    var mail = {
                                                        from: "Greenvalley Health Admin <support@greenvalley.com>",
                                                        to: maillist,
                                                        subject: 'New patient profile sheet submitted.',
                                                        html: req.body.firstname1 + ' ' + req.body.lastname1 + ' patient has been added under ' + req.body.addedbyrepdetailname + ' rep.<br/><br/>Patient Id: ' + req.body.uniqueid + '<br/><br/>Hit Map Value : ' + req.body.hit_map_value + '.'

                                                    }
                                                    smtpTransport.sendMail(mail, function (error, response) {
                                                        console.log('send');
                                                        smtpTransport.close();
                                                    });
                                                }


                                                resp.send(JSON.stringify({
                                                    'status': 'success',
                                                    'id': result.ops[0]._id
                                                }));
                                            }
                                        });
                                    }
                                });

                            }
                        });
                    }
                    else {
                        resp.send(JSON.stringify({'status': 'success', 'id': result.ops[0]._id}));
                    }
/*
                    var collection11 = db.collection('patients');
                    var data = {
                        hit_map_value : req.body.hit_map_value
                    }
                    collection11.update({_id:o_patientid}, {$set: data}, true, true);*/
                }
            });
        }
        if (items.length > 0 ) {
            var data = {
                cgx: Number(req.body.cgx1),
                pgxval: Number(req.body.pgxval),
                firstname: req.body.firstname1,
                lastname: req.body.lastname1,
                phone: req.body.phone1,
                address: req.body.address1,
                city: req.body.city1,
                state: req.body.state1,
                zip: req.body.zip1,
                dob: req.body.dob1,
                gender: req.body.gender1,
                race: req.body.race1,
                height: req.body.height1,
                width: req.body.width1,
              weight: req.body.weight1,
                allergies: req.body.allergies1,
                medicareclaim: req.body.medicareclaim1,
                notes1: req.body.notes1,
                notes2: req.body.notes2,
                notes3: req.body.notes3,
                notes4: req.body.notes4,
                pharmacyinsurancename: req.body.pharmacyinsurancename,
                pharmacyid: req.body.pharmacyid,
                pharmacybin: req.body.pharmacybin,
                pharmacypcn: req.body.pharmacypcn,
                pharmacygroup: req.body.pharmacygroup,
                pharmacyhistory: req.body.pharmacyhistory,
                pharmacyissue: req.body.pharmacyissue,
                pharmacytreatment: req.body.pharmacytreatment,
                topicalpain: Number(req.body.topicalpain),
                oralpain: Number(req.body.oralpain),
                derma: Number(req.body.derma),
                migrane: Number(req.body.migrane),
                insurance1: Number(req.body.insurance1),
                insurance2: Number(req.body.insurance2),
                insurance3: Number(req.body.insurance3),
                insurance4: Number(req.body.insurance4),
                planbcard: Number(req.body.planbcard),
                medicarepolicyno: req.body.medicarepolicyno,
            mediprimarypolicy: Number(req.body.mediprimarypolicy),
                comprimarypolicy: Number(req.body.comprimarypolicy),
                medadvantageprimarypolicy: Number(req.body.medadvantageprimarypolicy),
                medadvantageplan: req.body.medadvantageplan,
                medadvantagepolicyno: req.body.medadvantagepolicyno,
                phtype1: req.body.phtype1,
                /*   phtype2: req.body.phtype2,*/
                phage: req.body.phage,
                phdead: req.body.phdead,
                motype1: req.body.motype1,
                /* motype2: req.body.motype2,*/
                moage: req.body.moage,
                modead: req.body.modead,
                fatype1: req.body.fatype1,
                /* fatype2: req.body.fatype2,*/
                faage: req.body.faage,
                fadead: req.body.fadead,
                dautype1: req.body.dautype1,
                /* dautype2: req.body.dautype2,*/
                dauage: req.body.dauage,
                daudead: req.body.daudead,
                sontype1: req.body.sontype1,
                /* sontype2: req.body.sontype2,*/
                sonage: req.body.sonage,
                sondead: req.body.sondead,
                brotype1: req.body.brotype1,
                /* brotype2: req.body.brotype2,*/
                broage: req.body.broage,
                brodead: req.body.brodead,
                sistype1: req.body.sistype1,
                /*sistype2: req.body.sistype2,*/
                sisage: req.body.sisage,
                sisdead: req.body.sisdead,
                neptype1: req.body.neptype1,
                /*neptype2: req.body.neptype2,*/
                nepage: req.body.nepage,
                nepdead: req.body.nepdead,
                niecetype1: req.body.niecetype1,
                /* niecetype2: req.body.niecetype2,*/
                nieceage: req.body.nieceage,
                niecedead: req.body.niecedead,
                unctype1: req.body.unctype1,
                /* unctype2: req.body.unctype2,*/
                uncage: req.body.uncage,
                uncdead: req.body.uncdead,
                autntype1: req.body.autntype1,
                /*autntype2: req.body.autntype2,*/
                autnage: req.body.autnage,
                autndead: req.body.autndead,
                moftype1: req.body.moftype1,
                /* moftype2: req.body.moftype2,*/
                mofage: req.body.mofage,
                mofdead: req.body.mofdead,
                momotype1: req.body.momotype1,
                /* momotype2: req.body.momotype2,*/
                momoage: req.body.momoage,
                momodead: req.body.momodead,
                daftype1: req.body.daftype1,
                /* daftype2: req.body.daftype2,*/
                dafage: req.body.dafage,
                dafdead: req.body.dafdead,
                damtype1: req.body.damtype1,
                /* damtype2: req.body.damtype2,*/
                damage: req.body.damage,
                damdead: req.body.damdead,
                oth1type1: req.body.oth1type1,
                /*oth1type2: req.body.oth1type2,*/
                oth1age: req.body.oth1age,
                oth1dead: req.body.oth1dead,
                oth2type1: req.body.oth2type1,
                /* oth2type2: req.body.oth2type2,*/
                oth2age: req.body.oth2age,
                oth2dead: req.body.oth2dead,
                oth3type1: req.body.oth3type1,
                /* oth3type2: req.body.oth3type2,*/
                oth3age: req.body.oth3age,
                oth3dead: req.body.oth3dead,
                pgx1: req.body.pgx1,
                pgx2: req.body.pgx2,
                pgx3: req.body.pgx3,
                pgx4: req.body.pgx4,
                pgx5: req.body.pgx5,
                pgx6: req.body.pgx6,
                pgx7: req.body.pgx7,
                pgx8: req.body.pgx8,
                pgx9: req.body.pgx9,
                pgx10: req.body.pgx10,
                pgx11: req.body.pgx11,
                pgx12: req.body.pgx12,
                pgx13: req.body.pgx13,
                pgx14: req.body.pgx14,
                pgx15: req.body.pgx15,
                pgx16: req.body.pgx16,
                pgx17: req.body.pgx17,
                pgx18: req.body.pgx18,
                carrier: req.body.carrier,
                carrierplan: req.body.carrierplan,
                carrierpolicyno: req.body.carrierpolicyno,
                cancer_sup: Number(req.body.cancer_sup),
                catheters_sup: Number(req.body.catheters_sup),
                allergies_sup: Number(req.body.allergies_sup),
                scooter_sup: Number(req.body.scooter_sup),
                walker_sup: Number(req.body.walker_sup),
                braces_sup: Number(req.body.braces_sup),
                topical_sup: Number(req.body.topical_sup),
                pain_sup: Number(req.body.pain_sup),
                wound_sup: Number(req.body.wound_sup),
                diabetic_sup: Number(req.body.diabetic_sup),
              triedbraces: req.body.triedbraces,
              lastbrace: req.body.lastbrace,
                familyrelation0: req.body.familyrelation0,
                familyrelation1: req.body.familyrelation1,
                familyrelation2: req.body.familyrelation2,
                familyrelation3: req.body.familyrelation3,
                familyrelation4: req.body.familyrelation4,
                familyrelation5: req.body.familyrelation5,
                familyrelation6: req.body.familyrelation6,
                familyrelation7: req.body.familyrelation7,
                familyrelation8: req.body.familyrelation8,
                familyrelation9: req.body.familyrelation9,
                familyrelation10: req.body.familyrelation10,
                familyrelation11: req.body.familyrelation11,
                familyrelation12: req.body.familyrelation12,
                familyrelation13: req.body.familyrelation13,
                familyrelation14: req.body.familyrelation14,
                familyrelation15: req.body.familyrelation15,
                familyrelation16: req.body.familyrelation16,
                familyrelation17: req.body.familyrelation17,
                relation1: req.body.relation1,
                relation2: req.body.relation2,
                relation3: req.body.relation3,
                relation4: req.body.relation4,
                relation5: req.body.relation5,
                relation6: req.body.relation6,
                relation7: req.body.relation7,
                relation8: req.body.relation8,
                relation9: req.body.relation9,
                relation10: req.body.relation10,
                relation11: req.body.relation11,
                relation12: req.body.relation12,
                relation13: req.body.relation13,
                relation14: req.body.relation14,
                relation15: req.body.relation15,
                relation16: req.body.relation16,
                relation17: req.body.relation17,
                relation18: req.body.relation18,
                degree1: req.body.degree1,
                degree2: req.body.degree2,
                degree3: req.body.degree3,
                degree4: req.body.degree4,
                degree5: req.body.degree5,
                degree6: req.body.degree6,
                degree7: req.body.degree7,
                degree8: req.body.degree8,
                degree9: req.body.degree9,
                degree10: req.body.degree10,
                degree11: req.body.degree11,
                degree12: req.body.degree12,
                degree13: req.body.degree13,
                degree14: req.body.degree14,
                degree15: req.body.degree15,
                degree16: req.body.degree16,
                degree17: req.body.degree17,
                degree18: req.body.degree18,
                hit_map_value: req.body.hit_map_value,
                phname: req.body.phname,
                familyrelation1name: req.body.familyrelation1name,
                familyrelation2name: req.body.familyrelation2name,
                familyrelation3name: req.body.familyrelation3name,
                familyrelation4name: req.body.familyrelation4name,
                familyrelation5name: req.body.familyrelation5name,
                familyrelation6name: req.body.familyrelation6name,
                familyrelation7name: req.body.familyrelation7name,
                familyrelation8name: req.body.familyrelation8name,
                familyrelation9name: req.body.familyrelation9name,
                familyrelation10name: req.body.familyrelation10name,
                familyrelation11name: req.body.familyrelation11name,
                familyrelation12name: req.body.familyrelation12name,
                familyrelation13name: req.body.familyrelation13name,
                familyrelation14name: req.body.familyrelation14name,
                familyrelation15name: req.body.familyrelation15name,
                familyrelation16name: req.body.familyrelation16name,
                familyrelation17name: req.body.familyrelation17name,
                iscompleted: Number(req.body.iscompleted),

                insurance1_1: Number(req.body.insurance1_1),
                insurance2_1: Number(req.body.insurance2_1),
                insurance3_1: Number(req.body.insurance3_1),
                insurance4_1: Number(req.body.insurance4_1),
                planbcard_1: Number(req.body.planbcard_1),
                medicarepolicyno_1: req.body.medicarepolicyno_1,
                mediprimarypolicy_1: Number(req.body.mediprimarypolicy_1),
                comprimarypolicy_1: Number(req.body.comprimarypolicy_1),
                medadvantageprimarypolicy_1: Number(req.body.medadvantageprimarypolicy_1),
                medadvantageplan_1: req.body.medadvantageplan_1,
                medadvantagepolicyno_1: req.body.medadvantagepolicyno_1,
                carrier_1: req.body.carrier_1,
                carrierplan_1: req.body.carrierplan_1,
                carrierpolicyno_1: req.body.carrierpolicyno_1,
                insurance1_2: Number(req.body.insurance1_2),
                insurance2_2: Number(req.body.insurance2_2),
                insurance3_2: Number(req.body.insurance3_2),
                insurance4_2: Number(req.body.insurance4_2),
                planbcard_2: Number(req.body.planbcard_2),
                medicarepolicyno_2: req.body.medicarepolicyno_2,
                mediprimarypolicy_2: Number(req.body.mediprimarypolicy_2),
                comprimarypolicy_2: Number(req.body.comprimarypolicy_2),
                medadvantageprimarypolicy_2: Number(req.body.medadvantageprimarypolicy_2),
                medadvantageplan_2: req.body.medadvantageplan_2,
                medadvantagepolicyno_2: req.body.medadvantagepolicyno_2,
                carrier_2: req.body.carrier_2,
                carrierplan_2: req.body.carrierplan_2,
                carrierpolicyno_2: req.body.carrierpolicyno_2,
                insurance1_3: Number(req.body.insurance1_3),
                insurance2_3: Number(req.body.insurance2_3),
                insurance3_3: Number(req.body.insurance3_3),
                insurance4_3: Number(req.body.insurance4_3),
                planbcard_3: Number(req.body.planbcard_3),
                medicarepolicyno_3: req.body.medicarepolicyno_3,
                mediprimarypolicy_3: Number(req.body.mediprimarypolicy_3),
                comprimarypolicy_3: Number(req.body.comprimarypolicy_3),
                medadvantageprimarypolicy_3: Number(req.body.medadvantageprimarypolicy_3),
                medadvantageplan_3: req.body.medadvantageplan_3,
                medadvantagepolicyno_3: req.body.medadvantagepolicyno_3,
                carrier_3: req.body.carrier_3,
                carrierplan_3: req.body.carrierplan_3,
                carrierpolicyno_3: req.body.carrierpolicyno_3,
                insurance1_4: Number(req.body.insurance1_4),
                insurance2_4: Number(req.body.insurance2_4),
                insurance3_4: Number(req.body.insurance3_4),
                insurance4_4: Number(req.body.insurance4_4),
                planbcard_4: Number(req.body.planbcard_4),
                medicarepolicyno_4: req.body.medicarepolicyno_4,
                mediprimarypolicy_4: Number(req.body.mediprimarypolicy_4),
                comprimarypolicy_4: Number(req.body.comprimarypolicy_4),
                medadvantageprimarypolicy_4: Number(req.body.medadvantageprimarypolicy_4),
                medadvantageplan_4: req.body.medadvantageplan_4,
                medadvantagepolicyno_4: req.body.medadvantagepolicyno_4,
                carrier_4: req.body.carrier_4,
                carrierplan_4: req.body.carrierplan_4,
                carrierpolicyno_4: req.body.carrierpolicyno_4,
                insurance1_5: Number(req.body.insurance1_5),
                insurance2_5: Number(req.body.insurance2_5),
                insurance3_5: Number(req.body.insurance3_5),
                insurance4_5: Number(req.body.insurance4_5),
                planbcard_5: Number(req.body.planbcard_5),
                medicarepolicyno_5: req.body.medicarepolicyno_5,
                mediprimarypolicy_5: Number(req.body.mediprimarypolicy_5),
                comprimarypolicy_5: Number(req.body.comprimarypolicy_5),
                medadvantageprimarypolicy_5: Number(req.body.medadvantageprimarypolicy_5),
                medadvantageplan_5: req.body.medadvantageplan_5,
                medadvantagepolicyno_5: req.body.medadvantagepolicyno_5,
                carrier_5: req.body.carrier_5,
                carrierplan_5: req.body.carrierplan_5,
                carrierpolicyno_5: req.body.carrierpolicyno_5,
                insurance1_6: Number(req.body.insurance1_6),
                insurance2_6: Number(req.body.insurance2_6),
                insurance3_6: Number(req.body.insurance3_6),
                insurance4_6: Number(req.body.insurance4_6),
                planbcard_6: Number(req.body.planbcard_6),
                medicarepolicyno_6: req.body.medicarepolicyno_6,
                mediprimarypolicy_6: Number(req.body.mediprimarypolicy_6),
                comprimarypolicy_6: Number(req.body.comprimarypolicy_6),
                medadvantageprimarypolicy_6: Number(req.body.medadvantageprimarypolicy_6),
                medadvantageplan_6: req.body.medadvantageplan_6,
                medadvantagepolicyno_6: req.body.medadvantagepolicyno_6,
                carrier_6: req.body.carrier_6,
                carrierplan_6: req.body.carrierplan_6,
                carrierpolicyno_6: req.body.carrierpolicyno_6,
                breastcancercount: Number(req.body.breastcancercount),
                ovariantcancercount: Number(req.body.ovariantcancercount),
                digestivecancercount: Number(req.body.digestivecancercount)
            }
            collection.update({patientid: o_patientid}, {$set: data}, function (err, result) {
                if (err) {
                    resp.send(JSON.stringify({'status': 'error', 'id': 0}));
                    throw err;
                }
                else {
                    if (req.body.iscompleted == 1) {
                        var collection1 = db.collection('tags');
                        collection1.find({tagname: 'PPS Submitted'}).toArray(function (err1, items1) {
                            if (items1.length > 0) {
                                var collection2 = db.collection('usertags');
                                collection2.deleteOne({userid: o_patientid}, function(err3, result3) {
                                    if (err3){
                                        resp.send("failed");
                                        throw err;
                                    }
                                    else {
                                        collection2.insert([{
                                            userid: o_patientid,
                                            tagid: items1[0]._id,
                                        }], function (err2, result2) {
                                            if (err2) {
                                                console.log('error2' + err2);
                                                resp.send(JSON.stringify({'status': 'error', 'id': 0}));
                                            } else {
                                                console.log(result2);
                                                if(helpdeskmailid !=null){
                                                    var maillist = [
                                                        'merry@yopmail.com',
                                                        helpdeskmailid
                                                    ];
                                                    var smtpTransport = mailer.createTransport({
                                                        service: "Gmail",
                                                        auth: {
                                                            user: "itplcc40@gmail.com",
                                                            pass: "DevelP7@"
                                                        }
                                                    });
                                                    var mail = {
                                                        from: "Greenvalley Health Admin <support@greenvalley.com>",
                                                        to: maillist,
                                                        subject: 'New patient profile sheet submitted.',
                                                        html: req.body.firstname1+' '+req.body.lastname1+' patient has been added under '+req.body.addedbyrepdetailname+' rep.<br/><br/>Patient Id: '+req.body.uniqueid+'<br/><br/>Hit Map Value : '+req.body.hit_map_value+'.'

                                                    }
                                                    smtpTransport.sendMail(mail, function (error, response) {
                                                        console.log('send');
                                                        smtpTransport.close();
                                                    });
                                                }
                                                resp.send(JSON.stringify({'status': 'success'}));
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                    else {
                        resp.send(JSON.stringify({'status': 'success'}));
                    }
                    /*    collection.update({email: req.body.usernameoremail}, {$set: data}, function (err, results) {
                        if (err) {
                            console.log('error'+err);
                            resp.send(JSON.stringify({'status':'error','id':1}));
                            return;
                        } else {
                            resp.send(JSON.stringify({'status': 'success', 'msg': items[0]}));
                            return;
                        }
                    });*/
                   /* var collection11 = db.collection('patients');
                    var data = {
                        hit_map_value : req.body.hit_map_value
                    }
                    console.log('data===================3070');
                    console.log(data);
                    collection11.update({_id:o_patientid}, {$set: data}, true, true);*/
                }
            });
        }
    });


  var collection11 = db.collection('patients');
  var data = {
    hit_map_value : req.body.hit_map_value
  }
  console.log('data===================3070');
  console.log(data);
  collection11.update({_id:o_patientid}, {$set: data}, true, true);


  if(req.body.note!=null) {
  //  addnote(o_patient_id,o_added_by_id,req.body.note,added_on);
    var collection2 = db.collection('patientnotes');
    collection2.insert([{
      patientid: o_patientid,
      added_by: o_added_by_id,
      note: req.body.note,
      added_on: added_on
    }], function (err2, result2) {
      if (err2) {
        console.log('error' + err1);
      //  resp.send(JSON.stringify({'status': 'error', 'id': 0}));
      } else {
        console.log(result2);
      //  resp.send(JSON.stringify({'status': 'success', 'id': result2.ops[0]._id}));
      }
    });
  }

});

/*function addnote(o_patient_id,o_added_by_id,reqbodynote,added_on){

    var collection2 = db.collection('patientnotes');
    collection2.insert([{
      patientid: o_patient_id,
      added_by: o_added_by_id,
      note: reqbodynote,
      added_on: added_on
    }], function (err2, result2) {
      if (err2) {
        console.log('error' + err1);
        resp.send(JSON.stringify({'status': 'error', 'id': 0}));
      } else {
        console.log(result2);
        resp.send(JSON.stringify({'status': 'success', 'id': result2.ops[0]._id}));
      }
    });
}*/

app.get('/patientList',function (req,resp) {
    var collection = db.collection('patients');
    collection.find().toArray(function(err, items) {
        if (err) {
            console.log(err);
            resp.send(JSON.stringify({'status':'error','id':[]}));
        } else {
            resp.send(JSON.stringify({'status':'success','id':items}));
        }
    });
});
app.get('/alltags',function (req,resp) {
    var collection = db.collection('tags');
    collection.find().toArray(function(err, items) {
        if (err) {
            console.log(err);
            resp.send(JSON.stringify({'status':'error','id':[]}));
        } else {
            resp.send(JSON.stringify({'status':'success','id':items}));
        }
    });
});

app.get('/patient_addedbylist',function (req,resp) {

  var collection = db.collection('patientrecordview');


 /* if(!isNaN(req.query.limit)) var limitval=req.query.limit;
  else vat limitval=1000000000000000;*/
  if(typeof (req.query.limit)=='undefined' || req.query.limit=='') var limitval=10000000000000000;
  else var limitval=parseInt(req.query.limit);
  //resp.send(JSON.stringify({'status':'success','id':limitval}));
  //return;
  if(typeof (req.query.userid)=='undefined' || req.query.userid=='') {
    collection.find().limit(limitval).toArray(function (err, items) {
      if (err) {
        console.log(err);
        resp.send(JSON.stringify({'status': 'error', 'id': err}));
      } else {
        resp.send(JSON.stringify({'status': 'success', 'id': items}));
      }
    });
  }else{
    var userid=new mongodb.ObjectID(req.query.userid);
    //resp.send("eee"+req.query.userid);return;
    collection.find({addedby:userid}).limit(limitval).toArray(function (err, items) {
      if (err) {
        console.log(err);
        resp.send(JSON.stringify({'status': 'error', 'id': err}));
      } else {
        resp.send(JSON.stringify({'status': 'success', 'id': items}));
      }
    });
  }
  return;
    var collection = db.collection('patients').aggregate([
        {

            $lookup: {
                from: "users",
                localField: "addedby", // localfield of patients
                foreignField: "_id", // localfield of users
                as: "Addedbydetail"
            }
        },

        {
            $lookup: {
                from: "patientrecord",
                localField: "_id",   // localfield of patients
                foreignField: "patientid",   //localfield of patientrecord
                as: "PatientRecordCompletedOrNot"
            }
        },
        {
            $lookup: {
                from: "usertags",
                localField: "_id", // localfield of patients
                foreignField: "userid", // localfield of usertags
                as: "Tagdetail"
            }
        },
        {
            $lookup: {
                from: "commoncancersymptomsrecord",
                localField: "_id", // localfield of patients
                foreignField: "patientid", // localfield of usertags
                as: "Commoncancersymptomdetail"
            }
        },
        {
            $lookup: {
                from: "medicationpgxrecord",
                localField: "_id", // localfield of patients
                foreignField: "patientid", // localfield of usertags
                as: "Medicationpgxdetail"
            }
        },
        //{ $limit : 5 },
        // { "$match": { "iscompleted": 1 } },
    ]);
    collection.toArray(function (err, items) {
        resp.send(JSON.stringify({'status':'success','id':items}));
    });
});

app.get('/apidatawall',function (req,resp) {
  var collection = db.collection('dataapi');
    collection.find().limit(10).toArray(function (err, items) {
      if (err) {
        console.log(err);
        resp.send(JSON.stringify({'status': 'error', 'id': err}));
      } else {
        resp.send(JSON.stringify({'status': 'success', 'data': items}));
      }
    });
});

app.get('/getuserdetailswithtags',function (req,resp) {
    req.body=req.query;
    var o_id = new mongodb.ObjectID(req.body.userid);
    var collection = db.collection('users').aggregate([
        { "$match": { "_id": o_id } },
        {
            $lookup: {
                from: "usertags",
                localField: "_id", // localfield of patients
                foreignField: "userid", // localfield of usertags
                as: "Tagdetail"
            }
        }
    ]);
    collection.toArray(function (err, items) {
        resp.send(JSON.stringify({'status':'success','id':items[0]}));
    });
});

app.get('/getuserdetailswithtagsn',function (req,resp) {
    // /req.param('color');
    //resp.send(JSON.stringify(req.param('id')));
    var o_id = new mongodb.ObjectID(req.param('id'));
    var collection = db.collection('usertags').aggregate([

        {
            $lookup: {
                from: "users",
                localField: "userid", // localfield of patients
                foreignField: "_id", // localfield of usertags
                as: "userdetail"
            }
        },
        {
            $unwind: {
                path: "$userdetail",
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $lookup: {
                from: "tags",
                localField: "tagid", // localfield of patients
                foreignField: "_id", // localfield of usertags
                as: "Tags"
            }
        },
        { "$match": { "userdetail._id": o_id } }
    ]);
    collection.toArray(function (err, items) {
        resp.send(JSON.stringify({'status':'success','id':items[0]}));
    });
});


app.get('/patient_addedbylist_only6',function (req,resp) {
    var collection = db.collection('patients').aggregate([
        { $sort : { added_on : -1 } },
        { $limit : 6 },
        {

            $lookup: {
                from: "users",
                localField: "addedby", // localfield of patients
                foreignField: "_id", // localfield of users
                as: "Addedbydetail"
            }
        },

        {
            $lookup: {
                from: "patientrecord",
                localField: "_id",   // localfield of patients
                foreignField: "patientid",   //localfield of patientrecord
                as: "PatientRecordCompletedOrNot"
            }
        },
        {
            $lookup: {
                from: "usertags",
                localField: "_id", // localfield of patients
                foreignField: "userid", // localfield of usertags
                as: "Tagdetail"
            }
        },
        //{ $limit : 5 },
        // { "$match": { "iscompleted": 1 } },
    ]);
    collection.toArray(function (err, items) {
        resp.send(JSON.stringify({'status':'success','id':items}));
    });
});
app.get('/getpatientlistunderthisid_only6',function (req,resp) {
    req.body=req.query;
    var o_id = new mongodb.ObjectID(req.body.userid);
    var collection = db.collection('patients').aggregate([
        { $sort : { added_on : -1 } },
        { $limit : 6 },
        { "$match": { "addedby": o_id} },
        {
            $lookup: {
                from: "usertags",
                localField: "_id", // localfield of patients
                foreignField: "userid", // localfield of usertags
                as: "Tagdetail"
            }
        },
        /* {
             $lookup: {
                 from: "tags",
                 localField: "Tagdetail[0].tagid",   // localfield of patients
                 foreignField: "tagname",   //localfield of patientrecord
                 as: "Tagname"
             }
         },*/

    ]);
    collection.toArray(function (err, items) {
        resp.send(JSON.stringify({'status':'success','id':items}));
    });
});




app.get('/getsubmitaprovePatient_addedbyList_all',function (req,resp) {
    req.body=req.query;
    //type 1 for admin
    if(req.body.type==1){
        var collection = db.collection('patients').aggregate([
            {
                $lookup: {
                    from: "usertags",
                    localField: "_id",
                    foreignField: "userid",
                    as: "Tagdetail"
                }
            },
        ]);
        collection.toArray(function (err, items) {
            resp.send(JSON.stringify({'status':'success','id':items}));
        });
    }
    //type 1 for user
    if(req.body.type==2){
        var o_id = new mongodb.ObjectID(req.body.userid);
        var collection = db.collection('patients').aggregate([
            { "$match": { "addedby": o_id} },
            {
                $lookup: {
                    from: "usertags",
                    localField: "_id",
                    foreignField: "userid",
                    as: "Tagdetail"
                }
            },
        ]);
        collection.toArray(function (err, items) {
            resp.send(JSON.stringify({'status':'success','id':items}));
        });
    }

});

app.get('/getpatientlistunderthisid',function (req,resp) {
    req.body=req.query;
    var o_id = new mongodb.ObjectID(req.body.userid);
  //patientrecordview
  var collection = db.collection('patientrecordview');
  //if(typeof (req.query.limit)=='undefined' || req.query.limit=='') var limitval=10000000000000000;
  //else var limitval=parseInt(req.query.limit);
  //resp.send(JSON.stringify({'status':'success','id':limitval}));
  //return;
  collection.find({"addedby": o_id}).toArray(function(err, items) {
    if (err) {
      console.log(err);
      resp.send(JSON.stringify({'status':'error','id':err}));
    } else {
      resp.send(JSON.stringify({'status':'success','id':items}));
    }
  });
  return;
    var collection = db.collection('patients').aggregate([
        { "$match": { "addedby": o_id} },
        {
            $lookup: {
                from: "usertags",
                localField: "_id", // localfield of patients
                foreignField: "userid", // localfield of usertags
                as: "Tagdetail"
            }
        },
        /* {
             $lookup: {
                 from: "tags",
                 localField: "Tagdetail[0].tagid",   // localfield of patients
                 foreignField: "tagname",   //localfield of patientrecord
                 as: "Tagname"
             }
         },*/
        {
            $lookup: {
                from: "patientrecord",
                localField: "_id",   // localfield of patients
                foreignField: "patientid",   //localfield of patientrecord
                as: "PatientRecordCompletedOrNot"
            }
        },
    ]);
    collection.toArray(function (err, items) {
        resp.send(JSON.stringify({'status':'success','id':items}));
    });
});
/*app.get('/patient_addedbylist',function (req,resp) {
    var collection = db.collection('patients').aggregate([
        {

            $lookup: {
                from: "users",
                localField: "addedby", // localfield of patients
                foreignField: "_id", // localfield of users
                as: "Addedbydetail"
            }
        },

        {
            $lookup: {
                from: "patientrecord",
                localField: "_id",   // localfield of patients
                foreignField: "patientid",   //localfield of patientrecord
                as: "PatientRecordCompletedOrNot"
            }
        },
        {
            $lookup: {
                from: "usertags",
                localField: "_id", // localfield of patients
                foreignField: "userid", // localfield of usertags
                as: "Tagdetail"
            }
        },
        //{ $limit : 5 },
        // { "$match": { "iscompleted": 1 } },
    ]);
    collection.toArray(function (err, items) {
        resp.send(JSON.stringify({'status':'success','id':items}));
    });
});*/
/*app.post('/gettotalnoofpatientsunderthisid',function (req,resp) {
    var o_id = new mongodb.ObjectID(req.body.userid);
    var collection = db.collection('patients').aggregate([
        { "$match": { "addedby": o_id} },
        {
            $lookup: {
                from: "usertags",
                localField: "_id", // localfield of patients
                foreignField: "userid", // localfield of usertags
                as: "Tagdetail"
            }
        },
    ]);
    collection.toArray(function (err, items) {
        resp.send(JSON.stringify({'status':'success','id':items}));
    });
});*/



/*

app.post('/getpatientlistunderthisid',function (req,resp) {
    var o_id = new mongodb.ObjectID(req.body.userid);
    console.log(o_id);
    var collection = db.collection('patients');
    collection.find({addedby:o_id}).toArray(function(err, items) {
        if (err) {
            console.log(err);
            resp.send(JSON.stringify({'status':'error','id':[]}));
        } else {
            resp.send(JSON.stringify({'status':'success','id':items}));
        }
    });
});
*/


app.get('/gettagvalue',function (req,resp) {
    req.body=req.query;
    var o_id = new mongodb.ObjectID(req.body.userid);
    var collection = db.collection('usertags');
    collection.find({userid:o_id}).toArray(function(err, items) {
        if (err) {
            console.log(err);
            resp.send(JSON.stringify({'status':'error','id':[]}));
        } else {
            resp.send(JSON.stringify({'status':'success','id':items}));
        }
    });
});


app.get('/userList',function (req,resp) {
    var collection = db.collection('users');
    collection.find().toArray(function(err, items) {
        if (err) {
            console.log(err);
            resp.send(JSON.stringify({'status':'error','id':[]}));
        } else {
            resp.send(JSON.stringify({'status':'success','id':items}));
        }
    });
});

/*app.get('/user&repcontractList',function (req,resp) {
    var collection = db.collection('users').aggregate([
        {
            $lookup: {
                from: "repcontract",
                localField: "_id", // localfield of users
                foreignField: "addedby", // localfield of repcontract
                as: "Repcontractdetail"
            }
        },
    ]);
    collection.toArray(function (err, items) {
        resp.send(JSON.stringify({'status':'success','id':items}));
    });
});*/
app.get('/usernrepcontractList',function (req,resp) {
    var collection = db.collection('users').aggregate([
        {
            $lookup: {
                from: "repcontract",
                localField: "_id", // localfield of users
                foreignField: "addedby", // localfield of repcontract
                as: "Repcontractdetail"
            }
        },
        {
            $lookup: {
                from: "usertags",
                localField: "_id", // localfield of users
                foreignField: "userid", // localfield of repcontract
                as: "Tagdetail"
            }
        },
    ]);
    collection.toArray(function (err, items) {
        resp.send(JSON.stringify({'status':'success','id':items}));
    });
});

app.get('/getpatientdetails',function(req,resp){        // this is for editadmin page
    //  console.log("getpatientdetails from server.js called");
    req.body=req.query;
    var resitem = {};
    var collection = db.collection('patients');
    var o_id = new mongodb.ObjectID(req.body._id);

    collection.find({_id:o_id}).toArray(function(err, items) {
        if (err) {
            resp.send(JSON.stringify({'status':'error','id':0}));
        } else {
            resitem = items[0];
            resp.send(JSON.stringify({'status':'success','item':resitem}));
        }
    });
});

app.get('/getrepdetails',function(req,resp){        // this is for editadmin page
    //  console.log("getrepdetails from server.js called");
    var resitem = {};
    req.body=req.query;
    var collection = db.collection('users');
    var o_id = new mongodb.ObjectID(req.body._id);

    collection.find({_id:o_id}).toArray(function(err, items) {
        if (err) {
            resp.send(JSON.stringify({'status':'error','id':0}));
        } else {
            resitem = items[0];
            resp.send(JSON.stringify({'status':'success','item':resitem}));
        }
    });
});

app.get('/getpatientrecord',function(req,resp){        // this is for editadmin page
    //  console.log("getpatientrecord from server.js called");
    var resitem = {};
    req.body=req.query;
    var collection = db.collection('patientrecord');
    var o_id = new mongodb.ObjectID(req.body._id);

    collection.find({patientid:o_id}).toArray(function(err, items) {
        if (err) {
            resp.send(JSON.stringify({'status':'error','id':0}));
        } else {
            resitem = items[0];
            resp.send(JSON.stringify({'status':'success','item':resitem}));
        }
    });
});

app.get('/getpatientrecordforpdf',function(req,resp){        // this is for editadmin page
    var resitem = {};
    var collection = db.collection('patientrecord');
    var o_id = new mongodb.ObjectID(req.query.id);
    collection.find({patientid:o_id}).toArray(function(err, items) {
        if (err) {
            resp.send(JSON.stringify({'status':'error','id':0}));
        } else {
            resitem = items[0];
            resp.send(JSON.stringify({'status':'success','item':resitem}));
        }
    });
});

app.get('/getcommoncancersymptomsforpdf',function(req,resp){        // this is for editadmin page
    var resitem = {};
    var collection = db.collection('commoncancersymptomsrecord');
    var o_id = new mongodb.ObjectID(req.query.id);
    collection.find({patientid:o_id}).toArray(function(err, items) {
        if (err) {
            resp.send(JSON.stringify({'status':'error','id':0}));
        } else {
            resitem = items[0];
            resp.send(JSON.stringify({'status':'success','item':resitem}));
        }
    });
});

app.get('/getpatientuniqueidforpatientrecordforpdf',function(req,resp){        // this is for editadmin page
    var resitem = {};
    var collection = db.collection('patients');
    var o_id = new mongodb.ObjectID(req.query.id);
    collection.find({_id:o_id}).toArray(function(err, items) {
        if (err) {
            resp.send(JSON.stringify({'status':'error','id':0}));
        } else {
            resitem = items[0];
            resp.send(JSON.stringify({'status':'success','item':resitem}));
        }
    });
});



app.get('/getrepidforpatientrecordforpdf',function(req,resp){        // this is for editadmin page
    var resitem = {};
    var collection = db.collection('users');
    var o_id = new mongodb.ObjectID(req.query.id);
    collection.find({_id:o_id}).toArray(function(err, items) {
        if (err) {
            resp.send(JSON.stringify({'status':'error','id':0}));
        } else {
            resitem = items[0];
            resp.send(JSON.stringify({'status':'success','item':resitem}));
        }
    });
});





app.get('/editpatient',function(req,resp){
    req.body=req.query;
    var collection = db.collection('patients');
    var data = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
        gender: req.body.gender,
        dob: req.body.dob,
        phone: req.body.phone,
        heightwidth: req.body.heightwidth,
        allergies: req.body.allergies,
        medicareclaim: req.body.medicareclaim,
        raceethnicity: req.body.raceethnicity,
        trackingno: req.body.trackingno,
        medicarecard: req.body.medicarecard,
        iscancer: req.body.iscancer,
        cancertypes: req.body.cancertypes,
        relation: req.body.relation,
        approxage: req.body.approxage
    }
    var o_id = new mongodb.ObjectID(req.body.id);
    collection.update({_id:o_id}, {$set: data}, true, true);

    resp.send(JSON.stringify({'status':'success'}));
});






app.get('/edituserdetails',function(req,resp){
    req.body=req.query;
    var collection = db.collection('users');
    console.log(req.body.password);
    if(req.body.password == null){
        console.log('no pass');
        var data = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            addedby: req.body.addedby,
            address: req.body.address,
            address2: req.body.address2,
            city: req.body.city,
            state: req.body.state,
            zip: req.body.zip,
            gender: req.body.gender,
            dob: req.body.dob,
            phone: req.body.phone,
            //  type: req.body.type,



            agentexperience: req.body.agentexperience,
            olderclients: req.body.olderclients,
            noofplanBcard: req.body.noofplanBcard,
        }
    }
    else{
        console.log('pass given');
        var crypto = require('crypto');
        var secret = req.body.password;
        var hash = crypto.createHmac('sha256', secret)
            .update('password')
            .digest('hex');
        var data = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            address: req.body.address,
            address2: req.body.address2,
            city: req.body.city,
            state: req.body.state,
            zip: req.body.zip,
            gender: req.body.gender,
            dob: req.body.dob,
            phone: req.body.phone,
            type: req.body.type,
            password: hash,



            agentexperience: req.body.agentexperience,
            olderclients: req.body.olderclients,
            noofplanBcard: req.body.noofplanBcard,
        }
    }
    var o_id = new mongodb.ObjectID(req.body.id);
    collection.update({_id:o_id}, {$set: data}, true, true);

    resp.send(JSON.stringify({'status':'success'}));
});


app.get('/forgetpassword', function (req, resp) {
    req.body=req.query;
    var collection = db.collection('users');
    collection.find({ email:req.body.email }).toArray(function(err, items) {
        if(items.length>0){
            var randomString1 = require('random-string');
            var randomcode= randomString1({length: 20, special: false});
            var data = {
                accesscode: randomcode,
            }
            collection.update({ email:req.body.email}, {$set: data}, true, true);
            var smtpTransport = mailer.createTransport({
                service: "Gmail",
                auth: {
                    user: "itplcc40@gmail.com",
                    pass: "DevelP7@"
                }
            });

            var mail = {
                from: "Greenvalley Health Admin <support@greenvalley.com>",
                to: req.body.email,
                subject: 'Forgotten Password on Greenvalley Health family',
                /* html: 'Please click on this link: <a href=http://nexhealthcarebackend.influxiq.com/resetpassword/'+randomcode+'>Click here</a>'*/
                html: 'Forgotten Password on Greenvalley Health<br/><br/>Please follow this link to reset your password:<br/><br/><a href=https://greenvalleyportal.com/#/resetpassword/'+randomcode+'>https://greenvalleyportal.com/#/resetpassword/'+randomcode+'</a><br/><br/>This link is only valid for 24 hours. If you can not click the above url to continue please copy and paste the url into your browser.<br/><br/><br/>This email has been auto-generated and requested by you. If you feel you have received this email in error, please contact the administrator.'
            }
            smtpTransport.sendMail(mail, function (error, response) {
                console.log('send');
                smtpTransport.close();
            });
            resp.send(JSON.stringify({'status':'success','msg':items[0]}));
        }
        if(items.length==0){
            resp.send(JSON.stringify({'status':'error','msg':'Emailid invalid...'}));
            return;
        }
    });
});

app.get('/newpassword', function (req, resp) {
    req.body=req.query;
    var collection = db.collection('users');
    var crypto = require('crypto');
    var secret = req.body.password;
    var hash = crypto.createHmac('sha256', secret)
        .update('password')
        .digest('hex');
    var data = {
        password: hash
    }
    var o_id = new mongodb.ObjectID(req.body.id);
    collection.update({_id:o_id}, {$set: data}, true, true);
    resp.send(JSON.stringify({'status': 'success', 'msg':''}));
});

app.get('/getuserdetailsbyaccesscode',function (req,resp) {
    req.body=req.query;
    var collection = db.collection('users');
    collection.find({accesscode:req.body.accesscode}).toArray(function(err, items) {
        if (err){
            resp.send(JSON.stringify({'id':0, 'status':'Some error occured..!'}));
        }
        else{
            resp.send(JSON.stringify({'id':items[0], 'status':'success'}));
        }
    });
});


function callrandomstring(){
    var randomString1 = require('random-string');
    return randomString1({length: 10, special: false});
}

app.get('/addcompensation',function(req,resp){
    req.body=req.query;
    var collection = db.collection('compensations');
    var o_id = new mongodb.ObjectID(req.body.userid);
    var generatecode = callrandomstring();
    collection.find({token:generatecode}).toArray(function(err, items) {
        if(items.length>0){
            callrandomstring();
        }
        else{
            collection.insert([{
                userid: o_id,
                amount: req.body.amount,
                token:generatecode

            }], function (err, result) {
                if (err) {
                    console.log('error'+err);
                    resp.send(JSON.stringify({'status':'error','id':0}));
                } else {
                    console.log(result);
                    resp.send(JSON.stringify({'status':'success','id':result.ops[0]._id}));
                }
            });
        }
    });

});


app.get('/getdetailsbycompensationtokenvalue',function (req,resp) {
    req.body=req.query;
    var collection = db.collection('compensations');
    var o_id = new mongodb.ObjectID(req.body.roleid);
    collection.find({userid: o_id , token:req.body.compensationtokenvalue}).toArray(function(err, items) {
        if (err){
            resp.send(JSON.stringify({'id':0, 'status':'Some error occured..!'}));
        }
        else{
            console.log(items);
            resp.send(JSON.stringify({'id':items[0], 'status':'success'}));
        }
    });
});

app.get('/getnotes',function (req,resp) {
    req.body=req.query;
    var collection = db.collection('patientnotes');
    var o_patientid = new mongodb.ObjectID(req.body.patientid);
    collection.find({patientid: o_patientid}).toArray(function(err, items) {
        if (err){
            resp.send(JSON.stringify({'id':0, 'status':'Some error occured..!'}));
        }
        else{
            resp.send(JSON.stringify({'id':items, 'status':'success'}));
        }
    });
});

app.get('/getnotesforusers',function (req,resp) {
    req.body=req.query;
    var collection = db.collection('usernotes');
    var o_userid = new mongodb.ObjectID(req.body.userid);
    collection.find({userid: o_userid}).toArray(function(err, items) {
        if (err){
            resp.send(JSON.stringify({'id':0, 'status':'Some error occured..!'}));
        }
        else{
            resp.send(JSON.stringify({'id':items, 'status':'success'}));
        }
    });
});
app.get('/getallusers',function (req,resp) {
    var collection = db.collection('users');
    collection.find().toArray(function(err, items) {
        if (err){
            resp.send(JSON.stringify({'id':0, 'status':'Some error occured..!'}));
        }
        else{
            resp.send(JSON.stringify({'id':items, 'status':'success'}));
        }
    });
});


app.get('/getcompensationdetailsbyusernameandamount',function (req,resp) {
    req.body=req.query;
    var collection = db.collection('compensations');
    var o_id = new mongodb.ObjectID(req.body.userid);
    collection.find({userid:o_id, amount: req.body.amount}).toArray(function(err, items) {
        if (err){
            resp.send(JSON.stringify({'id':0, 'status':'Some error occured..!'}));
        }
        else{
            console.log(items);
            if(items.length>0) {
                resp.send(JSON.stringify({'id':items[0], 'status':'alreadyhavecgx'}));
            }
            else{
                collection.find({userid:o_id, pgxvalue: req.body.pgxvalue}).toArray(function(err1, items1) {
                    if (err1){
                        resp.send(JSON.stringify({'id':0, 'status':'Some error occured..!'}));
                    }
                    else{
                        console.log(items1);
                        if(items1.length>0) {
                            resp.send(JSON.stringify({'id':items1[0], 'status':'alreadyhavepgx'}));
                        }
                        else{
                            resp.send(JSON.stringify({'id':1, 'status':'success'}));
                        }
                    }
                });
                // resp.send(JSON.stringify({'id':1, 'status':'success'}));
            }
        }
    });
});


app.get('/compensationlistbyuserid',function (req,resp) {
    req.body=req.query;
    var collection = db.collection('compensations');
    var o_id = new mongodb.ObjectID(req.body.userid);

    collection.find({userid:o_id}).toArray(function(err, items) {
        if (err) {
            console.log(err);
            resp.send(JSON.stringify({'status':'error','id':[]}));
        } else {
            resp.send(JSON.stringify({'status':'success','id':items}));
        }
    });
});


app.get('/detailsusinglogintoken',function (req,resp) {
    var collection = db.collection('users');
    console.log('req.body.logintoken');
    req.body=req.query;
    console.log(req.body.logintoken);
    collection.find({logintoken:req.body.logintoken}).toArray(function(err, items) {
        if (err){
            resp.send(JSON.stringify({'id':0, 'status':'Some error occured..!'}));
        }
        else{
            console.log(items);
            var data = {
                logintoken: ''
            }

            // resp.send(JSON.stringify({'id':items[0], 'status':'success'}));
            // /collection.update({logintoken:req.body.logintoken}, {$set: data}, true, true);
            resp.send(JSON.stringify({'msg':items[0], 'status':'success'}));
        }
    });
});
app.get('/detailsusinglogintokenval',function (req,resp) {
    var collection = db.collection('users');
    console.log('req.body.logintoken');
    req.body=req.query;
    console.log(req.body.idval);
    var o_id = new mongodb.ObjectID(req.query.idval);
    collection.find({_id:o_id}).toArray(function(err, items) {
        if (err){
            resp.send(JSON.stringify({'id':0, 'status':'Some error occured..!'}));
        }
        else{
            console.log(items);
            var data = {
                logintoken: ''
            }

            // resp.send(JSON.stringify({'id':items[0], 'status':'success'}));
            // /collection.update({logintoken:req.body.logintoken}, {$set: data}, true, true);
            resp.send(JSON.stringify({'msg':items[0], 'status':'success'}));
        }
    });
});

app.get('/gotowebinarapi', function (req, resp) {
    var collection = db.collection('gotowebinarapi');
    collection.insert([{
        consumerkey: '', // client id
        consumersecret: '',
        access_token: '',
        refresh_token: '',
        expires_in: '',
    }], function (err, result) {
        if (err) {
            console.log('error'+err);
            resp.send(JSON.stringify({'status':'error','id':0}));
        } else {
            resp.send(JSON.stringify({'status':'success','id':result.ops[0]._id}));
        }
    });
});

app.get('/getwebinarapivalue', function (req, resp) {
    var collection = db.collection('gotowebinarapi');
    collection.find().toArray(function(err, items) {
        if (err){
            resp.send(JSON.stringify({'id':0, 'status':'Some error occured..!'}));
        }
        else{
            resp.send(JSON.stringify({'id':items[0], 'status':'success'}));
        }
    });
});

app.get('/getusersofthisid', function (req, resp) {
    var o_id = new mongodb.ObjectID(req.query.id);
    var collection = db.collection('users');
    collection.find({_id:o_id}).toArray(function(err, items) {
        if (err){
            resp.send(JSON.stringify(0));
        }
        else{
            resp.send(JSON.stringify(items[0]));
        }
    });
});


app.get('/postwebinarapivalue', function (req, resp) {
    console.log(req.query.acccesstoken);
    console.log(req.query.exp);
    var collection = db.collection('gotowebinarapi');
    collection.update({}, {$set: {expires_in: req.query.exp,access_token: req.query.acccesstoken}}, function (err, results) {
        if (err) {
            resp.send(JSON.stringify({'status': 'error', 'id': 0}));
            throw err;
        }
        else {
            resp.send(JSON.stringify({'status': 'success', 'id': 1}));
        }

    });
});

app.get('/gettotalnoofpatients', function (req, resp) {
    var collection = db.collection('usertags');
    var a,b,c;
    var o_tag1 = new mongodb.ObjectID('5b0bfa1b3fe08865e7955f71');
    var o_tag2 = new mongodb.ObjectID('5b0bfa1d3fe08865e7955f72');
    var o_tag3 = new mongodb.ObjectID('5b0b9235b33cbc2d4af08dd9');
    collection.find({tagid:o_tag1}).toArray(function(err, items) { //ACCEPT
        a = items.length;
        collection.find({tagid:o_tag2}).toArray(function(err1, items1) { //DECLINED
            b = items1.length;
            collection.find({tagid:o_tag3}).toArray(function(err2, items2) { //submitted
                c = items2.length;
                resp.send(JSON.stringify({'accepted':a,'declined':b,'submitted':c, 'status':'success'}));
            });
        });
    });
});

app.get('/commoncancersymptoms',function(req,resp) {
    req.body=req.query;
    var o_patientid = new mongodb.ObjectID(req.body.patientid);
    var added_on = Date.now();
    var o_added_by_id = new mongodb.ObjectID(req.body.added_by);
    var collection = db.collection('commoncancersymptomsrecord');
    collection.find({patientid: o_patientid}).toArray(function (err, items) {
        if (items.length == 0) {
            collection.insert([{
                patientid: o_patientid,
                weightloss: Number(req.body.weightloss),
                appetite: Number(req.body.appetite),
                eatingdisorder: Number(req.body.eatingdisorder),
                unabdominalpain: Number(req.body.unabdominalpain),
                upabdominalpain: Number(req.body.upabdominalpain),
                ruquadrantpain: Number(req.body.ruquadrantpain),
                luquadrantpain: Number(req.body.luquadrantpain),
                labdominalpain: Number(req.body.labdominalpain),
                rlquadrantpain: Number(req.body.rlquadrantpain),
                llquadrantpain: Number(req.body.llquadrantpain),
                gabdominalpain: Number(req.body.gabdominalpain),
                vomiting1: Number(req.body.vomiting1),
                vomiting2: Number(req.body.vomiting2),
                vomiting3: Number(req.body.vomiting3),
                chronicfatigue: Number(req.body.chronicfatigue),
                otherfatigue: Number(req.body.otherfatigue),
                anemia: Number(req.body.anemia),
                jaundice: Number(req.body.jaundice),
                fatigue1: Number(req.body.fatigue1),
                fatigue2: Number(req.body.fatigue2),
                type1diabetes: Number(req.body.type1diabetes),
                type2diabetes: Number(req.body.type2diabetes),
                constipation: Number(req.body.constipation),
                abnormalweightloss: Number(req.body.abnormalweightloss),
                abnormalweightgain: Number(req.body.abnormalweightgain),
                hypertrophicdisorders: Number(req.body.hypertrophicdisorders),
                bloodinstool: Number(req.body.bloodinstool),
                skineruption: Number(req.body.skineruption),
                xerosiscutis: Number(req.body.xerosiscutis),
                lumpinbreast: Number(req.body.lumpinbreast),
                thickeningbreast: Number(req.body.thickeningbreast),
                disordersofbreast: Number(req.body.disordersofbreast),
                rednessnipple: Number(req.body.rednessnipple),
                nipplepain: Number(req.body.nipplepain),
                nippledischarge: Number(req.body.nippledischarge),
                breastsize: Number(req.body.breastsize),
                breastpain: Number(req.body.breastpain),
                uterinebleeding: Number(req.body.uterinebleeding),
                bloodinurine: Number(req.body.bloodinurine),
                melena: Number(req.body.melena),
                stomachpainabdominalpain: Number(req.body.stomachpainabdominalpain),
                bowelhabits: Number(req.body.bowelhabits),
                unconstipation: Number(req.body.unconstipation),
                diarrhea: Number(req.body.diarrhea),
                rectalbleeding: Number(req.body.rectalbleeding),
                abdominalbloating1: Number(req.body.abdominalbloating1),
                abdominalbloating2: Number(req.body.abdominalbloating2),
                idefecation: Number(req.body.idefecation),
                ofecalabnormalities: Number(req.body.ofecalabnormalities),
                pancreaticuabdominalpain: Number(req.body.pancreaticuabdominalpain),
                cholecystitis1: Number(req.body.cholecystitis1),
                cholecystitis2: Number(req.body.cholecystitis2),
                noofbloodclots: Number(req.body.noofbloodclots),
                iscompleted: Number(req.body.iscompleted)

            }], function (err, result) {
                if (err) {
                    console.log('error' + err);
                    resp.send(JSON.stringify({'status': 'error', 'id': 0}));
                } else {
                    console.log(result);
                    resp.send(JSON.stringify({'status': 'success', 'id': result.ops[0]._id}));
                }
            });
        }
        if (items.length > 0 ) {
            var data = {
                weightloss: Number(req.body.weightloss),
                appetite: Number(req.body.appetite),
                eatingdisorder: Number(req.body.eatingdisorder),
                unabdominalpain: Number(req.body.unabdominalpain),
                upabdominalpain: Number(req.body.upabdominalpain),
                ruquadrantpain: Number(req.body.ruquadrantpain),
                luquadrantpain: Number(req.body.luquadrantpain),
                labdominalpain: Number(req.body.labdominalpain),
                rlquadrantpain: Number(req.body.rlquadrantpain),
                llquadrantpain: Number(req.body.llquadrantpain),
                gabdominalpain: Number(req.body.gabdominalpain),
                vomiting1: Number(req.body.vomiting1),
                vomiting2: Number(req.body.vomiting2),
                vomiting3: Number(req.body.vomiting3),
                chronicfatigue: Number(req.body.chronicfatigue),
                otherfatigue: Number(req.body.otherfatigue),
                anemia: Number(req.body.anemia),
                jaundice: Number(req.body.jaundice),
                fatigue1: Number(req.body.fatigue1),
                fatigue2: Number(req.body.fatigue2),
                type1diabetes: Number(req.body.type1diabetes),
                type2diabetes: Number(req.body.type2diabetes),
                constipation: Number(req.body.constipation),
                abnormalweightloss: Number(req.body.abnormalweightloss),
                abnormalweightgain: Number(req.body.abnormalweightgain),
                hypertrophicdisorders: Number(req.body.hypertrophicdisorders),
                bloodinstool: Number(req.body.bloodinstool),
                skineruption: Number(req.body.skineruption),
                xerosiscutis: Number(req.body.xerosiscutis),
                lumpinbreast: Number(req.body.lumpinbreast),
                thickeningbreast: Number(req.body.thickeningbreast),
                disordersofbreast: Number(req.body.disordersofbreast),
                rednessnipple: Number(req.body.rednessnipple),
                nipplepain: Number(req.body.nipplepain),
                nippledischarge: Number(req.body.nippledischarge),
                breastsize: Number(req.body.breastsize),
                breastpain: Number(req.body.breastpain),
                uterinebleeding: Number(req.body.uterinebleeding),
                bloodinurine: Number(req.body.bloodinurine),
                melena: Number(req.body.melena),
                stomachpainabdominalpain: Number(req.body.stomachpainabdominalpain),
                bowelhabits: Number(req.body.bowelhabits),
                unconstipation: Number(req.body.unconstipation),
                diarrhea: Number(req.body.diarrhea),
                rectalbleeding: Number(req.body.rectalbleeding),
                abdominalbloating1: Number(req.body.abdominalbloating1),
                abdominalbloating2: Number(req.body.abdominalbloating2),
                idefecation: Number(req.body.idefecation),
                ofecalabnormalities: Number(req.body.ofecalabnormalities),
                pancreaticuabdominalpain: Number(req.body.pancreaticuabdominalpain),
                cholecystitis1: Number(req.body.cholecystitis1),
                cholecystitis2: Number(req.body.cholecystitis2),
                noofbloodclots: Number(req.body.noofbloodclots),
                iscompleted: Number(req.body.iscompleted)
            }
            collection.update({patientid: o_patientid}, {$set: data}, function (err, result) {
                if (err) {
                    resp.send(JSON.stringify({'status': 'error', 'id': 0}));
                    throw err;
                }
                else {
                    resp.send(JSON.stringify({'status': 'success'}));
                }
            });
        }
    });
  if(req.body.note!=null) {
    var collection2 = db.collection('patientnotes');
    collection2.insert([{
      patientid: o_patientid,
      added_by: o_added_by_id,
      note: req.body.note,
      added_on: added_on
    }], function (err2, result2) {
      if (err2) {
        console.log('error' + err1);
        //  resp.send(JSON.stringify({'status': 'error', 'id': 0}));
      } else {
        console.log(result2);
        //  resp.send(JSON.stringify({'status': 'success', 'id': result2.ops[0]._id}));
      }
    });
  }
});

/*-----------------------------------URL_UPDATE_END---------------------------------*/


app.get('/getusastates',function (req,resp) {


    var usastates=[
        {
            "name": "Alabama",
            "abbreviation": "AL"
        },
        {
            "name": "Alaska",
            "abbreviation": "AK"
        },
        /*  {
              "name": "American Samoa",
              "abbreviation": "AS"
          },*/
        {
            "name": "Arizona",
            "abbreviation": "AZ"
        },
        {
            "name": "Arkansas",
            "abbreviation": "AR"
        },
        {
            "name": "California",
            "abbreviation": "CA"
        },
        {
            "name": "Colorado",
            "abbreviation": "CO"
        },
        {
            "name": "Connecticut",
            "abbreviation": "CT"
        },
        {
            "name": "Delaware",
            "abbreviation": "DE"
        },
        /*{
            "name": "District Of Columbia",
            "abbreviation": "DC"
        },*/
        /* {
             "name": "Federated States Of Micronesia",
             "abbreviation": "FM"
         },*/
        {
            "name": "Florida",
            "abbreviation": "FL"
        },
        {
            "name": "Georgia",
            "abbreviation": "GA"
        },
        /*{
            "name": "Guam",
            "abbreviation": "GU"
        },*/
        {
            "name": "Hawaii",
            "abbreviation": "HI"
        },
        {
            "name": "Idaho",
            "abbreviation": "ID"
        },
        {
            "name": "Illinois",
            "abbreviation": "IL"
        },
        {
            "name": "Indiana",
            "abbreviation": "IN"
        },
        {
            "name": "Iowa",
            "abbreviation": "IA"
        },
        {
            "name": "Kansas",
            "abbreviation": "KS"
        },
        {
            "name": "Kentucky",
            "abbreviation": "KY"
        },
        {
            "name": "Louisiana",
            "abbreviation": "LA"
        },
        {
            "name": "Maine",
            "abbreviation": "ME"
        },
        /*{
            "name": "Marshall Islands",
            "abbreviation": "MH"
        },*/
        {
            "name": "Maryland",
            "abbreviation": "MD"
        },
        {
            "name": "Massachusetts",
            "abbreviation": "MA"
        },
        {
            "name": "Michigan",
            "abbreviation": "MI"
        },
        {
            "name": "Minnesota",
            "abbreviation": "MN"
        },
        {
            "name": "Mississippi",
            "abbreviation": "MS"
        },
        {
            "name": "Missouri",
            "abbreviation": "MO"
        },
        {
            "name": "Montana",
            "abbreviation": "MT"
        },
        {
            "name": "Nebraska",
            "abbreviation": "NE"
        },
        {
            "name": "Nevada",
            "abbreviation": "NV"
        },
        {
            "name": "New Hampshire",
            "abbreviation": "NH"
        },
        {
            "name": "New Jersey",
            "abbreviation": "NJ"
        },
        {
            "name": "New Mexico",
            "abbreviation": "NM"
        },
        {
            "name": "New York",
            "abbreviation": "NY"
        },
        {
            "name": "North Carolina",
            "abbreviation": "NC"
        },
        {
            "name": "North Dakota",
            "abbreviation": "ND"
        },
        /* {
             "name": "Northern Mariana Islands",
             "abbreviation": "MP"
         },*/
        {
            "name": "Ohio",
            "abbreviation": "OH"
        },
        {
            "name": "Oklahoma",
            "abbreviation": "OK"
        },
        {
            "name": "Oregon",
            "abbreviation": "OR"
        },
        /* {
             "name": "Palau",
             "abbreviation": "PW"
         },*/
        {
            "name": "Pennsylvania",
            "abbreviation": "PA"
        },
        /* {
             "name": "Puerto Rico",
             "abbreviation": "PR"
         },*/
        {
            "name": "Rhode Island",
            "abbreviation": "RI"
        },
        {
            "name": "South Carolina",
            "abbreviation": "SC"
        },
        {
            "name": "South Dakota",
            "abbreviation": "SD"
        },
        {
            "name": "Tennessee",
            "abbreviation": "TN"
        },
        {
            "name": "Texas",
            "abbreviation": "TX"
        },
        {
            "name": "Utah",
            "abbreviation": "UT"
        },
        {
            "name": "Vermont",
            "abbreviation": "VT"
        },
        /* {
             "name": "Virgin Islands",
             "abbreviation": "VI"
         },*/
        {
            "name": "Virginia",
            "abbreviation": "VA"
        },
        {
            "name": "Washington",
            "abbreviation": "WA"
        },
        {
            "name": "West Virginia",
            "abbreviation": "WV"
        },
        {
            "name": "Wisconsin",
            "abbreviation": "WI"
        },
        {
            "name": "Wyoming",
            "abbreviation": "WY"
        }
    ];

    resp.send(usastates);

});
var server = app.listen(port, function () {
    var host = server.address().address
    var port = server.address().port
    //  console.log("Example app listening at http://%s:%s", host, port)
})



//ADDED ON EXTRA DAY

app.get('/helpdesk',function(req,resp){
    req.body=req.query;
    var generatecode = randomnogenerate();
    var collection = db.collection('users');
    collection.find({uniqueid:req.body.uniqueid}).toArray(function(err, items) {
        if(items.length>0){
            randomnogenerate();
        }
        else{
            collection.find({email:req.body.email}).toArray(function(err, items) {
                if(items.length>0){
                    console.log('already exists with same mail id');
                    resp.send(JSON.stringify({'status':'error','id':'-1'}));
                }
                else{
                    collection.find({username:req.body.username}).toArray(function(err, items) {
                        if(items.length>0){
                            console.log('already exists with same username');
                            resp.send(JSON.stringify({'status':'error','id':'-2'}));
                        }
                        else{
                            console.log('uniqueid--------');
                            console.log(generatecode);
                            var crypto = require('crypto');
                            var secret = req.body.password;
                            var hash = crypto.createHmac('sha256', secret)
                                .update('password')
                                .digest('hex');
                            collection.insert([{
                                firstname: req.body.firstname,
                                lastname: req.body.lastname,
                                username: req.body.username,
                                email: req.body.email,
                                password: hash,
                                address: req.body.address,
                                city: req.body.city,
                                state: req.body.state,
                                zip: req.body.zip,
                                gender: req.body.gender,
                                dob: req.body.dob,
                                phone: req.body.phone,
                                type: req.body.type,
                                uniqueid:req.body.uniqueid,
                                addedby:req.body.addedby

                            }], function (err, result) {
                                if (err) {
                                    console.log('error'+err);
                                    resp.send(JSON.stringify({'status':'error','id':0}));
                                } else {
                                    var smtpTransport = mailer.createTransport({
                                        service: "Gmail",
                                        auth: {
                                            user: "itplcc40@gmail.com",
                                            pass: "DevelP7@"
                                        }
                                    });

                                    var mail = {
                                        from: "Greenvalley Health Admin <support@greenvalley.com>",
                                        to: req.body.email,
                                        subject: 'Welcome to the Greenvalley Health family',
                                        html: 'We are glad to inform you that you have been added as a Help desk.<br/><br/>Username:'+req.body.username+'<br/>Password:'+req.body.password+'.'
                                    }
                                    smtpTransport.sendMail(mail, function (error, response) {
                                        console.log('send');
                                        smtpTransport.close();
                                    });
                                    resp.send(JSON.stringify({'status':'success','id':result.ops[0]._id}));
                                }
                            });
                        }
                    });
                }
            });
        }
    });

});




app.get('/helpdesklist',function (req,resp) {
    var collection = db.collection('users');
    collection.find({type:'helpdesk'}).toArray(function(err, items) {
        if (err) {
            console.log(err);
            resp.send(JSON.stringify({'status':'error','id':[]}));
        } else {
            console.log(items);
            resp.send(JSON.stringify({'status':'success','id':items}));
        }
    });
});


app.get('/edithelpdeskdetails',function(req,resp){
    req.body=req.query;
    var collection = db.collection('users');
    console.log(req.body.password);
    if(req.body.password == null){
        console.log('no pass');
        var data = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            zip: req.body.zip,
            gender: req.body.gender,
            dob: req.body.dob,
            phone: req.body.phone
        }
    }
    else{
        console.log('pass given');
        var crypto = require('crypto');
        var secret = req.body.password;
        var hash = crypto.createHmac('sha256', secret)
            .update('password')
            .digest('hex');
        var data = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            zip: req.body.zip,
            gender: req.body.gender,
            dob: req.body.dob,
            phone: req.body.phone,
            password: hash
        }
    }
    var o_id = new mongodb.ObjectID(req.body.id);
    collection.update({_id:o_id}, {$set: data}, true, true);

    resp.send(JSON.stringify({'status':'success'}));
});

app.get('/assignehelpdesktopatient',function(req,resp){
    req.body=req.query;
    var collection = db.collection('patients');
    var o_helpdeskid = new mongodb.ObjectID(req.body.helpdeskid);
    var data = {
        helpdeskid: o_helpdeskid
    }
    var o_id = new mongodb.ObjectID(req.body.patientid);
    collection.update({_id:o_id}, {$set: data}, true, true);

    resp.send(JSON.stringify({'status':'success'}));
});

app.get('/gethelpdeskmailidbypatientid',function (req,resp) {
    req.body=req.query;
    var o_patientid = new mongodb.ObjectID(req.body.patientid);
    var collection = db.collection('patients').aggregate([
        { "$match": { "_id": o_patientid } },
        {
            $lookup: {
                from: "users",
                localField: "helpdeskid", // localfield of patients
                foreignField: "_id", // localfield of usertags
                as: "Helpdeskdetail"
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "addedby", // localfield of patients
                foreignField: "_id", // localfield of usertags
                as: "Addedbyrepdetail"
            }
        }
    ]);
    collection.toArray(function (err, items) {
        resp.send(JSON.stringify({'status':'success','id':items[0]}));
    });
});


app.get('/hitmapupdate',function(req,resp){
    req.body=req.query;
    var collection = db.collection('patientrecord');
    var o_patientid = new mongodb.ObjectID(req.body.patientid);
    var data = {
        hit_map_value: req.body.hit_map_value
    }
    collection.update({patientid:o_patientid}, {$set: data}, true, true);
    var collection11 = db.collection('patients');
    collection11.update({_id:o_patientid}, {$set: data}, true, true);
    resp.send(JSON.stringify({'status':'success'}));
});


/*---------------------------------  3/8/18  -------------------------------*/

app.get('/corporatemanager',function(req,resp){
    req.body=req.query;
    var generatecode = randomnogenerate();
    var collection = db.collection('users');
    collection.find({uniqueid:req.body.uniqueid}).toArray(function(err, items) {
        if(items.length>0){
            randomnogenerate();
        }
        else{
            collection.find({email:req.body.email}).toArray(function(err, items) {
                if(items.length>0){
                    console.log('already exists with same mail id');
                    resp.send(JSON.stringify({'status':'error','id':'-1'}));
                }
                else{
                    collection.find({username:req.body.username}).toArray(function(err, items) {
                        if(items.length>0){
                            console.log('already exists with same username');
                            resp.send(JSON.stringify({'status':'error','id':'-2'}));
                        }
                        else{
                            console.log('uniqueid--------');
                            console.log(generatecode);
                            var crypto = require('crypto');
                            var secret = req.body.password;
                            var hash = crypto.createHmac('sha256', secret)
                                .update('password')
                                .digest('hex');
                            collection.insert([{
                                firstname: req.body.firstname,
                                lastname: req.body.lastname,
                                username: req.body.username,
                                email: req.body.email,
                                password: hash,
                                address: req.body.address,
                                city: req.body.city,
                                state: req.body.state,
                                zip: req.body.zip,
                                gender: req.body.gender,
                                dob: req.body.dob,
                                phone: req.body.phone,
                                type: req.body.type,
                                uniqueid:req.body.uniqueid,
                                addedby:req.body.addedby

                            }], function (err, result) {
                                if (err) {
                                    console.log('error'+err);
                                    resp.send(JSON.stringify({'status':'error','id':0}));
                                } else {
                                    var smtpTransport = mailer.createTransport({
                                        service: "Gmail",
                                        auth: {
                                            user: "itplcc40@gmail.com",
                                            pass: "DevelP7@"
                                        }
                                    });
                                    var mail = {
                                        from: "Greenvalley Health Admin <support@greenvalley.com>",
                                        to: req.body.email,
                                        subject: 'Welcome to the Greenvalley Health family',
                                        html: 'We are glad to inform you that you have been added as a Corporate Manager.<br/><br/>Username:'+req.body.username+'<br/>Password:'+req.body.password+'.'
                                    }
                                    smtpTransport.sendMail(mail, function (error, response) {
                                        console.log('send');
                                        smtpTransport.close();
                                    });
                                    resp.send(JSON.stringify({'status':'success','id':result.ops[0]._id}));
                                }
                            });
                        }
                    });
                }
            });
        }
    });

});


app.get('/mastergroupadd',function(req,resp){
    req.body=req.query;
    var collection = db.collection('mastergroup');
    collection.find({groupname:req.body.groupname}).toArray(function(err, items) {
        if(items.length>0){
            resp.send(JSON.stringify({'status':'error','id':'-1'}));
        }
        else{
            var o_groupcorporatemanager = new mongodb.ObjectID(req.body.groupcorporatemanager);
            collection.insert([{
                groupname: req.body.groupname,
                groupdescription: req.body.groupdescription,
                groupcorporatemanager: o_groupcorporatemanager,
                groupactive: req.body.groupactive,
                overridename0: req.body.overridename0,
                overriderole0: req.body.overriderole0,
                overridecommission0: req.body.overridecommission0,
                overridename1: req.body.overridename1,
                overriderole1: req.body.overriderole1,
                overridecommission1: req.body.overridecommission1,
                overridename2: req.body.overridename2,
                overriderole2: req.body.overriderole2,
                overridecommission2: req.body.overridecommission2,
                overridename3: req.body.overridename3,
                overriderole3: req.body.overriderole3,
                overridecommission3: req.body.overridecommission3,
                overridename4: req.body.overridename4,
                overriderole4: req.body.overriderole4,
                overridecommission4: req.body.overridecommission4,
                overridename5: req.body.overridename5,
                overriderole5: req.body.overriderole5,
                overridecommission5: req.body.overridecommission5,
                no_on_introduction: req.body.no_on_introduction
            }], function (err, result) {
                if (err) {
                    console.log('error'+err);
                    resp.send(JSON.stringify({'status':'error','id':0}));
                } else {
                    resp.send(JSON.stringify({'status':'success','id':result.ops[0]._id}));
                }
            });
        }
    });
});


app.get('/corporatemanagerlist',function (req,resp) {
    var collection = db.collection('users');
    collection.find({type:'corporatemanager'}).toArray(function(err, items) {
        if (err) {
            console.log(err);
            resp.send(JSON.stringify({'status':'error','id':[]}));
        } else {
            console.log(items);
            resp.send(JSON.stringify({'status':'success','id':items}));
        }
    });
});

/*On Extra Day*//*

app.post('/getpatientlistunderthisid_only6',function (req,resp) {
    var o_id = new mongodb.ObjectID(req.body.userid);
    var collection = db.collection('patients').aggregate([
        { $sort : { added_on : -1 } },
        { $limit : 6 },
        { "$match": { "addedby": o_id} },
        {
            $lookup: {
                from: "usertags",
                localField: "_id", // localfield of patients
                foreignField: "userid", // localfield of usertags
                as: "Tagdetail"
            }
        },
        /!* {
         $lookup: {
         from: "tags",
         localField: "Tagdetail[0].tagid",   // localfield of patients
         foreignField: "tagname",   //localfield of patientrecord
         as: "Tagname"
         }
         },*!/

    ]);
    collection.toArray(function (err, items) {
        resp.send(JSON.stringify({'status':'success','id':items}));
    });
});*/


app.get('/mastergrouplist',function (req,resp) {
    var collection = db.collection('mastergroup').aggregate([
      {
        $match: {
          $and: [
            { groupname: { $ne: null } },
          ]
        }
      },
        {
            $lookup: {
                from: "users",
                localField: "groupcorporatemanager", // localfield of mastergroup
                foreignField: "_id", // localfield of users
                as: "GroupCorporateManagerdetail"
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "_id", // localfield of mastergroup
                foreignField: "mastergroupid", // localfield of users
                as: "Totalnoofusersinthismastergroup"
            }
        }
    ]);
    collection.toArray(function (err, items) {
        resp.send(JSON.stringify({'status':'success','id':items}));
    });
});

/*app.get('/mastergrouplist',function (req,resp) {
    var collection = db.collection('mastergroup');
    collection.find().toArray(function(err, items) {
        if (err) {
            console.log(err);
            resp.send(JSON.stringify({'status':'error','id':[]}));
        } else {
            console.log(items);
            resp.send(JSON.stringify({'status':'success','id':items}));
        }
    });
});*/

app.get('/getmastergroupdetails',function (req,resp) {
    req.body=req.query;
    var collection = db.collection('mastergroup');
    var o_id = new mongodb.ObjectID(req.body.userid);
    collection.find({_id:o_id}).toArray(function(err, items) {
        if (err){
            resp.send(JSON.stringify({'id':0, 'status':'Some error occured..!'}));
        }
        else{
            resp.send(JSON.stringify({'id':items[0], 'status':'success'}));
        }
    });
});

app.get('/editmastergroupdetails',function(req,resp){
    req.body=req.query;
    var collection = db.collection('mastergroup');
    var o_groupcorporatemanager = new mongodb.ObjectID(req.body.groupcorporatemanager);
    var data = {
        groupname: req.body.groupname,
        groupdescription: req.body.groupdescription,
        groupcorporatemanager: o_groupcorporatemanager,
        groupactive: req.body.groupactive,
        overridename0: req.body.overridename0,
        overriderole0: req.body.overriderole0,
        overridecommission0: req.body.overridecommission0,
        overridename1: req.body.overridename1,
        overriderole1: req.body.overriderole1,
        overridecommission1: req.body.overridecommission1,
        overridename2: req.body.overridename2,
        overriderole2: req.body.overriderole2,
        overridecommission2: req.body.overridecommission2,
        overridename3: req.body.overridename3,
        overriderole3: req.body.overriderole3,
        overridecommission3: req.body.overridecommission3,
        overridename4: req.body.overridename4,
        overriderole4: req.body.overriderole4,
        overridecommission4: req.body.overridecommission4,
        overridename5: req.body.overridename5,
        overriderole5: req.body.overriderole5,
        overridecommission5: req.body.overridecommission5,
        no_on_introduction: req.body.no_on_introduction
    }
    var o_id = new mongodb.ObjectID(req.body.id);
    collection.update({_id:o_id}, {$set: data}, true, true);

    resp.send(JSON.stringify({'status':'success'}));
});

app.get('/adduser',function(req,resp){
    req.body=req.query;
    console.log('===');
    var generatecode = randomnogenerate();
    var collection = db.collection('users');
    collection.find({email:req.body.email}).toArray(function(err, items) {
        if(items.length>0){
            console.log('already exists with same mail id');
            resp.send(JSON.stringify({'status':'error','id':'-1'}));
        }
        else{
            collection.find({username:req.body.username}).toArray(function(err, items) {
                if(items.length>0){
                    console.log('already exists with same username');
                    resp.send(JSON.stringify({'status':'error','id':'-2'}));
                }
                else{
                    var crypto = require('crypto');
                    var secret = req.body.password;
                    var hash = crypto.createHmac('sha256', secret)
                        .update('password')
                        .digest('hex');
                    var o_mastergroupid = new mongodb.ObjectID(req.body.mastergroupid);
                    collection.insert([{
                        firstname: req.body.firstname,
                        lastname: req.body.lastname,
                        username: req.body.username,
                        email: req.body.email,
                        password: hash,
                        address: req.body.address,
                        city: req.body.city,
                        state: req.body.state,
                        zip: req.body.zip,
                        gender: req.body.gender,
                        dob: req.body.dob,
                        phone: req.body.phone,
                        addedby:req.body.addedby,
                        mastergroupid: o_mastergroupid,
                        type: req.body.type

                    }], function (err, result) {
                        if (err) {
                            console.log('error'+err);
                            resp.send(JSON.stringify({'status':'error','id':0}));
                        } else {
                            var collection1 = db.collection('mastergroup');
                            collection1.find({_id:o_mastergroupid}).toArray(function(err, items) {
                                if (err){
                                    console.log('err');
                                    resp.send(JSON.stringify({'status':0}));
                                }
                                else{
                                    console.log('items');
                                    console.log(items);
                                    if(items.length>0){
                                        collection.find({_id:items[0].groupcorporatemanager}).toArray(function(err, items) {
                                            if (err){
                                                console.log('err1');
                                                resp.send(JSON.stringify({'status':0}));
                                            }
                                            else{
                                                console.log('else');
                                                if(items.length>0){
                                                    /*var url= 'http://'+items[0].username+'.greenvalleyportal.com/#/sign-up/'+o_mastergroupid+'/'+req.body.username; */
                                                    var url= 'https://greenvalleyportal.com/#/sign-up/'+o_mastergroupid+'/'+req.body.username;
                                                    var smtpTransport = mailer.createTransport({
                                                        service: "Gmail",
                                                        auth: {
                                                            user: "itplcc40@gmail.com",
                                                            pass: "DevelP7@"
                                                        }
                                                    });
                                                    var mail = {
                                                        from: "Greenvalley Admin <support@greenvalley.com>",
                                                        to: req.body.email,
                                                        subject: 'Welcome to Greenvalley.',
                                                        html: 'We are glad to inform you that you have been added as a '+ req.body.type +' user.<br/><br/>Username:'+req.body.username+'<br/>Password:'+req.body.password+'<br/>Signup link:<a href='+url+'>'+url+'</a>.'
                                                    }
                                                    smtpTransport.sendMail(mail, function (error, response) {
                                                        console.log('send');
                                                        smtpTransport.close();
                                                    });
                                                    resp.send(JSON.stringify({'status':'success','id':result.ops[0]._id}));
                                                }
                                            }
                                        });
                                    }
                                }
                            });

                        }
                    });
                }
            });
        }
    });

});


app.get('/getdetailsbyusername',function (req,resp) {
    req.body=req.query;
    var collection = db.collection('users');
    collection.find({username: req.body.username}).toArray(function(err, items) {
        if (err){
            resp.send(JSON.stringify({'id':0, 'status':'Some error occured..!'}));
        }
        else{
            console.log(items);
            resp.send(JSON.stringify({'id':items[0], 'status':'success'}));
        }
    });
});


app.get('/signup1',function(req,resp){
    req.body=req.query;
    console.log('?');
    var signuptime = Date.now();
    var logintime = Date.now();
    var generatecode = randomnogenerate();
    var collection = db.collection('users');
    collection.find({uniqueid:req.body.uniqueid}).toArray(function(err, items) {
        if(items.length>0){
            console.log('??');
            randomnogenerate();
        }
        else{
            var generatecodetring = callrandomstring();
            console.log('???');
            collection.find({logintoken:generatecodetring}).toArray(function(err, items) {
                if(items.length>0){
                    callrandomstring();
                    console.log('????');
                }
                else{
                    collection.find({email:req.body.email,username:req.body.username}).toArray(function(err, items) {
                        if(items.length>0){
                            console.log('update');
                            var crypto = require('crypto');
                            var secret = req.body.password;
                            var hash = crypto.createHmac('sha256', secret)
                                .update('password')
                                .digest('hex');
                            var data = {
                                firstname: req.body.firstname,
                                lastname: req.body.lastname,
                                username: req.body.username,
                                email: req.body.email,
                                password: hash,
                                address: req.body.address,
                                address2: req.body.address2,
                                city: req.body.city,
                                state: req.body.state,
                                zip: req.body.zip,
                                gender: req.body.gender,
                                dob: req.body.dob,
                                phone: req.body.phone,
                                type: req.body.type,
                                agentexperience: req.body.agentexperience,
                                olderclients: req.body.olderclients,
                                noofplanBcard: req.body.noofplanBcard,
                                webinarkey: req.body.webinarkey,
                                signup_step: req.body.signup_step,
                                // uniqueid:generatecode,
                                uniqueid:req.body.uniqueid,
                                signuptime:signuptime,
                                logintime:logintime,
                                nooflogin:1,
                                logintoken:generatecodetring,
                                cgxamountoflead:req.body.cgxamountoflead,
                                pgxvalueoflead:req.body.pgxvalueoflead,
                                addedby:req.body.addedby,
                                iswebinarchekced :req.body.iswebinarchekced,
                            }
                            collection.update({username: req.body.username}, {$set: data}, true, true);
                            items[0].logintoken = generatecodetring;
                            resp.send(JSON.stringify({'status':'success','id':items[0]}));
                            console.log('update done');
                        }
                    });
                }
            });
        }
    });
});


app.get('/get_userlist_under_this_Groupid',function (req,resp) {
  req.body=req.query;
  var o_mastergroupid = new mongodb.ObjectID(req.body.groupid);
  var collection = db.collection('users').aggregate([
    {"$match": {"mastergroupid": o_mastergroupid}},
    {
      // how many patients entered under this username
      $lookup: {
        from: "patients",
        localField: "_id", // localfield of users
        foreignField: "addedby", // localfield of patients
        as: "Patientdetail"
      }
    },
    // how many users entered under this username
    {
      $lookup: {
        from: "users",
        localField: "username", // localfield of users
        foreignField: "addedby", // localfield of users
        as: "Profilesfilled"
      }
    }
  ]);




  collection.toArray(function (err, items) {
    resp.send(JSON.stringify({'status':'success','id':items}));
  });





   /* req.body=req.query;
    var collection = db.collection('users');
    var o_mastergroupid = new mongodb.ObjectID(req.body.groupid);
    console.log('o_mastergroupid' + o_mastergroupid);
    collection.find({mastergroupid:o_mastergroupid}).toArray(function(err, items) {
        if (err){
            resp.send(JSON.stringify({'id':0, 'status':'Some error occured..!'}));
        }
        else{
            console.log(items);
            // resp.send(JSON.stringify({'id':items[0], 'status':'success'}));
            resp.send(JSON.stringify({'status':'success','id':items}));
        }
    });*/

});

app.get('/getuserdetailsbyuseridnew',function (req,resp) {
    var collection = db.collection('users');
    req.body=req.query;
    console.log(req.body._id);
    var o_id = new mongodb.ObjectID(req.body._id);
    collection.find({_id:o_id}).toArray(function(err, items) {
        if (err){
            resp.send(JSON.stringify({'id':0, 'status':'Some error occured..!'}));
        }
        else{
            console.log(items);
            resp.send(JSON.stringify({'id':items[0], 'status':'success'}));
        }
    });
});


app.get('/getUserListunderthisusername1',function (req,resp) {
    req.body=req.query;
    var collection = db.collection('users');
    collection.find({addedby:req.body.username}).toArray(function(err, items) {
        if (err) {
            console.log(err);
            resp.send(JSON.stringify({'status':'error','id':[]}));
        } else {
            resp.send(JSON.stringify({'status':'success','id':items}));
        }
    });
});

app.get('/getmedicationpgxforpdf',function(req,resp){        // this is for editadmin page
  var resitem = {};
  var collection = db.collection('medicationpgxrecord');
  var o_id = new mongodb.ObjectID(req.query.id);
  collection.find({patientid:o_id}).toArray(function(err, items) {
    if (err) {
      resp.send(JSON.stringify({'status':'error','id':0}));
    } else {
      resitem = items[0];
      resp.send(JSON.stringify({'status':'success','item':resitem}));
    }
  });
});

app.get('/getUserListunderthisusername',function (req,resp) {
    req.body=req.query;

  var collection = db.collection('ulist');
  if(req.body.username!='') {
    collection.find({"addedby": req.body.username}).limit(parseInt(req.body.limitval)).toArray(function (err, items) {
      if (err) {
        console.log(err);
        resp.send(JSON.stringify({'status': 'error', 'id': []}));
      } else {
        resp.send(JSON.stringify({'status': 'success', 'id': items}));
      }
    });
  }else{
    collection.find().limit(parseInt(req.body.limitval)).toArray(function (err, items) {
      if (err) {
        console.log(err);
        resp.send(JSON.stringify({'status': 'error', 'id': []}));
      } else {
        resp.send(JSON.stringify({'status': 'success', 'id': items}));
      }
    });
  }


  return;








   /* if(req.body.username!='') {
    //if(1==9) {

      var collection = db.collection('users').aggregate([
        { $limit : parseInt(req.body.limitval) },
        {"$match": {"addedby": req.body.username}},
        {
          // how many patients entered under this username
          $lookup: {
            from: "patients",
            localField: "_id", // localfield of users
            foreignField: "addedby", // localfield of patients
            as: "Patientdetail"
          }
        },
        // how many users entered under this username
        {
          $lookup: {
            from: "users",
            localField: "username", // localfield of users
            foreignField: "addedby", // localfield of users
            as: "Profilesfilled"
          }
        }
      ]);
    }
    else{
      //resp.send(JSON.stringify({'status':'success','id':req.body.limitval}));
      //return;
      var collection = db.collection('users').aggregate([
        //{"$match": {"addedby": req.body.username}},
        { $limit : parseInt(req.body.limitval) },
        {
          // how many patients entered under this username
          $lookup: {
            from: "patients",
            localField: "_id", // localfield of users
            foreignField: "addedby", // localfield of patients
            as: "Patientdetail"
          }
        },

        // how many users entered under this username
        {
          $lookup: {
            from: "users",
            localField: "username", // localfield of users
            foreignField: "addedby", // localfield of users
            as: "Profilesfilled"
          }
        },
        //{$unwind: '$Profilesfilled'},
        {
          '$project':
            {
              "id": 1,
              "username": 1,
              "lastname": 1,
              "firstname": 1,
              "email": 1,
              "uniqueid": 1,
              "type": 1,
              "signup_step": 1,
              "nooflogin": 1,
              "logintime": 1,
              "addedby": 1,
              "Profilesfilled":1,
              "Patientdetail": 1,
            }
        }
        /!*{
          $project: {
            Profilesfilled: {
              $arrayElemAt: ['$Profilesfilled', 0]
            },
            patients: {
              $arrayElemAt: ['$Patientdetail', 0]
            },
          }
        },*!/
      ]);

    }


    collection.toArray(function (err, items) {
        resp.send(JSON.stringify({'status':'success','id':items}));
    });*/
});

app.get('/medicationpgx',function(req,resp) {
    req.body=req.query;
    var o_patientid = new mongodb.ObjectID(req.body.patientid);
  var added_on = Date.now();
  var o_added_by_id = new mongodb.ObjectID(req.body.added_by);



    var collection = db.collection('medicationpgxrecord');
    collection.find({patientid: o_patientid}).toArray(function (err, items) {
        if (items.length == 0) {
            collection.insert([{
                patientid: o_patientid,
                lithium: Number(req.body.lithium),
                abilify: Number(req.body.abilify),
                seroquel: Number(req.body.seroquel),
                clonazepam: Number(req.body.clonazepam),
                latuda: Number(req.body.latuda),
                valium: Number(req.body.valium),
                ativan: Number(req.body.ativan),
                zyprexa: Number(req.body.zyprexa),
                xanax: Number(req.body.xanax),
                zoloft: Number(req.body.zoloft),
                celexa: Number(req.body.celexa),
                paxil: Number(req.body.paxil),
                cymbalta: Number(req.body.cymbalta),
                klonopin: Number(req.body.klonopin),
                waellbutrin: Number(req.body.waellbutrin),
                prozac: Number(req.body.prozac),
                lexapro: Number(req.body.lexapro),
                amitriptyline: Number(req.body.amitriptyline),
                viibryd: Number(req.body.viibryd),
                trazodone: Number(req.body.trazodone),
                nitros: Number(req.body.nitros),
                heartattack: Number(req.body.heartattack),
                lipitor: Number(req.body.lipitor),
                crestor: Number(req.body.crestor),
                zocor: Number(req.body.zocor),
                mevacor: Number(req.body.mevacor),
                skinrash: Number(req.body.skinrash),
                prilosec: Number(req.body.prilosec),
                zantac: Number(req.body.zantac),
                nexium: Number(req.body.nexium),
                neurontin: Number(req.body.neurontin),
                triamcinolone: Number(req.body.triamcinolone),
                clobex: Number(req.body.clobex),
                fluocinonide: Number(req.body.fluocinonide),
                betamethasone: Number(req.body.betamethasone),
                iscompleted: Number(req.body.iscompleted)

            }], function (err, result) {
                if (err) {
                    console.log('error' + err);
                    resp.send(JSON.stringify({'status': 'error', 'id': 0}));
                } else {
                    console.log(result);
                    resp.send(JSON.stringify({'status': 'success', 'id': result.ops[0]._id}));
                }
            });
        }
        if (items.length > 0 ) {
            var data = {
                lithium: Number(req.body.lithium),
                abilify: Number(req.body.abilify),
                seroquel: Number(req.body.seroquel),
                clonazepam: Number(req.body.clonazepam),
                latuda: Number(req.body.latuda),
                valium: Number(req.body.valium),
                ativan: Number(req.body.ativan),
                zyprexa: Number(req.body.zyprexa),
                xanax: Number(req.body.xanax),
                zoloft: Number(req.body.zoloft),
                celexa: Number(req.body.celexa),
                paxil: Number(req.body.paxil),
                cymbalta: Number(req.body.cymbalta),
                klonopin: Number(req.body.klonopin),
                waellbutrin: Number(req.body.waellbutrin),
                prozac: Number(req.body.prozac),
                lexapro: Number(req.body.lexapro),
                amitriptyline: Number(req.body.amitriptyline),
                viibryd: Number(req.body.viibryd),
                trazodone: Number(req.body.trazodone),
                nitros: Number(req.body.nitros),
                heartattack: Number(req.body.heartattack),
                lipitor: Number(req.body.lipitor),
                crestor: Number(req.body.crestor),
                zocor: Number(req.body.zocor),
                mevacor: Number(req.body.mevacor),
                skinrash: Number(req.body.skinrash),
                prilosec: Number(req.body.prilosec),
                zantac: Number(req.body.zantac),
                nexium: Number(req.body.nexium),
                neurontin: Number(req.body.neurontin),
                triamcinolone: Number(req.body.triamcinolone),
                clobex: Number(req.body.clobex),
                fluocinonide: Number(req.body.fluocinonide),
                betamethasone: Number(req.body.betamethasone),
                iscompleted: Number(req.body.iscompleted)
            }
            collection.update({patientid: o_patientid}, {$set: data}, function (err, result) {
                if (err) {
                    resp.send(JSON.stringify({'status': 'error', 'id': 0}));
                    throw err;
                }
                else {
                    resp.send(JSON.stringify({'status': 'success'}));
                }
            });
        }
    });

  if(req.body.note!=null) {
    var collection2 = db.collection('patientnotes');
    collection2.insert([{
      patientid: o_patientid,
      added_by: o_added_by_id,
      note: req.body.note,
      added_on: added_on
    }], function (err2, result2) {
      if (err2) {
        console.log('error' + err1);
        //  resp.send(JSON.stringify({'status': 'error', 'id': 0}));
      } else {
        console.log(result2);
        //  resp.send(JSON.stringify({'status': 'success', 'id': result2.ops[0]._id}));
      }
    });
  }
});


app.get('/getmedicationpgxbypatientid',function (req,resp) {
    req.body=req.query;
    var collection = db.collection('medicationpgxrecord');
    var o_id = new mongodb.ObjectID(req.body.patientid);
    collection.find({patientid: o_id }).toArray(function(err, items) {
        if (err){
            resp.send(JSON.stringify({'id':0, 'status':'Some error occured..!'}));
        }
        else{
            console.log(items);
            resp.send(JSON.stringify({'id':items[0], 'status':'success'}));
        }
    });
});


app.get('/savewebinarvalue',function(req,resp){
  req.body=req.query;
  var collection = db.collection('users');
  var o_id = new mongodb.ObjectID(req.body._id);
  var data = {
    webinarkey: req.body.webinarkey,
  }
  collection.update({_id:o_id}, {$set: data}, true, true);
  resp.send(JSON.stringify({'id':'1', 'status':'success'}));
});

app.get('/skipstep',function(req,resp){
  req.body=req.query;
  console.log('skipstep');
  var o_id = new mongodb.ObjectID(req.body.userid);
        var collection2 = db.collection('tags');
        collection2.find({tagname: 'Training Pending'}).toArray(function (err2, items2) {
          var collection5 = db.collection('usertags');
          collection5.deleteOne({userid: o_id, tagid: items2[0]._id}, function (err3, result3) {
            if (err3) {
              resp.send("failed");
              throw err;
            }
            else {
              collection2.find({tagname: 'Webinar Pending'}).toArray(function (err4, items4) {
                if (items4.length > 0) {
                  collection5.insert([{
                    userid: o_id,
                    tagid: items4[0]._id,
                  }], function (err2, result2) {
                    if (err2) {
                      console.log('error2' + err2);
                      resp.send(JSON.stringify({'status': 'error', 'id': 0}));
                    } else {
                      var collection1 = db.collection('users');
                      collection1.update({_id: o_id}, {$set: {signup_step: 4}}, function (err, results) {
                        if (err) {
                          resp.send(JSON.stringify({'status': 'error', 'id': 0}));
                          throw err;
                        }
                        else {
                          resp.send(JSON.stringify({
                            'status': 'success',
                            'id': 1
                          }));
                        }

                      });
                    }

                  });
                }
              });
            }
          });
        });
});



app.get('/deleteuser',function(req,resp){
  req.body=req.query;
  var collection = db.collection('users');
  var o_id = new mongodb.ObjectID(req.body._id);
  collection.deleteOne({_id: o_id}, function(err, result) {
    if (err){
      resp.send("failed");
      throw err;
    }
    else {
      resp.send(JSON.stringify({'status':'success'}));
    }
  });
});


app.get('/makeittestuser',function(req,resp){
  req.body=req.query;
  var collection = db.collection('users');
  var data = {
    istestuser: req.body.istestuser,
  }
  var o_id = new mongodb.ObjectID(req.body.userid);
  collection.update({_id: o_id}, {$set: data},function(err, results) {
    if (err){
      resp.send(JSON.stringify({'status':'error','id':0}));
      throw err;
    }
    else {
      resp.send(JSON.stringify({'status':'success','id':1}));
    }
  });
});


app.get('/updatehitmap',function(req,resp){
  var collection = db.collection('patientrecord');
  var data = {
    hit_map_value: '',
  }
  collection.update({iscompleted: 0}, {$set: data},function(err, results) {
    if (err){
      resp.send(JSON.stringify({'status':'error','id':0}));
      throw err;
    }
    else {
      resp.send(JSON.stringify({'status':'success','id':'hi'}));
    }
  });
});


app.get('/getpatientcountunderthisid', function (req, resp) {
  req.body=req.query;
  var o_id = new mongodb.ObjectID(req.body.userid);
  var collection = db.collection('patientrecord');
  collection.find({userid:o_id}).toArray(function(err, items) {
    if (err) {
      console.log(err);
      resp.send(JSON.stringify({'status':'error','id':[]}));
    }
  /*  else {
      var collection1 = db.collection('usertags');
      var a, b, c;
      var o_tag1 = new mongodb.ObjectID('5b0bfa1b3fe08865e7955f71');
      var o_tag2 = new mongodb.ObjectID('5b0bfa1d3fe08865e7955f72');
      var o_tag3 = new mongodb.ObjectID('5b0b9235b33cbc2d4af08dd9');
      a = db.collection1.find({tagid:o_tag1}).count();
      b = db.collection1.find({tagid:o_tag2}).count();
      c = db.collection1.find({tagid:o_tag3}).count();
      resp.send(JSON.stringify({'accepted': a, 'declined': b, 'submitted': c, 'status': 'success'}));
    }*/
    else {

      var collection1 = db.collection('usertags');
      var a, b, c;
      var o_tag1 = new mongodb.ObjectID('5b0bfa1b3fe08865e7955f71');
      var o_tag2 = new mongodb.ObjectID('5b0bfa1d3fe08865e7955f72');
      var o_tag3 = new mongodb.ObjectID('5b0b9235b33cbc2d4af08dd9');
      if(req.body.userid=='') {
        collection1.find({tagid: o_tag1}).toArray(function (err1, items1) { //ACCEPT
          a = items1.length;
          collection1.find({tagid: o_tag2}).toArray(function (err2, items2) { //DECLINED
            b = items2.length;
            collection1.find({tagid: o_tag3}).toArray(function (err3, items3) { //submitted
              c = items3.length;
              resp.send(JSON.stringify({'accepted': a, 'declined': b, 'submitted': c, 'status': 'success'}));
            });
          });
        });
      }else{
        var uid = new mongodb.ObjectID(req.body.userid);

        collection1.find({tagid: o_tag1,addedby:uid}).toArray(function (err1, items1) { //ACCEPT
          a = items1.length;
          collection1.find({tagid: o_tag2,addedby:uid}).toArray(function (err2, items2) { //DECLINED
            b = items2.length;
            collection1.find({tagid: o_tag3,addedby:uid}).toArray(function (err3, items3) { //submitted
              c = items3.length;
              resp.send(JSON.stringify({'accepted': a, 'declined': b, 'submitted': c, 'status': 'success'}));
            });
          });
        });
      }


    }
  });
  });


app.get('/changeenroller',function(req,resp){
  req.body=req.query;
  if(req.body.page=='userlist'){
    var collection = db.collection('users');
    var data = {
      addedby: req.body.enrollerusername
    }
  }
  else{
    var collection = db.collection('patients');
    var enrolleruserid = new mongodb.ObjectID(req.body.enrollerusername);
    var data = {
      addedby: enrolleruserid
  }
  }
  var arr = Object.keys(req.body.userid)
    .map(function (key) {
      return req.body.userid[key];
    });
  var i = 0;
  for(i in arr){
    var o_id = new mongodb.ObjectID(arr[i]);
    collection.update({_id:o_id}, {$set: data}, true, true);
  }
  resp.send(JSON.stringify({'status':'success'}));
});
