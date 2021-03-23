const router = require('express').Router();
const moment = require('moment');

router.get('/', async (req, res) => {
    res.render('landing_page.ejs');
});

router.get('/io', async (req, res) => {
    res.render('io.ejs');
});

router.post('/io', async (req, res) => {
    const { ID } = req.body;
    const User = await req.bot.users.fetch(ID).catch(err => res.redirect('/'));
    res.render('io.ejs', { user: User, createdAt: moment(User.createdTimestamp).format('l') });
});

module.exports = router;