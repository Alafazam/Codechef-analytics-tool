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



h_ago = re.compile('(\d) (hours) (ago)')
pm = re.compile('(\d\d):(\d\d) (AM|PM) (\d{2})\/(\d{2})\/(\d{2})')
min_ago = re.compile('(\d\d) (min) (ago)')
yesterday_wali  = re.compile('(\d\d:\d\d) (PM|AM) (yesterday)')
username_reg = re.compile('^[a-z]{1}[a-z0-9_]{3,13}$')

print datetime.datetime.now()



app = Flask(__name__)


@app.route('/', methods=['GET'])
def index():
	return render_template('index.html',message='')



@app.route('/get/<string:username>', methods=['GET'])
def get_data(username):
	if re.match('^[a-z]{1}[a-z0-9_]{3,13}$',username)==None:
		return render_template('index.html',message="Illegal Username/Input is not alphanumeric")
	ef = 0
	url = 'https://www.codechef.com/recent/user?page=0&user_handle='+str(username)
	try:
		r = requests.get(url).json()
		ef = r["max_page"]
		print 'max_page :'+ str(ef)
	except Exception, e:
		ef = 10
	finally:
		return render_template('data.html',username=username,max_page=int(ef))

@app.route('/demo', methods=['GET'])
def demo_():
	return render_template('demo.html',username="Anudeep",max_page=int(300))



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
		# yield "start="+str(datetime.datetime.now())+'\n'
		yield '{ "content":[ { "hours":null, "mins":null, "date_d":null, "date_m":null, "date_y":null, "problem_code":null, "qstatus":null, "langz":null } '
		for x in range(start_page,end_page+1):
			time.sleep(0.1)
			print "sending request for page "+ str(x)
			url = 'https://www.codechef.com/recent/user?page='+str(x)+'&user_handle='+str(username)
			try:
				r = s.get(url).json()
				max_pages = r['max_page']
				if x > max_pages:
					break
				e = r["content"]
				soup = BeautifulSoup(e, 'html.parser')
				trs = soup.find_all('tr','kol')
				for q in trs:
					response_string = ''
					times = str(q.contents[0].text)
					search_grp = re.search(pm,times)
					if search_grp:
						hours  = int(search_grp.group(1))
						mins   = search_grp.group(2)
						am_pm  = search_grp.group(3)
						date_d = search_grp.group(4)
						date_m = search_grp.group(5)
						date_y = search_grp.group(6)
						response_string +=',{ "hours":"' + str((hours+(12*int(am_pm=='PM')))%24) + '", "minutes":"'+ mins + '", "date_d":"' + date_d+ '", "date_y":"' + date_y+ '", "date_m":"' + date_m + '"' 			
						problem_code = str(q.contents[1].a['href']).split('/')[-1]
						qstatus = str(q.contents[2].span['title']) if q.contents[2].span['title'] else 'None'
						langz = str(q.contents[3].text)
						response_string += ', "problem_code":"'+ problem_code + '", "qstatus":"'+ qstatus + '", "langz":"'+ langz + '" } '
						yield ''+ response_string
			except Exception, e:
				print e
				# todo error handling

		yield " ] }"
	return Response(generate())


# for demo
demoData = {}
with open('./downloads/collected data/anudeep obj_data.json') as data_file:
    demoData = json.load(data_file)["data"]

# print demoData["data"][501]


@app.route('/demo_route', methods=['GET'])
def demo_route():
	start_page  = int(request.args.get('start') if request.args.get('start') else 0)
	end_page    = int(request.args.get('end') if request.args.get('end') else 1)
	username = 'anudeep nikunti'
	def generate():
		# s = requests.Session()
		# yield "start="+str(datetime.datetime.now())+'\n'
		yield '{ "content":[ { "hours":null, "mins":null, "date_d":null, "date_m":null, "date_y":null, "problem_code":null, "qstatus":null, "langz":null } '
		# for x in range(start_page,end_page+1):
		for q in demoData:
			response_string = ''
			search_grp = re.search(pm,q["time"])
			# print  search_grp
			if search_grp:
				hours  = int(search_grp.group(1))
				mins   = search_grp.group(2)
				am_pm  = search_grp.group(3)
				date_d = search_grp.group(4)
				date_m = search_grp.group(4)
				date_y = search_grp.group(4)
				response_string +=',{ "hours":"' + str((hours+(12*int(am_pm=='PM')))%24) + '", "minutes":"'+ mins + '", "date_d":"' + date_d+ '", "date_y":"' + date_y+ '", "date_m":"' + date_m + '"' 			
				problem_code = q["problem_code"]
				qstatus = q["status"]
				langz = q["lang"]
				response_string += ', "problem_code":"'+ problem_code + '", "qstatus":"'+ qstatus + '", "langz":"'+ langz+ '" } '
				yield ''+ response_string
			# yield "   end="+str(datetime.datetime.now())+''
		yield " ] }"
		print 'Done'
	return Response(generate())


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port,debug=True)


#
# Code chef user analysis tool
# @author
# Alaf azam khan
#
