<?php
/**
 * Created by PhpStorm.
 * User: INFLUXIQ-01
 * Date: 07-06-2018
 * Time: 11:11 AM
 */

$consumerkey='tVgBTU4iFslK6IuKdV0AbEyJMpQbDdsS';
if(!isset($_REQUEST['code'])){
    echo $authUrl='https://api.getgo.com/oauth/access_token?grant_type=authorization_code&code='.$_REQUEST['code'].'&client_id='.$consumerkey;
    exit;

    header('location :'.$authUrl);
}
else{
    $curl1 = curl_init();
    curl_setopt_array($curl1, array(
        CURLOPT_URL => "http://influxiq.com:3020/getwebinarapivalue",
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
    $result1 = $result1->id;
// echo $result1->expires_in;
    $currenttime = time();
//echo $currenttime;
//echo $result1->expires_in;
    if($currenttime > $currenttime+$result1->expires_in ) {
   // if($currenttime > $result1->expires_in ) {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, 'https://api.getgo.com/oauth/access_token?grant_type=authorization_code&code='.$_REQUEST['code'].'&client_id='.$consumerkey);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        $headers = array();
        $headers[] = "Content-Type: application/json";
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        $result = curl_exec($ch);
        if (curl_errno($ch)) {
            echo 'Error:' . curl_error($ch);
        }
        curl_close ($ch);
      //  print_r($result);
        $result=json_decode($result);
        print_r($result);
        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_URL => "http://influxiq.com:3020/postwebinarapivalue?exp=$result->expires_in&acccesstoken=$result->access_token",
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => "",
            CURLOPT_MAXREDIRS => 100,
            CURLOPT_TIMEOUT => 300,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => "GET",
            CURLOPT_POSTFIELDS =>$result,
        ));
        $headers = [];
        curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
        $response = curl_exec($curl);
        $err = curl_error($curl);
        echo (($response));
    }
}
