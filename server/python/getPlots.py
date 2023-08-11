import sys
import pandas as pd
import yfinance as yf
import matplotlib.pyplot as plt
from prophet import Prophet
import os

def fetch_stock_data(stock_name, period):
    data = yf.Ticker(stock_name).history(period=period)
    print(data.info())
    return data

def plot_stock_data(ax, data, title):
    ax.plot(data['Open'], color='cyan')  # Customize the line color
    ax.set_title(title)
    ax.set_xlabel('Date')
    ax.set_ylabel('Price')

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python hello.py <stock_name>")
        sys.exit(1)

    stock_name = sys.argv[1]
    
    periods = ['5y', '3y', '1y', '6mo', '3mo', '1mo']
    os.makedirs('plots', exist_ok=True)
    for i, period in enumerate(periods):
        fig, ax = plt.subplots(figsize=(8, 6))
        stock_data = fetch_stock_data(stock_name, period)
        plot_stock_data(ax, stock_data, f'{stock_name} {period}')
        ax.set_facecolor('#2E2E2E')  # Set dark background
        plt.tight_layout()
        plt.savefig(os.path.join('plots', f'plot_{period}.png'))
        plt.close()  # Close the plot to release resources
