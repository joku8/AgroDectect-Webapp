import requests

url = 'http://127.0.0.1:8081/report'
data = {'damage_cause': 'pest1', 'longitude': 10.00, 'latitude': 12.00}

response = requests.post(url, data=data)

if response.status_code == 201:
    print("Pest report created successfully!")
    print(response.json())
else:
    print("Error creating pest report!")
    print(response.json())
