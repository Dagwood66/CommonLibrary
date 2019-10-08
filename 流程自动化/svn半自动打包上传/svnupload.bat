echo UTF-8
chcp 65001
echo 执行编译
call npm run build
echo 进入要上传的目录
cd dist
echo 调用svn提交
TortoiseProc.exe /command:commit /path:".\"
echo 回到原目录
cd ../
echo 保留cmd对话框
cmd.exe