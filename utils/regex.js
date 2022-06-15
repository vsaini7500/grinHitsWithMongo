module.exports = pattern = {

//  mobileNo: /^[6-9][0-9]+$/
strPattern: /^[A-Z]+[a-zA-Z ]+([ ]+[0-9]+)*$/,
conturyCode: /^(\+){1}[0-9]+$/,
mobileNo: /^[6-9][0-9]+$/,
passwordPattern: /^[a-zA-Z0-9!@#\$%\^\&*_=+-]{8,12}$/,
num: /^[0-9]+$/,
cvvPattern: /^[0-9]{3}$/,
productPattern: /^[A-Z]+([a-z ]+)?([0-9]+)?$/,
state: /^[A-Z]+[A-Za-z ]*[0-9]*$/,
gender: /^(m|M|male|Male|f|F|female|Female)?$/,
name: /^[A-Z]+[a-z ]{2,30}$/,
capital: /^[A-Za-z ]{2,30}$/,
houseNo: /^[A-Za-z0-9 ]*[/]?[A-Za-z0-9 ]*$/,
alphaNum: /^[A-Za-z0-9]+$/,
SIZE: /^[A-Za-z0-9 ]{1,30}$/,



}