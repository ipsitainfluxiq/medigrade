<?php
/**
 * Created by PhpStorm.
 * User: INFLUXIQ-01
 * Date: 07-06-2018
 * Time: 11:11 AM
 */
header('Content-Type: text/json');
header('Access-Control-Allow-Origin: * ');  //I have also tried the * wildcard and get the same response
header("Access-Control-Allow-Credentials: true");
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, Content-Description');
error_reporting(E_ALL);

$curl1 = curl_init();
curl_setopt_array($curl1, array(
    CURLOPT_URL => "http://greenvalleyportal.com:3020/getusersofthisid?id=".$_GET['id'],
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => "",
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 30,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => "GET"
));
$headers1 = [];
curl_setopt($curl1, CURLOPT_HTTPHEADER, $headers1);
$response1 = curl_exec($curl1);
$err1 = curl_error($curl1);
$result1=json_decode($response1);
/*echo "<pre>";
print_r($result1);
echo "</pre>";*/



$clientsecret='rceNuVH07k1GwNDZ';
$consumerkey='tVgBTU4iFslK6IuKdV0AbEyJMpQbDdsS';

$arr=[];
$arr['firstName']=$result1->firstname;
$arr['lastName']=$result1->lastname;
$arr['email']=$result1->email;
$arr['source']=$result1->firstname;
$arr['address']=$result1->address;
$arr['city']=$result1->city;
$arr['state']=$result1->state;
$arr['zipCode']=$result1->zip;
$arr['country']=$result1->firstname;
$arr['phone']=$result1->phone;


/*$arr=[];
$arr['firstName']='Debasis';
$arr['lastName']='Test';
$arr['email']='debasi2s@yopmail.com';
$arr['source']='Website Signup';
$arr['address']='Test Signup';
$arr['city']='Test Signup';
$arr['city']='Test Signup';
$arr['state']='Test Signup';
$arr['zipCode']='Test Signup';
$arr['country']='Test Signup';
$arr['phone']='Test Signup';*/
/*$arr['organization']='Test Signup';
$arr['jobTitle']='Test Signup';
$arr['questionsAndComments']='Test Signup';
$arr['industry']='Test Signup';
$arr['numberOfEmployees']='Test Signup';
$arr['purchasingTimeFrame']='Test Signup';
$arr['purchasingRole']='Test Signup';*/

$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, "https://api.getgo.com/G2W/rest/organizers/4948897817217033990/webinars/".$result1->webinarkey."/registrants");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
//curl_setopt($ch, CURLOPT_POSTFIELDS, "{\n  \"firstName\": \"Debasis\",\n  \"lastName\": \"Test\",\n  \"email\": \"debasiskar007@gmail.com\",\n  \"source\": \"website Registration\",\n  \"address\": \"Test\",\n  \"city\": \"string\",\n  \"state\": \"string\",\n  \"zipCode\": \"string\",\n  \"country\": \"string\",\n  \"phone\": \"string\",\n  \"organization\": \"string\",\n  \"jobTitle\": \"string\",\n  \"questionsAndComments\": \"string\",\n  \"industry\": \"string\",\n  \"numberOfEmployees\": \"string\",\n  \"purchasingTimeFrame\": \"string\",\n  \"purchasingRole\": \"string\",\n  \"responses\": [\n    {\n      \"questionKey\": 0,\n      \"responseText\": \"string\",\n      \"answerKey\": 0\n    }\n  ]\n}");
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($arr));
curl_setopt($ch, CURLOPT_POST, 1);

$headers = array();
$headers[] = "Content-Type: application/json";
$headers[] = "Accept: application/json";
$headers[] = "Authorization: OAuth oauth_token=SKu3Zds4hozoPcshpSeQUPAJIMgW";
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

$result = curl_exec($ch);
if (curl_errno($ch)) {
  echo 'Error:' . curl_error($ch);
}
curl_close ($ch);

print_r($result);
