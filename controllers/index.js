const router = require('express').Router();
const dashboardRoutes = require('./dashboard-routes');
const homeRoutes = require('./homeRoutes');
const apiRoutes = require('./api');



router.use('/api', apiRoutes);
router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);

router.use((req, res) => {
    res.status(404).end();
});




module.exports = router;