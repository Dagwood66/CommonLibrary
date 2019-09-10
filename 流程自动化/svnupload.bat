echo 执行编译
call npm run build
echo 进入要上传的目录
cd dist
echo 调用svn提交
TortoiseProc.exe /command:commit /path:".\"
echo 保留cmd对话框
cmd.exe