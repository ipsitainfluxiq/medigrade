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

$clientsecret='rceNuVH07k1GwNDZ';
$consumerkey='tVgBTU4iFslK6IuKdV0AbEyJMpQbDdsS';

/*$curl1 = curl_init();
curl_setopt_array($curl1, array(
    CURLOPT_URL => "http://greenvalleyportal.com:3020/getwebinarapivalue",
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
$result1 = $result1->id;*/
//print_r($result1);
//print_r($result1->access_token);

$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, "https://api.getgo.com/G2W/rest/organizers/4948897817217033990/upcomingWebinars");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "GET");


$headers = array();
$headers[] = "Accept: application/json";
//$headers[] = "Authorization: OAuth oauth_token=SKu3Zds4hozoPcshpSeQUPAJIMgW";
$headers[] = "Authorization: OAuth oauth_token=".$result1->access_token;
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

$result = curl_exec($ch);
if (curl_errno($ch)) {
  echo 'Error:' . curl_error($ch);
}
curl_close ($ch);
$val=( json_decode($result));
//print_r($val);
foreach($val as $in=>$v){
    //echo $v->webinarKey;
    $v->webinark=strval($v->webinarKey);
    $val[$in]=$v;
}
echo json_encode($val);

//$result=json_decode($result);

/*echo "<pre>";
print_r(sizeof($result));
print_r($result);
echo "</pre>";*/


/*$perfectarr=[];
for($i=0;$i<sizeof($result);$i++){
    if($result[$i]->registrationUrl == 'https://attendee.gotowebinar.com/rt/647150944609692929'){
        array_push($perfectarr , $result[$i]);
    }
}*/

/*
echo "<pre>";
print_r($perfectarr);
echo "</pre>";*/
/*
$perfectarr = json_encode($perfectarr);

echo "<pre>";
print_r($perfectarr);
echo "</pre>";*/
