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

# @app.route('/large.csv')
# def generate_large_csv():
#     def generate():
#         for row in iter_all_rows():
#             yield ','.join(row) + '\n'
#     return Response(generate(), mimetype='text/csv')

# @login_required
@app.route('/get/<string:username>', methods=['GET'])
def get_data(username):
	return render_template('data.html')



@app.route('/ajax_data/<string:username>/<int:start_page>', methods=['GET'])
def datadisplay(username,start_page):
	# username  = request.args.get('username')
	# start_page  = int(request.args.get('from'))
	# end_page  = request.args.get('to') 

	time_data = []
	data_hours = []
	data_mins = []
	pagez=0
	# io = StringIO()
	# /^[a-z]{1}[a-z0-9_]{3,13}$/
	if re.match('^[a-z]{1}[a-z0-9_]{3,13}$',username)==None:
		return "Invalid username"
	s = requests.Session()

	# print 'looking for ' + username
	# url = 'https://www.codechef.com/recent/user/page=1&user_handle='+str(username)
	# r = s.get(url).json()
	# number_of_pages = r["max_page"]
	# number_of_pages = end_page - start_page

	# if number_of_pages==0:
	# 	return 'This user does not exist'

	# print 'max pages are ' + str(number_of_pages)
	def generate(start_page):
		# yield 'Loading....'
		try:	
			for x in range(0,10):
				# obj_data = []
				# time.sleep(0.5)
				print "sending request for page "+ str(x+start_page) 
				url = 'https://www.codechef.com/recent/user?page='+str(x+start_page)+'&user_handle='+str(username)
				r = s.get(url).json()
				e = r["content"]
				soup = BeautifulSoup(e, 'html.parser')
				trs = soup.find_all('tr','kol')
				# pagez = x
				for q in trs:
					times = str(q.contents[0].text)
					# problem_code = str(q.contents[1].a['href']).split('/')[-1]
					# status = str(q.contents[2].span['title'])
					# lang = str(q.contents[31].text)
					# obj = {'time':times,'problem_code':problem_code,'status':status,'lang':lang}
					# obj_data.append(obj)
					# time_data.append(times)
					hours_search = re.search(pm,times)
					if hours_search:
						hours = hours_search.group(1)
						print hours
						mins = hours_search.group(2)
						obja = {'h':hours,'min':mins}
						# if hours_search.group(3)=='AM':
						# 	data_hours.append(int(hours))
						# else:
						# 	data_hours.append(int(hours)+12)
						# data_mins.append(int(mins))
						yield jsonify(data=obja)
				# print "page "+str(x)+" done"

		except :
			print "error occured saving data recieved uptill now"
			# print 'request fetched upto '+str(pagez)+' page'
			# print ','+str(pagez)+ '\n'

	# x = np.asarray(data_hours)
	# y = np.asarray(data_mins)
	# sns.jointplot(x, y, kind="hex", color="#4CB391")
	# # fig.savefig(io, format='png')
	# sns.plt.savefig(io, format='png')
	# data = io.getvalue().encode('base64')
	# return render_template('result.html',data=data)


	return Response(generate(start_page),mimetype="application/json")
	# return render_template('result.html',data=json.dumps(obj_data),pagez=pagez)

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port,debug=True)