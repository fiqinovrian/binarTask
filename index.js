const express = require('express');
const app = express();
const { User } = require('./models');
const port = 3000;

app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

//route
app.get('/', (req, res) => {
    res.render('login');
})
app.get('/api/v1/register', (req, res) => {
    res.render('register')
})
app.post('/api/v1/register', (req, res) => {
    const data = {
        nama: req.body.nama,
        tanggalLahir: req.body.tanggalLahir,
        pekerjaan: req.body.pekerjaan,
        email: req.body.email,
        password: req.body.password
    }
    User.create(data).then(data => {
        res.status(201).render('success')
    }).catch(err => {
        res.status(500).render('failed')
    })
})

app.get('/success', (req, res) => {
    res.render('success')
})
app.get('/failed', (req, res) => {
    res.render('failed')
})
// User.create({
//     nama: 'Fiqi Novrian',
//     tanggalLahir: '2022-02-02',
//     pekerjaan: 'Staff',
//     email: 'fiqinovrian@gmail.com',
//     password: 'password'
// }).then(user => {
//     console.log(user)
// })

app.listen(port, () => console.log(`Server berjalan di http://localhost:${port}`));