const express = require('express');
const app = express();
// declaring blogs
let blogs = [];
let id = 1;

// declaring user array for signin

let users = [];

 // requiest handler 

app.use(express.urlencoded({extended:true}));
// telling express to use ejs template 

app.set('view engine', 'ejs')

// accessing an ejs file from server page & send blogs to an ejs 

app.get('/', (req,res) => {
    res.render('sign_in',{blogs:blogs});
})
// access home page 
app.get('/home',(req,res)=>{
    res.redirect('home')
})
app.post('/post',(req,res)=>{
   blogs.push({id:id++,Btitle:req.body.Btitle,desc:req.body.desc,author:req.body.author,cate:req.body.cate,date:req.body.date});
   res.render('home',{blogs})
})

 // delete button
 app.post('/delete/:id',(req,res)=>{
    const id = parseInt(req.params.id)
    blogs = blogs.filter(blog => blog.id !== id)
    res.render('home',{blogs})
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
    res.render('home',{blogs})
 })
 


// for edit redirction to update page 

app.get('/edit/:id', (req, res) => {
    const id = Number(req.params.id);  
  const blog = blogs.find(e => e.id == req.params.id);
   if (!blog) return res.redirect('/');
  res.render('update', { blog });
});

// getting sign in page
 app.post('/sign_in/' , (req,res)=>{
    const {email , password} = req.body;
    if(email,password){
        users.push({email,password})
        res.render('login');
    }
 })

  // login 

  app.post('/login',(req,res)=>{
    const {email,password} = req.body;
    const user = users.find(u => u.email === email && u.password === password);
    if(user){
        res.render('home',{blogs})
    }else{
        res.send('the password did not match')
    }
  })

  app.get('/logout',(req,res)=>{
    res.redirect('/')
  })

app.listen(3000,(req,res)=>{
    console.log('server is on live')
})

