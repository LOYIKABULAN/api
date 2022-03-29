# 定义客户端行为，点击右边条目，可自动插入功能代码
# 创建客户端     
client = HttpClient('127.0.0.1:3333', # 目标地址:端口
# client = HttpClient('101.33.213.101:3333', # 目标地址:端口
                    timeout=10   # 超时时间，单位秒
                   ) 

# 请求方法对应HTTP方法，包括：get、post、put、delete 等
response = client.get(
    '/goods/feeds?pageNum=1&pageSize=5'  # 请求URL
    )
count = 0

# print(f"                                                 {count/10}ms")