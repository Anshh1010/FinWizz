import sys
import pandas as pd
import matplotlib.pyplot as plt
import os

def plot_stock_data(ax, data, title):
    ax.plot(data['Open'], color='cyan')  # Customize the line color
    ax.set_title(title)
    ax.set_xlabel('Date')
    ax.set_ylabel('Price')

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python plot_stock_data.py <stock_name>")
        sys.exit(1)

    stock_name = sys.argv[1]
    periods = ['5y', '3y', '1y', '6mo', '3mo', '1mo']
    os.makedirs('plots', exist_ok=True)
    for period in periods:
        fig, ax = plt.subplots(figsize=(8, 6))
        data = pd.read_csv(f"{stock_name}_{period}.csv")  # Replace with the actual CSV filename
        plot_stock_data(ax, data, f'{stock_name} {period}')
        ax.set_facecolor('#2E2E2E')  # Set dark background
        plt.tight_layout()
        plt.savefig(os.path.join('plots', f'plot_{period}.png'))
        plt.close()  # Close the plot to release resources
