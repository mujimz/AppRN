#!/bin/sh
#热更新部署地址： http://reactactive.youxinpai.com
#执行  sh codepush.sh 发布测试版本
#执行 sh codepush.sh true  发布正式版本
echo "默认操纵：将热更新（包含android 和 ios）发布测试版本"
echo "传一个参数(true)：将热更新（包含android 和 ios ）发布正式版本"
if [ $# -eq 0 ]
    then
    echo "默认操作 发布测试"
    echo "android 热更新正在发布。。。。。。。。。。。。。"
    code-push release-react apprn-android android --m true
    echo "android 热更新正在发布结束。。。。。。。。。。。。。"
    echo "ios 热更新正在发布。。。。。。。。。。。。。"
    # code-push release-react apprn-ios ios --m true
    echo "ios 热更新正在发布结束。。。。。。。。。。。。。"
    echo "热更新发布结束。。。。。。。。。。。。。。。。。"  
elif [ $# -eq 1 ]
    then 
    echo "传入一个参数：$1"
    if [ $1 == "true" ]
        then
        echo '更新到正式'
        echo "android 热更新正在发布。。。。。。。。。。。。。"
        code-push release-react apprn-android android -d Production --m true
        echo "android 热更新正在发布结束。。。。。。。。。。。。。"
        echo "ios 热更新正在发布。。。。。。。。。。。。。"
        # code-push release-react apprn-ios ios -d Production --m true
        echo "ios 热更新正在发布结束。。。。。。。。。。。。。"
        echo "热更新发布到正式结束。。。。。。。。。。。。。。。。。" 
    elif [ $1 == "key" ]
         then
         echo "android keys"
        code-push deployment ls apprn-android -k
         echo "ios keys" 
        code-push deployment ls apprn-ios -k
    else
         echo '传入参数有误，如果想发布到正式，请传入true'
         echo '如果想查看当前应用的key，请输入key'
    fi
else
     echo '传入参数有误，请确认后再试'
fi
