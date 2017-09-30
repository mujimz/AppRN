#!/bin/sh
# 格式  sh build.sh
# 默认打包为 Staging 包，
# 传入参数 r （sh build.sh r） 打包为 release 包     
curl -k "http://localhost:8081/index.android.bundle?platform=android&dev=false&minify=true" > android/app/src/main/assets/index.android.bundle
cd android/
if [ $# -eq 0 ]
    then   
    ./gradlew assembleReleaseStaging
    open app/build/outputs/apk
elif [ $# -eq 1 ]
    then
    echo "传入参数为 ：$1"
    if [ $1 == "r" ]
    then
     echo "传入参数为 ：$1"
     ./gradlew assembleRelease
     open app/build/outputs/apk
    elif [ $1 == "a" ]
    then
    echo "传入参数为 ：$1"
    ./gradlew assembleRelease
    ./gradlew assembleReleaseStaging
    open app/build/outputs/apk
    else
    echo "传入参数‘r’ 打release 包"
    echo "传入参数‘a’ 打release 和 Staging包"
    fi
fi

#open app/build/outputs/apk