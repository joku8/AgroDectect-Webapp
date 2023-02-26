import requests

url = 'http://localhost:3000/report'
data = {'damage_cause': 'pest1', 'longitude': 10, 'latitude': 12}

response = requests.post(url, data=data)

print(response.status_code)
print(response.json())
