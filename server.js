const express = require('express');
const app = express();

let blogs = [];
let id = 1;
 // requiest handler 

app.use(express.urlencoded({extended:true}));
// telling express to use ejs template 

app.set('view engine', 'ejs')

// accessing an ejs file from server page & send blogs to an ejs 

app.get('/', (req,res) => {
    res.render('home',{blogs:blogs});
})

app.post('/post',(req,res)=>{
   blogs.push({id:id++,Btitle:req.body.Btitle,desc:req.body.desc,author:req.body.author,cate:req.body.cate,date:req.body.date});
   res.redirect('/')
})

 // delete button
 app.post('/delete/:id',(req,res)=>{
    const id = parseInt(req.params.id)
    blogs = blogs.filter(blog => blog.id !== id)
    res.redirect('/')
 })

 // update button

 app.post('/update/:id', (req,res)=>{
    const blog = blogs.find(t => t.id == req.params.id)

    if(blog){
        blog.Btitle = req.body.Btitle;
        blog.desc = req.body.desc
        blog.author = req.body.author;
        blog.cate = req.body.cate;
        blog.date = req.body.date;
    }
    res.redirect('/')
 })
 
/* app.get('/edit/:id', (req, res) => {
  const blog = blogs.find(b => b.id == req.params.id);
  res.render('edit', { blog });
});*/


app.listen(3000,(req,res)=>{
    console.log('server is on live')
})

