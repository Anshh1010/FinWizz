import yfinance as yf
import os

def fetch_stock_data(stock_name, period):
    data = yf.Ticker(stock_name).history(period=period)
    return data

if __name__ == "__main__":
    stocks = ['ITC.NS', 'TATAMOTORS.NS', 'IRCTC.BO','INFY.NS','RELIANCE.NS','ADANIPORTS.NS','TATASTEEL.NS','LT.BO','IGL.BO','VBL.BO','HAVELLS.BO','SAGCEM.BO','DCMSRMIND.BO','ZENTEC.BO','DISAQ.BO','PIXTRANS.BO','AXTEL.BO','YSL.BO','IRFC.NS','GLAND.NS']  # Replace with your list of stocks
    period = '1y'

    os.makedirs('stockData', exist_ok=True)
    
    for stock_name in stocks:
        stock_data = fetch_stock_data(stock_name, period)
        stock_data.to_csv(f'stockData/{stock_name}.csv', index=True)
        print(f"Stock data for {stock_name} ({period}) fetched and saved.")