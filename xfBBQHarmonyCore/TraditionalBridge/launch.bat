@echo off
pushd %~dp0
setlocal

rem Set any environment required by the underlying methods

rem Configure a Synergy environment
rem call "%SYNERGYDE32%dbl\dblvars32.bat"
call "%SYNERGYDE64%dbl\dblvars64.bat"

rem Launch the host program
dbs TraditionalBridgeHost.dbr

rem Launch the host program for remote debugging
rem dbr -dv -rd 4444:60 TraditionalBridgeHost.dbr

endlocal
popd