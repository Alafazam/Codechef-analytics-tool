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



# for demo
demoData = {}
with open('./downloads/collected data/anudeep obj_data.json') as data_file:
    demoData = json.load(data_file)["data"]

# print  demoData[200]

for qz in range(0,20):
	q = demoData[qz]
	search_grp = re.search(pm,q["time"])
	print  search_grp
	hours  = int(search_grp.group(1))
	mins   = search_grp.group(2)
	am_pm  = search_grp.group(3)
	date_d = search_grp.group(4)
	date_m = search_grp.group(4)
	date_y = search_grp.group(4)
	response_string=""
	response_string += ', '
	response_string +=',{ "hours":"' + str(hours+(12*int(am_pm=='PM'))) + '", "minutes":"'+ mins + '", "date_d":"' + date_d+ '", "date_y":"' + date_y+ '", "date_m":"' + date_m + '"' 				
	problem_code = q["problem_code"]
	qstatus = q["status"]
	langz = q["lang"]
	response_string += ', "problem_code":"'+ problem_code + '", "qstatus":"'+ qstatus + '", "minutes":"'+ langz+ '" } '
	print response_string

