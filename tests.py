from bs4 import BeautifulSoup
import requests
import os, datetime
import time,json
import re
_basedir = os.path.abspath(os.path.dirname(__file__))
print datetime.datetime.now()


username = 'alafazam'
print 'looking for ' + username
url = 'https://www.codechef.com/recent/user/page=1&user_handle='+str(username)
r = requests.get(url).json()
number_of_pages = r["max_page"]
print 'max pages are ' + str(number_of_pages)

time_data = []
obj_data = []

for x in range(0,number_of_pages):
	time.sleep(0.5)
	print "sending request for page "+ str(x) 
	url = 'https://www.codechef.com/recent/user?page='+str(x)+'&user_handle='+str(username)
	r = requests.get(url).json()
	e = r["content"]
	soup = BeautifulSoup(e, 'html.parser')
	trs = soup.find_all('tr','kol')
	
	for q in trs:
		times = str(q.contents[0].text)
		problem_code = str(q.contents[1].a['href']).split('/')[-1]
		status = str(q.contents[2].span['title'])
		lang = str(q.contents[3].text)
		obj = {'time':times,'problem_code':problem_code,'status':status,'lang':lang}
		obj_data.append(obj)
		# print times
		time_data.append(times)
		# string_to_match  = str(trs[q].text)
		# if h_ago.match(string_to_match) or am.match(string_to_match) or pm.match(string_to_match) or time_arr.append(string_to_match):
		# 	time_arr.append(string_to_match)					
		# 	problem_arr.append(str(trs[q+1].text))
		# 	langu_arr.append(str(trs[q+2].text))
		# all_text.append(str(trs[q].text))
	print "page "+str(x)+" done"

w = open('output.json','w')
w.write(json.dumps(obj_data))
w.close()
