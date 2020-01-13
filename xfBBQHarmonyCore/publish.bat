@echo off
setlocal

set SolutionDir=%~dp0
pushd "%SolutionDir%"

set rpsmfil=%SolutionDir%Repository\bin\Debug\rpsmain.ism
set rpstfil=%SolutionDir%Repository\bin\Debug\rpstext.ism

set DeployDir=%SolutionDir%build
if exist %DeployDir% rmdir /S /Q %DeployDir%
mkdir %DeployDir%

pushd Services.Host
dotnet publish -c Debug -r win10-x64 -o %DeployDir%
popd

copy /Y "C:\Program Files\WindowsApps\Microsoft.VCLibs.140.00_14.0.27323.0_x64__8wekyb3d8bbwe\concrt140_app.dll"    %DeployDir%
copy /Y "C:\Program Files\WindowsApps\Microsoft.VCLibs.140.00_14.0.27323.0_x64__8wekyb3d8bbwe\msvcp140_app.dll"     %DeployDir%
copy /Y "C:\Program Files\WindowsApps\Microsoft.VCLibs.140.00_14.0.27323.0_x64__8wekyb3d8bbwe\vcruntime140_app.dll" %DeployDir%

rem Copy in the TraditionalBridge files
copy /Y TraditionalBridge\bin\Debug\x64\TraditionalBridgeHost.dbr  %DeployDir%
copy /Y TraditionalBridge\bin\Debug\x64\launch.bat                 %DeployDir%

popd
endlocal
