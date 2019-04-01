<?php
/**
 * Created by PhpStorm.
 * User: INFLUXIQ-01
 * Date: 07-06-2018
 * Time: 11:11 AM
 */

$clientsecret='rceNuVH07k1GwNDZ';
$consumerkey='tVgBTU4iFslK6IuKdV0AbEyJMpQbDdsS';
if(!isset($_REQUEST['code'])){
  echo $authUrl='https://api.getgo.com/oauth/v2/authorize?client_id='.$consumerkey.'&response_type=code';
  exit;

  header('location :'.$authUrl);
}
else{
  echo $_REQUEST['code'];exit;

  $ch = curl_init();

  $arr['code']=$_REQUEST['code'];
  //$arr['redirect_uri']='http://nexhealthtoday.com/webinarauth.php';
  $arr['grant_type']="authorization_code";
  echo json_encode($arr);
  curl_setopt($ch, CURLOPT_URL, "https://api.getgo.com/oauth/v2/token");
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
  curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($arr));
  //curl_setopt($ch, CURLOPT_POSTFIELDS, "grant_type=authorization_code&code=".$_REQUEST['code']."&redirect_uri=http://nexhealthtoday.com/webinarauth.php");

  curl_setopt($ch, CURLOPT_POST, 1);

  $headers = array();
  $headers[] = "Authorization: Basic ".base64_encode($consumerkey.":".$clientsecret);
  //$headers[] = "Accept: application/json";
  //$headers[] = "Content-Type: application/x-www-form-urlencoded";
  $headers[] = "Content-Type: application/json";
  curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

  print_r($ch);
  $result = curl_exec($ch);
  if (curl_errno($ch)) {
    echo 'Error:' . curl_error($ch);
  }
  curl_close ($ch);
  print_r($result);
}
