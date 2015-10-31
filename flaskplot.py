from flask import Flask,session, request, flash, url_for, redirect, render_template
from bs4 import BeautifulSoup
import matplotlib
matplotlib.use('Agg')

import matplotlib.pyplot as plt
import numpy as np
from cStringIO import StringIO

from flask import Flask
app = Flask(__name__)


@app.route("/")
def index():

    # Plot sin and cos between -10 and 10 (1000 points)
    fig = plt.figure()
    ax = fig.add_subplot(1, 1, 1)
    xs = np.linspace(-10, 10, 1000)
    ax.plot(xs, np.sin(xs), label='sin(x)')
    ax.plot(xs, np.cos(xs), label='cos(x)')
    # ax.legend()

    # Encode image to png in base64
    io = StringIO()
    fig.savefig(io, format='png')
    data = io.getvalue().encode('base64')

    return render_template('result.html',data=data)


if __name__ == '__main__':
    app.run(debug=True)