
from gevent import monkey
monkey.patch_all()

from gevent import spawn
import gevent

import time
from pprint import pprint
from time import sleep

from hyload.stats import Stats
from hyload.logger import TestLogger

from hyload.httpclient import HttpsClient,HttpClient

clientName2Func = {}

# 如果 args 有值，一定是列表，元素依次赋值给每次clientfunc调用
def createClients(clientName, clientNum, interval, args=None):
    clientFunc = clientName2Func[clientName]
    for i in range(clientNum):
        if args:
            spawn(clientFunc, args[i])
        else:
            spawn(clientFunc)

        if i < clientNum - 1:
            sleep(interval)

# 如果 args 有值，一定是列表，元素依次赋值给每次clientfunc调用
def createClientsAndKeep(clientName, clientNum, interval, args=None):
    clientFunc = clientName2Func[clientName]
    
    def realFunc(args=None):
        while True:
            try:
                clientFunc(args)
            except Exception as e:
                print(e)
            
    for i in range(clientNum):
        if args:
            spawn(realFunc, args[i])
        else:
            spawn(realFunc)

        if i < clientNum - 1:
            sleep(interval)

Stats.start()

################## write your code  * begin * ###################



def client_1(arg=None):
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

clientName2Func['client-1'] = client_1

# 定义性能场景，点击右边条目，可自动插入代码





createClients(
    'client-1', # 客户端名称
    5000,       # 客户端数量
    0.001,     # 启动间隔时间，秒
    )




################## write your code * end * ###################

gevent.wait()
