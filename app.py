from flask import Flask,session, request, flash, url_for, redirect, render_template
from bs4 import BeautifulSoup
import requests
import os, datetime
import time
import re
_basedir = os.path.abspath(os.path.dirname(__file__))

h_ago = re.compile('\d hours ago') 
am = re.compile('\d\d:\d\d AM \d\d/\d\d/\d\d')
pm = re.compile('\d\d:\d\d PM \d\d/\d\d/\d\d')
min_ago = re.compile('\d\d min ago') 

print datetime.datetime.now()



app = Flask(__name__)


@app.route('/', methods=['GET'])
# @login_required
def index():
	return render_template('index.html')


@app.route('/get/<string:username>', methods=['GET'])
# @login_required
def get_data(username):
	print 'looking for ' + username
	url = 'https://www.codechef.com/recent/user/page=1&user_handle='+str(username)
	r = requests.get(url).json()
	time_h = []
	all_trs = []
	all_text = []

	time_arr = []
	problem_arr=[]
	langu_arr=[]

# 
# 
# 

	number_of_pages = r["max_page"]
	print 'max pages are '+ str(number_of_pages)
	if number_of_pages>1:
		for x in range(0,number_of_pages):
				time.sleep(0.5)
				print "sending rewuest for page = "+ str(x) 
				url = 'https://www.codechef.com/recent/user?page='+str(x)+'&user_handle='+str(username)
				r = requests.get(url).json()
				e = r["content"]
				soup = BeautifulSoup(e, 'html.parser')
				trs = soup.find_all('td')
				length = len(trs)
				for q in range(0,length):
					string_to_match  = str(trs[q].text)
					if h_ago.match(string_to_match) or am.match(string_to_match) or pm.match(string_to_match) or time_arr.append(string_to_match):
						time_arr.append(string_to_match)					
						problem_arr.append(str(trs[q+1].text))
						langu_arr.append(str(trs[q+2].text))
					all_text.append(str(trs[q].text))

				print "page "+str(x)+" done"

	# w = open('output.html','w')
	# w.write(str(all_trs))
	# w.close()
	# print all_trs
	# print  all_text
		# soup = BeautifulSoup(e, 'html.parser')
	# print len(time_arr)
	myset = set(problem_arr)
	# print len(myset)
	
	mylangs = set(langu_arr)
	print len(mylangs)
	
	
	return render_template('result.html',data=myset)


if __name__ == '__main__':
    app.run(debug=True)