# jetti-crm

<!-- //npm.pkg.github.com/:_authToken=df775e071cf958a755e65607445c3b433dcaf00c -->	

 <!-- npm login --scope=https://github.com/x100group --registry=https://npm.pkg.github.com -->	
# Install	

```sh	
  npm i @tishchenkoAlex/jetti-middle@1.0.0 --registry "https://npm.pkg.github.com"	
```	

# Auth	

#### step one(generate git ascess token) see screenshots and repeat.	
![](https://i.ibb.co/Wk0KLCm/Screenshot-1.png)	


![](https://i.ibb.co/ZTfPQPz/Screenshot-2.png)	
![](https://i.ibb.co/983pkQs/Screenshot-3.png)	



and copy you Personal acess token.	

in the root of the project create a .npmrc file. And writing 	


```text	
//npm.pkg.github.com/:_authToken={YOUR ACCESS GIT TOKEN}	
```	
```text	
exmaple	
//npm.pkg.github.com/:_authToken=231123321123231231	
```	

and go cli console and write 	
```sh	
npm login --scope=https://github.com/TishchenkoAlex --registry=https://npm.pkg.github.com	
Username: {YOUR USER NAME LOVERCASE}	
Password: {YOUR ACCESS GIT TOKEN}	
Public email: {YOUR EMAIL}	
```	
auth complete, good day to you
