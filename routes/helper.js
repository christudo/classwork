const helpers = require('./helpers')

exports.isLoggedIn = (req, res) => {
  if (req.session.currentUser) {
    req.session.flash = {
      type: 'info',
      intro: 'Error!',
      message: 'You are already logged in',
    };
    res.redirect(303, '/');
    return true;
  }
  return false;
}

router.get('/register', async (req, res, next) => {
    if (helpers.isLoggedIn(req, res)) {return}});

router.post('/register', async (req, res, next) => {
    if (helpers.isLoggedIn(req, res)) {return}});
      
router.get('/login', async (req, res, next) => {
    if (helpers.isLoggedIn(req, res)) {return}});

router.post('/login', async (req, res, next) => {
    if (helpers.isLoggedIn(req, res)) {return}});
              