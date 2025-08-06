function FindProxyForURL(url, host)
{
	// Set site depending on where your machine is
	// tr, cb, hy, or leave it blank
	var site="cb";

	// Get the IP of the URL being loaded
	var host_ip = dnsResolve(host);

	// tr/cb - 8082
	if(
		isInNet(host_ip, "10.139.10.0", "255.255.254.0") ||
		isInNet(host_ip, "10.139.12.0", "255.255.254.0")
	){
		if(site == "tr") { return "DIRECT"; }
		else { return "SOCKS localhost:8082"; }
	}
	if(
		isInNet(host_ip, "172.25.17.0", "255.255.255.0") ||
		isInNet(host_ip, "172.25.18.0", "255.255.255.0")
	){
		if(site == "cb") { return "DIRECT"; }
		else { return "SOCKS localhost:8082"; }
	}
	if(
		isInNet(host_ip, "10.129.250.0", "255.255.255.0") ||
		isInNet(host_ip, "172.27.30.0", "255.255.254.0") ||
		isInNet(host_ip, "10.139.8.0", "255.255.254.0")
	){ return "SOCKS localhost:8082"; }

	// hy - 8081
	if(
		isInNet(host_ip, "10.141.129.0", "255.255.255.128")
	){
		if(site == "hy") { return "DIRECT"; }
		else { return "SOCKS localhost:8081"; }
	}
	if(
		isInNet(host_ip, "10.141.128.0", "255.255.255.0") ||
		isInNet(host_ip, "10.141.132.0", "255.255.255.0")
	){ return "SOCKS localhost:8081"; }

	// legacy - 8084
	if(
		isInNet(host_ip, "128.118.88.0", "255.255.255.0") ||
		isInNet(host_ip, "172.28.8.0", "255.255.255.0") ||
		isInNet(host_ip, "172.28.43.64", "255.255.255.192") ||
		isInNet(host_ip, "172.28.131.0", "255.255.255.192") ||
		isInNet(host_ip, "172.31.186.0", "255.255.255.0")
	){ return "SOCKS localhost:8084"; }

	// Didn't match a subnet; try guessing based on hostname
	if( shExpMatch(host, "*.light.psu.edu") ||
		shExpMatch(host, "*.dark.psu.edu")
	){
		if(site == "cb" || site == "tr" || site == "hy") { return "DIRECT"; }
		else { return "SOCKS localhost:8082"; }
	}

	// Assume any remaining PSU things are local
	if( shExpMatch(host, "*.psu.edu") ) { return "DIRECT"; }

	// At a site, default to proxy
	if(site == "cb" || site == "tr" || site == "hy") { return "PROXY proxy.psu.edu:8080"; }

	// Default to no proxy
	return "DIRECT";
}
