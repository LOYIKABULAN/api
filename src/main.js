// @ts-nocheck
const {APP_PORT} = require('./config/config.default')

const app = require('./app')

app.listen(APP_PORT,()=>{
    console.log('server is running on http://localhost:%s',APP_PORT);
})
