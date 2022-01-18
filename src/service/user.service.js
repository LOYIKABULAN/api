class UserService {
    async createUser(user_name,password){
        // TODO:写入数据库
        return '写入数据库成功'
    }
}

module.exports = new UserService()