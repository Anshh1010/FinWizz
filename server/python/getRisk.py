import numpy as np
import pandas as pd

# Define the list of stocks
stocks = ['ITC.NS', 'TATAMOTORS.NS', 'IRCTC.BO','INFY.NS','RELIANCE.NS','ADANIPORTS.NS','TATASTEEL.NS','LT.BO','IGL.BO','VBL.BO','HAVELLS.NS','SAGCEM.BO','DCMSRMIND.BO','ZENTEC.BO','DISAQ.BO','PIXTRANS.BO','AXTEL.BO','YSL.BO','IRFC.NS','GLAND.NS']
# def StockReturnsComputing(StockPrice):
#     StockReturn = np.zeros(StockPrice.shape[0] - 1)
    
#     for i in range(StockPrice.shape[0] - 1):
#         # print(i)
#         StockReturn[i] = ((StockPrice[i + 1] - StockPrice[i]) / StockPrice[i]) * 100

#     return StockReturn

# # Read stock data
# marketData = pd.read_csv('NIFTY 50-10-08-2022-to-10-08-2023.csv')
# print(marketData.info())
# marketReturns = StockReturnsComputing(marketData['Close '].values)
# StockReturn = np.zeros(marketReturns.shape[0] - 1)
    
# for i in range(marketReturns.shape[0] - 1):
#     # print(i)
#     StockReturn[i] = ((marketReturns[i + 1] - marketReturns[i]) / marketReturns[i]) * 100
# stockData = {}
# for stock_name in stocks:
#     print(stock_name)
#     stock_data = pd.read_csv(f'{stock_name}.csv')
#     stockData[stock_name] = stock_data

# # Read market data

# # Compute asset returns
# stockReturns = np.zeros((len(stocks), stockData[stocks[0]].shape[0] - 1))
# for i, stock_name in enumerate(stocks):
#     print(stock_name)
#     stock_price = stockData[stock_name]['Close'].values
#     stockReturns[i] = StockReturnsComputing(stock_price)

# # Compute betas
# assetBeta = []
# Var = np.var(marketReturns, ddof=1)
# for i in range(len(stocks)):
#     CovarMat = np.cov(marketReturns, stockReturns[i])
#     Covar = CovarMat[1, 0]
#     assetBeta.append(Covar / Var)

# # Define weights for the portfolio
# weights = np.array([0.09, 0.07, 0.03, 0.02, 0.07, 0.06, 0.04, 0.07, 0.11, \
#                     0.08, 0.09, 0.07, 0.05, 0.11, 0.04])

# # Compute mean and covariance of asset returns
# meanReturns = np.mean(stockReturns, axis=1)
# covReturns = np.cov(stockReturns, rowvar=False)

# # Compute portfolio risk
# portfolioRisk = np.matmul((np.matmul(weights, covReturns)), np.transpose(weights))

# # Compute annualized portfolio risk for trading days = 251
# annualizedRisk = np.sqrt(portfolioRisk * 251)

# # Compute expected portfolio return
# portfolioReturn = np.matmul(np.array(meanReturns), weights.T)

# # Compute annualized expected portfolio return
# annualizedReturn = 251 * np.array(portfolioReturn)

# # Compute portfolio beta
# portfolioBeta = np.matmul(assetBeta, weights.T)

# # Display results
# print("\n Annualized Portfolio Risk: %4.2f" % annualizedRisk, "%")
# print("\n Annualized Expected Portfolio Return: %4.2f" % annualizedReturn, "%")
# print("\n Portfolio Beta:%4.2f" % portfolioBeta)
# TATAMORS:2.36
beta_values = {
    'ITC.NS': 0.601,
    'TATAMOTORS.NS': 2.099,
    'IRCTC.BO': 0.283,
    'INFY.NS': 0.404,
    'RELIANCE.NS': 0.885,
    'ADANIPORTS.NS': 1.293,
    'TATASTEEL.NS': 1.614,
    'LT.BO': 1.062,
    'IGL.BO': 0.514,
    'VBL.BO': 0.933,
    'HAVELLS.NS': 0.624,
    'SAGCEM.BO': 0.380,
    'DCMSRMIND.BO': 0.956,
    'ZENTEC.BO': 1.145,
    'DISAQ.BO': 1.052,
    'PIXTRANS.BO': 1.634,
    'AXTEL.BO': 0.671,
    'YSL.BO': 1.015,
    'IRFC.NS': 0.302,
    'GLAND.NS': 0.642
}



