import numpy as np
from scipy.stats import kendalltau
import seaborn as sns
import matplotlib.pyplot as plt
sns.set(style="ticks")

rs = np.random.RandomState(1000)
# print rs
# x = rs.gamma(12, size=60)
# y = 2 + rs.gamma(60,size=60)
# x = rs.gamma(2, size=1000)

# print 'y = '+ str(y)

# graph = sns.jointplot(x, y, kind="hex", stat_func=kendalltau, color="#4CB391")


x = np.random.normal(size=100)
print 'x = '+ str(x)
graph = sns.distplot(x);


sns.plt.savefig("output.png")
# graph.pyplot.show()
sns.plt.show()