const koffi = require('koffi');

// Load the shared library
// const lib = koffi.load('NewSDK/plcommpro.dll');
const lib = koffi.load('SDK-Ver6.3.1.37/64bit/plcommpro.dll');


// Find functions
 HANDLEptr = koffi.opaque('HANDLE*');
 HANDLE = koffi.opaque('HANDLE');
const ZKConnect = lib.stdcall('HANDLE* Connect(const char* Parameters)');
const ZKDisconnect = lib.stdcall('void Disconnect(HANDLE* handle)');
const ZKControlDevice = lib.stdcall('int ControlDevice(HANDLE* handle, long OperationID, long Param1, long Param2, long Param3, long Param4, const char *Options)')

HANDLEptr = ZKConnect("protocol=TCP,ipaddress=192.168.1.201,port=4370,timeout=4000,passwd=");
console.log(HANDLEptr)



ret = ZKControlDevice(HANDLEptr, 1, 1, 2, 6, 0, "")
console.log(ret)

ZKDisconnect(HANDLEptr)
console.log(HANDLEptr)