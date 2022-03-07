const {createDevice,findDevice,deleteDevice,updateDevice} = require('../service/device.service')
const {deleteDeviceError} = require('../constants/err.type')
class DeviceController {
    async create(ctx){
        let params = Object.assign(ctx.request.body,{user_id:ctx.state.user.id})
        console.log(params)
        const res = await createDevice(params)
        console.log(res);
        ctx.body = {
            code:0,
            message:'添加报修信息成功',
            result: res
            
        }
    }
    async findAll(ctx){
         // 1.解析pageNum和pageSize
         const { pageNum = 1, pageSize = 10 } = ctx.request.query;
         // 2.调用数据处理的相关方法
         const res = await findDevice({pageNum, pageSize},ctx.state.user.is_admin,ctx.state.user.id);
         // 3. 返回结果
         ctx.body = {
           code: 0,
           message: "获取列表成功",
           result: res,
         };
    }
    async deleted(ctx){
        const id = ctx.request.params.id
        const res = await deleteDevice(id)
        console.log(res);
        if (res) {
            ctx.body = {
                code :0,
                message:'删除成功',
                result:''
            }
            return
        }
       
        return ctx.app.emit("error", deleteDeviceError, ctx);
    }
    async update(ctx){
        const id = ctx.request.params.id
        const params = ctx.request.body
        const res = await updateDevice(id,params)
        console.log(res);
        ctx.body = {
            code:0,
            message:'更新成功',
            result:res
        }
    }
}

module.exports = new DeviceController()