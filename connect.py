def getserial():
	# Extract serial from cpuinfo file
	cpuserial = "0000000000000000"
	try:
		f = open('/proc/cpuinfo','r')
		for line in f:
			#print(line);
			if line[0:6]=='Serial':
				cpuserial = line[10:26]
		f.close()
	except:
		cpuserial = "ERROR000000000"

	return cpuserial


if __name__ == '__main__':
	import requests
	#r = requests.post("http://193.136.167.55:3000/methods/connect", json={'serial': getserial(), 'ip': '123.123.123.123'})
	r = requests.post("http://clickaclass.herokuapp.com/methods/connect", json={'serial': getserial(), 'ip': '123.123.123.123'})
	print(r.status_code, r.reason)
	print(r.text[:300] + '...')