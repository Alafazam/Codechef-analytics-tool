import __main__
import numpy as np
from scipy.stats import kendalltau
import seaborn as sns
import matplotlib.pyplot as plt
sns.set(style="ticks")

from bs4 import BeautifulSoup
import requests
import os, datetime
import time,json
import re
_basedir = os.path.abspath(os.path.dirname(__file__))
print datetime.datetime.now()


h_ago = re.compile('(\d) hours ago') 
pm = re.compile('(\d\d):(\d\d) (AM|PM) (\d{2})\/(\d{2})\/(\d{2})')
min_ago = re.compile('\d\d min ago') 
yesterday_wali  = re.compile('(\d\d:\d\d) (PM) (yesterday)|(\d\d:\d\d) (AM) (yesterday)')


username = 'ankitstarski'
print 'looking for ' + username
url = 'https://www.codechef.com/recent/user/page=1&user_handle='+str(username)
r = requests.get(url).json()
number_of_pages = r["max_page"]
print 'max pages are ' + str(number_of_pages)

time_data = []
obj_data = []
data_hours = []
data_mins = []


try:	
	for x in range(0,number_of_pages):
		# time.sleep(0.02)
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
			time_data.append(times)

			hours_search = re.search(pm,times)
			if hours_search:
				hours = hours_search.group(1)
				mins = hours_search.group(2)
				if hours_search.group(3)=='AM':
					data_hours.append(int(hours))
				else:
					data_hours.append(int(hours)+12)

				data_mins.append(int(mins))
		print "page "+str(x)+" done"
except :
	print "error occured saving data recieved uptill now"

x = np.asarray(data_hours)
y = np.asarray(data_mins)
sns.jointplot(x, y, kind="hex", color="#4CB391")
sns.plt.savefig(__main__.__file__+"2.png")
sns.plt.show()
