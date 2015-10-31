from flask import Flask,session,jsonify, request, flash, url_for, redirect, render_template
from bs4 import BeautifulSoup
from flask import Response
import requests
import os, datetime
import time,json
import re
import __main__

# sns.set(style="ticks")
_basedir = os.path.abspath(os.path.dirname(__file__))



h_ago = re.compile('(\d) hours ago') 
pm = re.compile('(\d\d):(\d\d) (AM|PM) (\d{2})\/(\d{2})\/(\d{2})')
min_ago = re.compile('\d\d min ago') 
yesterday_wali  = re.compile('(\d\d:\d\d) (PM|AM) (yesterday)')
username_reg = re.compile('^[a-z]{1}[a-z0-9_]{3,13}$')

print datetime.datetime.now()



app = Flask(__name__)


@app.route('/', methods=['GET'])
# @login_required
def index():
	return render_template('index.html')



@app.route('/get/<string:username>', methods=['GET'])
def get_data(username):
	return render_template('data.html')


@app.route('/ajax_data/<string:username>', methods=['GET'])
def generate__data(username):

	start_page  = int(request.args.get('start') if request.args.get('start') else 0)
	end_page    = int(request.args.get('end') if request.args.get('end') else 1) 

	# start_page  = 0
	# end_page    = 10 

	if re.match('^[a-z]{1}[a-z0-9_]{3,13}$',username)==None:
		return json.dumps({'time':None})

	if end_page < start_page or end_page < 0 or start_page < 0:
		return json.dumps({'time':None})

	def generate():
		s = requests.Session()
		for x in range(start_page,end_page):
			time.sleep(0.1)
			print "sending request for page "+ str(x) 
			url = 'https://www.codechef.com/recent/user?page='+str(x)+'&user_handle='+str(username)
			r = s.get(url).json()
			e = r["content"]
			soup = BeautifulSoup(e, 'html.parser')
			trs = soup.find_all('tr','kol')
			for q in trs:
				times = str(q.contents[0].text)
				hours_search = re.search(pm,times)
				if hours_search:
					hours = hours_search.group(1)
					mins = hours_search.group(2)
					obja = [hours,mins]
					yield ''+json.dumps({'time':obja})+''
		yield ''+json.dumps({'time':None})+''
	return Response(generate())

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port,debug=True)


#  
# Code chef user analysis tool 
# @author
# Alaf azam khan
# 
