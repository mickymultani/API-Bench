import re
import datetime
from openpyxl import Workbook

# Function to parse Apache Bench output
def parse_ab_output(file_path):
    with open(file_path, 'r') as file:
        data = file.read()

    # Regular expressions for extracting KPIs
    kpis = {
        "Server Software": r"Server Software:\s+(\S+)",
        "Server Hostname": r"Server Hostname:\s+(\S+)",
        "Server Port": r"Server Port:\s+(\d+)",
        "Document Path": r"Document Path:\s+(\S+)",
        "Document Length": r"Document Length:\s+(\d+) bytes",
        "Concurrency Level": r"Concurrency Level:\s+(\d+)",
        "Time taken for tests": r"Time taken for tests:\s+([\d.]+) seconds",
        "Complete requests": r"Complete requests:\s+(\d+)",
        "Failed requests": r"Failed requests:\s+(\d+)",
        "Total transferred": r"Total transferred:\s+(\d+) bytes",
        "HTML transferred": r"HTML transferred:\s+(\d+) bytes",
        "Requests per second": r"Requests per second:\s+([\d.]+) \[#\/sec\] \(mean\)",
        "Time per request (mean)": r"Time per request:\s+([\d.]+) \[ms\] \(mean\)",
        "Time per request (across all concurrent requests)": r"Time per request:\s+([\d.]+) \[ms\] \(mean, across all concurrent requests\)",
        "Transfer rate": r"Transfer rate:\s+([\d.]+) \[Kbytes\/sec\] received"
        # Add additional regex patterns for other KPIs as necessary
    }

    # Extracting and storing each KPI
    results = {}
    for kpi, pattern in kpis.items():
        match = re.search(pattern, data)
        results[kpi] = match.group(1) if match else "N/A"

    return results

# Function to write results to an Excel file
def write_results_to_excel(results, filename='apache_bench_results.xlsx'):
    wb = Workbook()
    ws = wb.active
    ws.title = "AB Results"

    # Headers
    ws.append(["Timestamp"] + list(results.keys()))

    # Data
    ws.append([datetime.datetime.now()] + list(results.values()))

    # Save the workbook
    wb.save(filename)

# Main execution: parse and write to Excel
if __name__ == "__main__":
    results = parse_ab_output("ab_output.txt")  # Ensure this is the correct path
    write_results_to_excel(results)
    print("Results parsed and written to Excel successfully.")
