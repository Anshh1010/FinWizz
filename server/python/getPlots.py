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
    print("Helloo")
    if len(sys.argv) != 2:
        print("Usage: python plot_stock_data.py <stock_name>")
        sys.exit(1)

    stock_name = sys.argv[1]
    periods = ['1y', '6mo', '3mo', '1mo']
    os.makedirs('plots', exist_ok=True)

    fig, axs = plt.subplots(2, 2, figsize=(12, 10))  # Create a 2x2 grid of subplots
    plt.subplots_adjust(hspace=0.5)

    for i, period in enumerate(periods):
        row = i // 2
        col = i % 2
        ax = axs[row, col]
        data = pd.read_csv(f"{stock_name}.csv")  # Replace with the actual CSV filename
        plot_stock_data(ax, data, f'{stock_name} {period}')
        ax.set_facecolor('#2E2E2E')  # Set dark background

    plt.tight_layout()
    plt.savefig(os.path.join('plots', 'combined_plot.png'))  # Save the combined plot
    plt.close()  # Close the plot to release resources
