curl -i    http://localhost:4996/grole/api/v0.1/users
curl -i    http://localhost:4996/grole/api/v0.1/hateoas/users
curl -i    http://localhost:4996/grole/api/v0.1/users/1
#curl -i    http://localhost:4996/grole/api/v0.1/users/vhabhsdjl4
curl -i    http://localhost:4996/grole/api/v0.1/users/accounts/3
curl -i    http://localhost:4996/grole/api/v0.1/users/roles/3
curl -i    http://localhost:4996/grole/api/v0.1/users/roles/by_account/3
curl -i    http://localhost:4996/grole/api/v0.1/users/privileges/3
curl -i    http://localhost:4996/grole/api/v0.1/users/privileges/by_account_and_role/3
curl -i    http://localhost:4996/grole/api/v0.1/users/resources/3
curl -i    http://localhost:4996/grole/api/v0.1/users/resources/by_account_role_privilege/6
curl -i    http://localhost:4996/grole/api/v0.1/accounts
curl -i    http://localhost:4996/grole/api/v0.1/accounts/2
curl -i    http://localhost:4996/grole/api/v0.1/roles
curl -i    http://localhost:4996/grole/api/v0.1/roles/2
curl -i    http://localhost:4996/grole/api/v0.1/roles/accounts/3
curl -i    http://localhost:4996/grole/api/v0.1/roles/users/3
curl -i    http://localhost:4996/grole/api/v0.1/privileges
curl -i    http://localhost:4996/grole/api/v0.1/privileges/2
curl -i    http://localhost:4996/grole/api/v0.1/privileges/roles/3
curl -i    http://localhost:4996/grole/api/v0.1/resources
curl -i    http://localhost:4996/grole/api/v0.1/resources/2
curl -i    http://localhost:4996/grole/api/v0.1/resources/users/2
curl -X PUT    http://localhost:4996/grole/api/v0.1/roles/priv/4/5

