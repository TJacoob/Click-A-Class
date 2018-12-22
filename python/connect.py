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

def getip():
	arg='ip route list'  # Linux command to retrieve ip addresses.
	# Runs 'arg' in a 'hidden terminal'.
	p=subprocess.Popen(arg,shell=True,stdout=subprocess.PIPE)
	data = p.communicate()  # Get data from 'p terminal'.

	# Split IP text block into three, and divide the two containing IPs into words.
	ip_lines = data[0].splitlines()
	split_line_a = ip_lines[0].split()
	split_line_b = ip_lines[1].split()


	"""Because the text 'src' is always followed by an ip address,
	we can use the 'index' function to find 'src' and add one to
	get the index position of our ip.
	"""
	ipaddr_a = split_line_a[split_line_a.index('src')+1]
	ipaddr_b = split_line_b[split_line_b.index('src')+1]

	return ipaddr_a;


if __name__ == '__main__':
	import subprocess
	import requests

	#r = requests.post("http://193.136.167.55:3000/methods/connect", json={'serial': getserial(), 'ip': getip()})
	r = requests.post("http://clickaclass.herokuapp.com/methods/connect", json={'serial': getserial(), 'ip': getip()})
	print(r.status_code, r.reason)
	print(r.text[:300] + '...')