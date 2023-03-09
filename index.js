const koffi = require('koffi');

// Load the shared library
const lib = koffi.load('SDK-Ver6.3.1.37/64bit/plcommpro.dll');


// Find functions
HANDLE = koffi.opaque('HANDLE');
const ZKConnect = lib.stdcall('HANDLE* Connect(const char* Parameters)');
const ZKDisconnect = lib.stdcall('void Disconnect(HANDLE* handle)');
const ZKControlDevice = lib.stdcall('int ControlDevice(HANDLE*, long, long, long, long, long, const char *)')
const ZKGetRTLog = lib.stdcall('int GetRTLog(HANDLE*, _Out_ char* buf, int bufSize)')

// Connect
handle = ZKConnect("protocol=TCP,ipaddress=192.168.1.201,port=4370,timeout=4000,passwd=");
console.log(handle)

// GetRTLog
ret = 0
while (ret >= 0)
{
	let buf = ['\0'.repeat(1024)]
	ret = ZKGetRTLog(handle, buf, 1024)
	if (buf[0].split(',')[4] == 255) // ignore Door/Alarm status
		continue
	else
		console.log(buf[0].split(','))
	
	// sleep 100ms
	let waitTimeInMs = 100
	const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));
}

// Open Door
operation_id = 1 //1: output, 2: cancel alarm, 3: restart device, 4: enable/disable normal open state
door_id = 1
index = 1
state = 2 // 0: closed, 255: normal open, others: door open duration
// ret = ZKControlDevice(handle, operation_id, door_id, index, state, 0, "")
console.log(ret)

// Disconnect
ZKDisconnect(handle)
handle = 0
console.log(handle)
