var router = require('express').Router();
var albums = require ('../models/albums.js');


// 返回全部唱片
router.route('/').get(
 function(req,res,next){
   res.status(200).send(albums);
  }
);

//返回歌曲时间大于3分钟的歌曲
router.route('/longerSong')
  .get(function(req, res, next) {
    var longersong=[];
      for (var i = 0; i < albums.length; i++) {
        if(albums[i].length>180)
        { longersong.push(albums[i].title); }//关键语句
      }

      res.status(200).send(longersong);
  });

  //获取指定分类下的歌曲列表，浏览器返回结果正常，为什么postman报错？
      router.route('/search')
          .get(function(req, res, next) {
              var type = req.query.type;

              var  songlist2 = [];
              for (var i = 0; i < albums.length; i++) {
                  if (albums[i].type===type)
                  {  songlist2.push(albums[i].title);}
              }
              console.log(songlist2);
              if (songlist2.length !== 0) {
                  res.status(200).send(songlist2);
              } else {
                  res.status(404).send('Not Found');
              }
          });


  //返回指定歌手的全部歌曲
  router.route('/singer/:singer')
      .get(function(req, res, next) {
          var singer = req.params.singer;
          console.log(singer);
          var songlist = [];
              for (var i = 0; i < albums.length; i++) {
                  if (albums[i].singer === singer) {
                      songlist.push(albums[i].title);
                      }}

                      if (songlist.length !== 0) {
                          res.status(200).send(songlist);}
        else {res.status(200).send('singer name is not found');}


  });

//返回指定索引的唱片数据
router.route('/:id').get(
  function(req,res,next){
    var id = req.params.id-1;
    // console.log(id);
    var album=albums[id];
    //console.log(user);
    if(album){

      res.status(200).send(album);
    }
    else {
      res.status(404).send('Not Found');
    }
  });

//修改指定索引唱片的时长和标题并返回结果,key:length,title
  router.route('/:id').
  put(function(req,res,next){
    var id =req.params.id-1;
    var album=albums[id];
    if(album){
      var length = parseInt(req.body.length);
      console.log(length);
        var title = req.body.title;
        console.log(title);
       if(length||title){
         album.length=req.body.length;
         album.title=req.body.title;
       res.status(200).send(album);  }

         }
    else{
      res.status(404).send('Not Found');
        }
            }
  );


module.exports=router;
