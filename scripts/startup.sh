#!/bin/bash

# 切换到 bash 执行文件所在的目录
cd `dirname $0`
cd ..
appid=$(basename $(pwd))

cd current
appname=nodeapp-$appid

pm2 delete all

# 不同的环境因为机器配置不一样,使用不同的实例数
case "$env" in
  "FWS"|"FAT"|"LPT")
    instance=3
  ;;
  "UAT")
    instance=5
  ;;
  *)
    instance=10
;;
esac

NODE_ENV=production pm2 start server.js \
  -i $instance \
  --name $appname \
  --merge-logs \
  --log-date-format "YYYY-MM-DD HH:mm:ss.SSS" \
  --log "/opt/logs/$appid/outerr.log" \
  --output "/opt/logs/$appid/out.log" \
  --error "/opt/logs/$appid/err.log"

exit 0
