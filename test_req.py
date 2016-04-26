import requests
import time,json

# url = "http://localhost:8080/fedora/objects/test:1234?test="

s   = requests.Session()

bogie = ''

for x in range(0, 250):
	myurl = 'https://www.codechef.com/recent/user/page='+str(x)+'&user_handle=anudeep2011'
    # myurl = url + str(x)
	r = s.get(myurl)
	p = r.json()
	response_content = p['content']
	bogie +=response_content
	print x, "\t", myurl, "\t", r.status_code

w = open('/downloads/yo.txt','w')
w.write(bogie)
w.close()
