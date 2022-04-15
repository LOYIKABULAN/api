// @ts-nocheck
const {APP_PORT,SERVER_IP} = require('./config/config.default')

const app = require('./app')

app.listen(APP_PORT,()=>{
    console.log('server is running on %s:%s',SERVER_IP,APP_PORT);
})
